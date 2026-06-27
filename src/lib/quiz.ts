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

/**
 * Expand English contractions to their full forms so "don't" ≡ "do not",
 * "I'm" ≡ "I am", "can't" ≡ "cannot", etc. This runs on BOTH the learner's
 * input and every accepted answer, so the mapping only needs to be
 * deterministic — not linguistically perfect. (A possessive like "dog's"
 * expands to "dog is" on both sides, which still matches itself.) Operates on
 * already-lowercased text with apostrophes normalized to U+0027.
 */
function expandContractions(s: string): string {
  return (
    s
      // irregular whole-word forms (must run before the generic n't rule)
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bcan't\b/g, 'cannot')
      .replace(/\bshan't\b/g, 'shall not')
      .replace(/\bain't\b/g, 'is not')
      .replace(/\blet's\b/g, 'let us')
      .replace(/\by'all\b/g, 'you all')
      // unify "cannot" / "can not" / (expanded) "can't"
      .replace(/\bcan not\b/g, 'cannot')
      // generic "<aux>n't" -> "<aux> not" (don't, isn't, hasn't, wouldn't, ...)
      .replace(/n't\b/g, ' not')
      // pronoun/auxiliary enclitics
      .replace(/'m\b/g, ' am')
      .replace(/'re\b/g, ' are')
      .replace(/'ve\b/g, ' have')
      .replace(/'ll\b/g, ' will')
      .replace(/'d\b/g, ' would')
      .replace(/'s\b/g, ' is')
  )
}

/**
 * Check a free-text answer against the accepted list. Case-, whitespace-, and
 * punctuation-insensitive, and tolerant of English contractions (don't = do
 * not, I'm = I am, cannot = can't = can not, ...).
 */
export function checkTranslation(input: string, accepted: string[]): boolean {
  const norm = (s: string) =>
    expandContractions(
      s
        .trim()
        .toLowerCase()
        .replace(/[‘’ʼ`]/g, "'"), // smart/odd apostrophes -> '
    )
      .replace(/[.!?,]+$/, '')
      .replace(/\s+/g, ' ')
      .trim()
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
