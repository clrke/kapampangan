import { dictionary } from '../data/dictionary'
import { lessons } from '../data/lessons'
import type { DictionaryEntry, Exercise, Lesson } from '../data/types'

/** Map of dictionary id -> entry. */
export const entryById: Map<string, DictionaryEntry> = new Map(
  dictionary.map((e) => [e.id, e]),
)

/** Map of normalized headword -> entry, for tokenizer lookups. */
export const entryByWord: Map<string, DictionaryEntry> = new Map(
  dictionary.map((e) => [normalize(e.word), e]),
)

/** Lowercase + strip surrounding punctuation for matching. */
export function normalize(token: string): string {
  return token.toLowerCase().replace(/^[^a-z0-9ñ]+|[^a-z0-9ñ]+$/gi, '')
}

export function getEntry(id: string): DictionaryEntry | undefined {
  return entryById.get(id)
}

export function lookupWord(token: string): DictionaryEntry | undefined {
  return entryByWord.get(normalize(token))
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

/** Every word id referenced by any lesson/exercise (deduplicated). */
export function referencedWordIds(): Set<string> {
  const ids = new Set<string>()
  for (const lesson of lessons) {
    lesson.wordIds.forEach((id) => ids.add(id))
    for (const ex of lesson.exercises) {
      collectExerciseWordIds(ex).forEach((id) => ids.add(id))
    }
  }
  return ids
}

/** All word ids an exercise touches (wordIds + any answer/pair ids). */
export function collectExerciseWordIds(ex: Exercise): string[] {
  const ids = [...ex.wordIds]
  switch (ex.type) {
    case 'multiple-choice':
    case 'fill-blank':
      ids.push(ex.answerId)
      break
    case 'matching':
      ex.pairs.forEach((p) => ids.push(p.wordId))
      break
    case 'translate':
      break
  }
  return ids
}
