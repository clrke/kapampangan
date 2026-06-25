import { describe, expect, it } from 'vitest'
import { tokenize, wordTokens } from '../src/lib/tokenizer'
import { normalize } from '../src/lib/lookup'

describe('tokenizer', () => {
  it('resolves known headwords to dictionary entries', () => {
    const tokens = tokenize('Mayap ku.')
    const words = tokens.filter((t) => t.entry).map((t) => t.entry!.id)
    expect(words).toContain('mayap')
    expect(words).toContain('ku')
  })

  it('preserves punctuation and whitespace as non-word tokens', () => {
    const rebuilt = tokenize('Kumusta ka?').map((t) => t.text).join('')
    expect(rebuilt).toBe('Kumusta ka?')
  })

  it('does not resolve unknown words (names, loanwords)', () => {
    const tokens = tokenize('Kumusta ya i Kaycee?')
    const kaycee = tokens.find((t) => t.text === 'Kaycee')
    expect(kaycee?.entry).toBeUndefined()
  })

  it('matches case-insensitively', () => {
    expect(wordTokens('MAYAP ku').some((t) => t.entry!.id === 'mayap')).toBe(true)
  })

  it('normalize strips surrounding punctuation', () => {
    expect(normalize('Kumusta?')).toBe('kumusta')
    expect(normalize('"Mayap,"')).toBe('mayap')
  })
})
