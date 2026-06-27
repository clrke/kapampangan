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

  describe('English contractions are equivalent to their full forms', () => {
    const cases: [string, string][] = [
      ['do not', "don't"],
      ['I am fine', "I'm fine"],
      ['cannot', "can't"],
      ['can not', "can't"],
      ['will not', "won't"],
      ['it is mine', "it's mine"],
      ['I have eaten', "I've eaten"],
      ['you are kind', "you're kind"],
      ['they will go', "they'll go"],
      ['she is not here', "she isn't here"],
      ['we would go', "we'd go"],
      ['that is not it', "that's not it"],
      ['let us eat', "let's eat"],
    ]
    for (const [expanded, contracted] of cases) {
      it(`"${expanded}" ≡ "${contracted}" (both directions)`, () => {
        // accepted written expanded, learner types contracted
        expect(checkTranslation(contracted, [expanded])).toBe(true)
        // accepted written contracted, learner types expanded
        expect(checkTranslation(expanded, [contracted])).toBe(true)
      })
    }

    it('normalizes smart/curly apostrophes too', () => {
      expect(checkTranslation('do not', ['don’t'])).toBe(true)
      expect(checkTranslation('don’t', ['do not'])).toBe(true)
    })

    it('still rejects genuinely different answers', () => {
      expect(checkTranslation("I'm fine", ['i am sad'])).toBe(false)
      expect(checkTranslation("don't go", ['do go'])).toBe(false)
    })
  })
})

describe('checkAnswer', () => {
  it('validates a real multiple-choice exercise', () => {
    const ex = lessons[0].exercises.find((e) => e.id === 'greet-mc-1')!
    expect(checkAnswer(ex, 'kumusta')).toBe(true)
    expect(checkAnswer(ex, 'mayap')).toBe(false)
  })
})
