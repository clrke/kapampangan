import { describe, expect, it } from 'vitest'
import { dictionary } from '../src/data/dictionary'
import { lessons } from '../src/data/lessons'
import { collectExerciseWordIds, entryById, referencedWordIds } from '../src/lib/lookup'
import { tokenize } from '../src/lib/tokenizer'

/**
 * These tests guarantee the project invariant:
 *
 *   "No Kapampangan dictionary definition is left behind."
 *
 * Per the user's decision (#5 = "every word"): every dictionary entry MUST be
 * taught by a lesson, and every word a lesson references MUST be defined.
 * The two sets must match exactly — a true bijection.
 */
describe('dictionary coverage — no definition left behind', () => {
  const dictIds = new Set(dictionary.map((e) => e.id))

  it('every dictionary entry is taught in at least one lesson', () => {
    const taught = new Set<string>()
    for (const lesson of lessons) lesson.wordIds.forEach((id) => taught.add(id))

    const leftBehind = [...dictIds].filter((id) => !taught.has(id))
    expect(
      leftBehind,
      `These dictionary words are defined but never taught in any lesson: ${leftBehind.join(', ')}`,
    ).toEqual([])
  })

  it('every word referenced by lessons/exercises exists in the dictionary (no orphans)', () => {
    const orphans = [...referencedWordIds()].filter((id) => !dictIds.has(id))
    expect(
      orphans,
      `These referenced word ids have no dictionary entry: ${orphans.join(', ')}`,
    ).toEqual([])
  })

  it('the taught set and the dictionary set are exactly equal (bijection)', () => {
    const taught = new Set<string>()
    for (const lesson of lessons) {
      lesson.wordIds.forEach((id) => taught.add(id))
      for (const ex of lesson.exercises) collectExerciseWordIds(ex).forEach((id) => taught.add(id))
    }
    expect([...taught].sort()).toEqual([...dictIds].sort())
  })

  it('every dictionary word appears tappable in at least one example sentence', () => {
    // A definition is only useful if the learner can actually encounter the
    // word in context. Every entry must surface as a resolved token somewhere.
    const seenInContext = new Set<string>()
    for (const entry of dictionary) {
      for (const ex of entry.examples) {
        for (const tok of tokenize(ex.kp)) {
          if (tok.entry) seenInContext.add(tok.entry.id)
        }
      }
    }
    const invisible = [...dictIds].filter((id) => !seenInContext.has(id))
    expect(
      invisible,
      `These words never appear as a tappable token in any example: ${invisible.join(', ')}`,
    ).toEqual([])
  })
})

describe('dictionary schema completeness', () => {
  it('every entry has a non-empty id, word, and >=1 translation', () => {
    for (const e of dictionary) {
      expect(e.id, 'id must be set').toBeTruthy()
      expect(e.word, `word for ${e.id}`).toBeTruthy()
      expect(e.translations.length, `${e.id} must have >=1 translation`).toBeGreaterThan(0)
      expect(e.translations.every((t) => t.trim().length > 0)).toBe(true)
    }
  })

  it('every entry has at least one example with both kp and en', () => {
    for (const e of dictionary) {
      expect(e.examples.length, `${e.id} must have >=1 example`).toBeGreaterThan(0)
      for (const ex of e.examples) {
        expect(ex.kp.trim().length, `${e.id} example kp`).toBeGreaterThan(0)
        expect(ex.en.trim().length, `${e.id} example en`).toBeGreaterThan(0)
      }
    }
  })

  it('ids are unique', () => {
    const ids = dictionary.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('headwords are unique (case-insensitive)', () => {
    const words = dictionary.map((e) => e.word.toLowerCase())
    expect(new Set(words).size).toBe(words.length)
  })

  it('the entryById index covers the whole dictionary', () => {
    expect(entryById.size).toBe(dictionary.length)
  })
})

describe('lesson integrity', () => {
  it('lesson ids are unique', () => {
    const ids = lessons.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every lesson has at least one exercise', () => {
    for (const l of lessons) expect(l.exercises.length).toBeGreaterThan(0)
  })

  it('exercise ids are unique across all lessons', () => {
    const ids = lessons.flatMap((l) => l.exercises.map((e) => e.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every multiple-choice / fill-blank answerId is a real word', () => {
    const dictIds = new Set(dictionary.map((e) => e.id))
    for (const l of lessons) {
      for (const ex of l.exercises) {
        if (ex.type === 'multiple-choice' || ex.type === 'fill-blank') {
          expect(dictIds.has(ex.answerId), `${ex.id} answerId ${ex.answerId}`).toBe(true)
        }
      }
    }
  })
})
