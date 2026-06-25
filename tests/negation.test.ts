import { describe, expect, it } from 'vitest'
import { getEntry, getLesson } from '../src/lib/lookup'

/**
 * Locks the semantic contrast taught by the "Saying No" lesson so future edits
 * can't silently swap the meanings of these easily-confused words.
 */
describe('negation / otherness words', () => {
  it('ali and e both mean "not" (Tagalog hindi)', () => {
    for (const id of ['ali', 'e']) {
      const e = getEntry(id)!
      expect(e.translations).toContain('not')
      expect(e.relatedTagalog).toBe('hindi')
    }
  })

  it('ala is existential negation (Tagalog wala)', () => {
    const ala = getEntry('ala')!
    expect(ala.relatedTagalog).toBe('wala')
    expect(ala.translations.join(' ')).toMatch(/none|nothing/)
  })

  it('aliwa means different/other (Tagalog iba)', () => {
    const aliwa = getEntry('aliwa')!
    expect(aliwa.relatedTagalog).toBe('iba')
    expect(aliwa.translations).toContain('different')
  })

  it('the lesson teaches all four contrasting words', () => {
    const lesson = getLesson('saying-no')!
    expect(lesson.wordIds).toEqual(expect.arrayContaining(['ali', 'e', 'ala', 'aliwa']))
  })
})
