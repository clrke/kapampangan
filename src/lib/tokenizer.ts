import type { DictionaryEntry } from '../data/types'
import { lookupWord } from './lookup'

export interface Token {
  text: string
  /** Present when the token matches a dictionary headword. */
  entry?: DictionaryEntry
}

/**
 * Split a Kapampangan string into tokens, attaching a dictionary entry to
 * every token that matches a known headword. Whitespace and punctuation are
 * preserved as their own (non-word) tokens so the original text can be
 * faithfully re-rendered.
 */
export function tokenize(text: string): Token[] {
  // Split while keeping the delimiters (spaces and punctuation).
  const parts = text.split(/(\s+|[.,!?;:¿¡"'()]+)/).filter((p) => p !== '')
  return parts.map((part) => {
    const entry = lookupWord(part)
    return entry ? { text: part, entry } : { text: part }
  })
}

/** Convenience: the subset of tokens that resolved to a dictionary entry. */
export function wordTokens(text: string): Token[] {
  return tokenize(text).filter((t) => t.entry)
}
