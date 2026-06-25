import { dictionary } from '../data/dictionary'
import type { DictionaryEntry, Exercise } from '../data/types'
import { getEntry } from './lookup'

export interface Choice {
  id: string
  label: string
  correct: boolean
}

/** A deterministic shuffle seeded by a string (no Math.random — testable). */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822519)
    const j = (h >>> 0) % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** The display label for a word in a given direction. */
export function labelFor(entry: DictionaryEntry, direction: 'kp-to-en' | 'en-to-kp'): string {
  return direction === 'kp-to-en' ? entry.translations[0] : entry.word
}

/**
 * Build multiple-choice options for an exercise: the correct answer plus
 * distractors drawn from other dictionary entries (same part of speech first).
 */
export function buildChoices(
  answerId: string,
  direction: 'kp-to-en' | 'en-to-kp',
  count = 4,
): Choice[] {
  const answer = getEntry(answerId)
  if (!answer) throw new Error(`Unknown answer id: ${answerId}`)

  const sameType = dictionary.filter(
    (e) => e.id !== answerId && e.partOfSpeech === answer.partOfSpeech,
  )
  const others = dictionary.filter(
    (e) => e.id !== answerId && e.partOfSpeech !== answer.partOfSpeech,
  )
  const pool = seededShuffle([...sameType, ...others], answerId)
  const distractors = pool.slice(0, Math.max(0, count - 1))

  const choices: Choice[] = [
    { id: answer.id, label: labelFor(answer, direction), correct: true },
    ...distractors.map((d) => ({ id: d.id, label: labelFor(d, direction), correct: false })),
  ]
  return seededShuffle(choices, answerId + ':choices')
}

/** Check a free-text answer against the accepted list (case/space-insensitive). */
export function checkTranslation(input: string, accepted: string[]): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')
  const target = norm(input)
  return accepted.some((a) => norm(a) === target)
}

/** Check a multiple-choice / fill-blank selection. */
export function checkAnswer(ex: Exercise, selectedId: string): boolean {
  if (ex.type === 'multiple-choice' || ex.type === 'fill-blank') {
    return selectedId === ex.answerId
  }
  return false
}
