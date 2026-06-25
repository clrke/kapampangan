import type { DictionaryEntry } from './types'
import { extraPacks } from './packs'

/**
 * The Kapampangan dictionary — single source of truth.
 *
 * INVARIANT (enforced by tests/dictionary.coverage.test.ts):
 *  - Every entry here MUST be taught in at least one lesson (no word left behind).
 *  - Every word referenced by a lesson/exercise MUST exist here (no orphan refs).
 *  - Every entry MUST have >=1 translation and >=1 example.
 *  - Ids and headwords are unique.
 *
 * Per project decision: the dictionary expands as lessons demand it.
 */
const coreEntries: DictionaryEntry[] = [
  // --- Greetings & courtesy ---
  {
    id: 'kumusta',
    word: 'Kumusta',
    partOfSpeech: 'phrase',
    translations: ['how are you', 'how is'],
    examples: [
      { kp: 'Kumusta ka?', en: 'How are you?' },
      { kp: 'Kumusta ya i tatang mu?', en: 'How is your father?' },
    ],
    relatedTagalog: 'kumusta',
  },
  {
    id: 'mayap',
    word: 'Mayap',
    partOfSpeech: 'adjective',
    translations: ['good', 'fine', 'well'],
    examples: [
      { kp: 'Mayap ku.', en: 'I am fine.' },
      { kp: 'Mayap a abak!', en: 'Good morning!' },
    ],
    relatedTagalog: 'mabuti / maganda',
  },
  {
    id: 'salamat',
    word: 'Salamat',
    partOfSpeech: 'interjection',
    translations: ['thank you', 'thanks'],
    examples: [
      { kp: 'Salamat ku.', en: 'Thank you.' },
      { kp: 'Dakal a salamat!', en: 'Thank you very much!' },
    ],
    relatedTagalog: 'salamat',
  },
  {
    id: 'dakal',
    word: 'Dakal',
    partOfSpeech: 'adjective',
    translations: ['many', 'much', 'a lot'],
    examples: [
      { kp: 'Dakal a salamat.', en: 'Many thanks.' },
      { kp: 'Dakal a tau.', en: 'Many people.' },
    ],
    relatedTagalog: 'marami',
  },
  {
    id: 'wa',
    word: 'Wa',
    partOfSpeech: 'particle',
    translations: ['yes'],
    examples: [
      { kp: 'Wa, mayap ku.', en: 'Yes, I am fine.' },
    ],
    relatedTagalog: 'oo',
  },
  {
    id: 'ali',
    word: 'Ali',
    partOfSpeech: 'particle',
    translations: ['no', 'not'],
    examples: [
      { kp: 'Ali ku balu.', en: 'I do not know.' },
      { kp: 'Ali ya sinali.', en: 'He/she did not buy it.' },
    ],
    relatedTagalog: 'hindi',
    notes: 'General negator — negates an action or quality (like Tagalog "hindi"). Contrast with "ala" (there is none) and "aliwa" (different/other).',
  },
  {
    id: 'e',
    word: 'E',
    partOfSpeech: 'particle',
    translations: ['not', "don't", "didn't"],
    examples: [
      { kp: 'E ku balu.', en: 'I do not know.' },
      { kp: 'E ka marine.', en: 'Do not be shy.' },
    ],
    relatedTagalog: 'hindi',
    notes: 'The short, everyday spoken form of "ali", used right before a verb and fused with a pronoun: e + ku → "eku" (I don\'t/didn\'t).',
  },
  {
    id: 'ala',
    word: 'Ala',
    partOfSpeech: 'particle',
    translations: ['there is none', 'nothing', 'none', 'have none'],
    examples: [
      { kp: 'Ala ku kuwarta.', en: 'I have no money.' },
      { kp: 'Ala na.', en: 'There is none left.' },
    ],
    relatedTagalog: 'wala',
    notes: 'Existential negator — says something does not exist or is absent (like Tagalog "wala"). The opposite of "ati" (there is). Do NOT use "ali" for this.',
  },
  {
    id: 'aliwa',
    word: 'Aliwa',
    partOfSpeech: 'adjective',
    translations: ['other', 'another', 'different', 'else'],
    examples: [
      { kp: 'Aliwa ya ini.', en: 'This one is different.' },
      { kp: 'Aliwa ya i abe ku.', en: 'My companion is a different one (someone else).' },
    ],
    relatedTagalog: 'iba',
    notes: 'Means "other / different / another" (like Tagalog "iba"). It is NOT a general negator — it points to a different thing rather than negating an action.',
  },
  {
    id: 'ku',
    word: 'ku',
    partOfSpeech: 'pronoun',
    translations: ['I', 'me (enclitic)'],
    examples: [
      { kp: 'Mayap ku.', en: 'I am fine.' },
      { kp: 'Ikit ku ya.', en: 'I saw him/her.' },
    ],
    notes: 'Enclitic pronoun — attaches after the verb/adjective.',
  },

  // --- Time & demonstratives ---
  {
    id: 'ngeni',
    word: 'Ngeni',
    partOfSpeech: 'adverb',
    translations: ['now', 'today'],
    examples: [
      { kp: 'Ngeni ku munta.', en: 'I will go now.' },
    ],
    relatedTagalog: 'ngayon',
  },
  {
    id: 'gang',
    word: 'Gang',
    partOfSpeech: 'preposition',
    translations: ['until', 'up to'],
    examples: [
      { kp: 'Ngeni gang bukas.', en: 'From now until tomorrow.' },
    ],
    relatedTagalog: 'hanggang',
    notes: 'Also spelled "anggang".',
  },
  {
    id: 'eni',
    word: 'Eni',
    partOfSpeech: 'pronoun',
    translations: ['this', 'these'],
    examples: [
      { kp: 'Eni ya i abe ku.', en: 'This is my companion.' },
    ],
    relatedTagalog: 'ito',
    notes: 'Colloquial; the standard form is "ini".',
  },
  {
    id: 'na',
    word: 'na',
    partOfSpeech: 'particle',
    translations: ['already', 'now'],
    examples: [
      { kp: 'Mako na ku.', en: 'I am leaving already.' },
    ],
    relatedTagalog: 'na',
  },

  // --- People & knowing ---
  {
    id: 'abe',
    word: 'Abe',
    partOfSpeech: 'noun',
    translations: ['companion', 'friend', 'buddy'],
    examples: [
      { kp: 'Abe ku ya.', en: 'He/she is my companion.' },
    ],
    relatedTagalog: 'kasama',
  },
  {
    id: 'metong',
    word: 'Metong',
    partOfSpeech: 'number',
    translations: ['one'],
    examples: [
      { kp: 'Metong a abe.', en: 'One companion.' },
    ],
    relatedTagalog: 'isa',
  },
  {
    id: 'tamu',
    word: 'tamu',
    partOfSpeech: 'pronoun',
    translations: ['we', 'us (inclusive)'],
    examples: [
      { kp: 'Mako tamu.', en: 'Let us go.' },
    ],
    relatedTagalog: 'tayo',
  },
  {
    id: 'ikit',
    word: 'Ikit',
    partOfSpeech: 'verb',
    translations: ['to see', 'saw'],
    examples: [
      { kp: 'Ikit ku ya.', en: 'I saw him/her.' },
    ],
    relatedTagalog: 'kita / nakita',
  },
  {
    id: 'balu',
    word: 'Balu',
    partOfSpeech: 'verb',
    translations: ['to know'],
    examples: [
      { kp: 'Ali ku balu.', en: 'I do not know.' },
    ],
    relatedTagalog: 'alam',
  },
  {
    id: 'ya',
    word: 'ya',
    partOfSpeech: 'pronoun',
    translations: ['he', 'she', 'it'],
    examples: [
      { kp: 'Abe ku ya.', en: 'He/she is my companion.' },
    ],
    notes: 'Third-person enclitic pronoun.',
  },
  {
    id: 'katawan',
    word: 'Katawan',
    partOfSpeech: 'noun',
    translations: ['body'],
    examples: [
      { kp: 'Masakit ya ing katawan ku.', en: 'My body aches.' },
    ],
    relatedTagalog: 'katawan',
  },
]

/** The full dictionary: core words plus every content pack's entries. */
export const dictionary: DictionaryEntry[] = [
  ...coreEntries,
  ...extraPacks.flatMap((p) => p.entries),
]

export default dictionary
