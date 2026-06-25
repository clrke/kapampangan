import { describe, expect, it } from 'vitest'
import { buildChoices, checkAnswer, checkTranslation, seededShuffle } from '../src/lib/quiz'
import { lessons } from '../src/data/lessons'

describe('seededShuffle', () => {
  it('is deterministic for the same seed', () => {
    const a = seededShuffle([1, 2, 3, 4, 5], 'x')
    const b = seededShuffle([1, 2, 3, 4, 5], 'x')
    expect(a).toEqual(b)
  })

  it('preserves all elements', () => {
    const out = seededShuffle(['a', 'b', 'c', 'd'], 'seed')
    expect([...out].sort()).toEqual(['a', 'b', 'c', 'd'])
  })
})

describe('buildChoices', () => {
  it('includes exactly one correct answer', () => {
    const choices = buildChoices('mayap', 'kp-to-en')
    expect(choices.filter((c) => c.correct)).toHaveLength(1)
  })

  it('produces the requested number of options with no duplicates', () => {
    const choices = buildChoices('ngeni', 'kp-to-en', 4)
    expect(choices).toHaveLength(4)
    expect(new Set(choices.map((c) => c.id)).size).toBe(4)
  })

  it('the correct choice maps back to the answer id', () => {
    const choices = buildChoices('salamat', 'en-to-kp')
    expect(choices.find((c) => c.correct)!.id).toBe('salamat')
  })

  it('throws on an unknown answer id', () => {
    expect(() => buildChoices('does-not-exist', 'kp-to-en')).toThrow()
  })
})

describe('checkTranslation', () => {
  it('accepts case- and whitespace-insensitive matches', () => {
    expect(checkTranslation('  I am FINE ', ['i am fine'])).toBe(true)
  })

  it('ignores trailing punctuation', () => {
    expect(checkTranslation('I am fine.', ['i am fine'])).toBe(true)
  })

  it('rejects wrong answers', () => {
    expect(checkTranslation('hello', ['i am fine'])).toBe(false)
  })
})

describe('checkAnswer', () => {
  it('validates a real multiple-choice exercise', () => {
    const ex = lessons[0].exercises.find((e) => e.id === 'greet-mc-1')!
    expect(checkAnswer(ex, 'kumusta')).toBe(true)
    expect(checkAnswer(ex, 'mayap')).toBe(false)
  })
})
