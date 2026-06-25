import { dictionary } from '../data/dictionary'
import type { DictionaryEntry } from '../data/types'
import { lookupWord, normalize } from './lookup'

export interface Token {
  text: string
  /** Present when the token matches a dictionary headword. */
  entry?: DictionaryEntry
}

const DELIM = /^(\s+|[.,!?;:¿¡"'()]+)$/
const SPLIT = /(\s+|[.,!?;:¿¡"'()]+)/

/** Longest headword length (in words) — enables multi-word ("Labing metung") matching. */
const maxPhraseWords = dictionary.reduce(
  (max, e) => Math.max(max, normalize(e.word).split(' ').filter(Boolean).length),
  1,
)

function isDelim(s: string): boolean {
  return DELIM.test(s)
}

/**
 * Split a Kapampangan string into tokens, attaching a dictionary entry to
 * every token that matches a known headword — including multi-word headwords,
 * matched greedily (longest first). Whitespace and punctuation are preserved
 * as their own tokens so the original text can be faithfully re-rendered.
 */
export function tokenize(text: string): Token[] {
  const parts = text.split(SPLIT).filter((p) => p !== '')
  const out: Token[] = []
  let i = 0

  while (i < parts.length) {
    if (isDelim(parts[i])) {
      out.push({ text: parts[i] })
      i++
      continue
    }

    // Try to match the longest run of words (up to maxPhraseWords) as a phrase.
    let bestEnd = -1
    let bestEntry: DictionaryEntry | undefined
    if (maxPhraseWords > 1) {
      const words: string[] = []
      for (let j = i; j < parts.length && words.length < maxPhraseWords; j++) {
        if (isDelim(parts[j])) continue
        words.push(normalize(parts[j]))
        if (words.length >= 2) {
          const entry = lookupWord(words.join(' '))
          if (entry) {
            bestEnd = j
            bestEntry = entry
          }
        }
      }
    }

    if (bestEntry) {
      out.push({ text: parts.slice(i, bestEnd + 1).join(''), entry: bestEntry })
      i = bestEnd + 1
      continue
    }

    const entry = lookupWord(parts[i])
    out.push(entry ? { text: parts[i], entry } : { text: parts[i] })
    i++
  }

  return out
}

/** Convenience: the subset of tokens that resolved to a dictionary entry. */
export function wordTokens(text: string): Token[] {
  return tokenize(text).filter((t) => t.entry)
}
