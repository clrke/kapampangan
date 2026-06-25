/** A usage example for a dictionary entry. */
export interface Example {
  kp: string
  en: string
}

/** A single Kapampangan dictionary entry — the source of truth for a word. */
export interface DictionaryEntry {
  /** Canonical slug/id, lowercase, used to reference the word everywhere. */
  id: string
  /** The headword as displayed. */
  word: string
  partOfSpeech: PartOfSpeech
  /** English glosses. Must be non-empty. */
  translations: string[]
  /** At least one example sentence. */
  examples: Example[]
  /** Optional Tagalog cognate to aid Filipino learners. */
  relatedTagalog?: string
  notes?: string
}

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'particle'
  | 'conjunction'
  | 'preposition'
  | 'interjection'
  | 'phrase'
  | 'number'

/** Exercise variants used in lessons/quizzes. */
export type Exercise =
  | MultipleChoiceExercise
  | TranslateExercise
  | MatchingExercise
  | FillBlankExercise

export interface BaseExercise {
  id: string
  /** Dictionary word ids this exercise teaches/uses. */
  wordIds: string[]
}

/** Pick the correct translation of a word/phrase. */
export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice'
  prompt: string
  /** Dictionary id of the word being asked about. */
  answerId: string
  /** Asking direction. */
  direction: 'kp-to-en' | 'en-to-kp'
}

/** Type/select the translation of a full sentence. */
export interface TranslateExercise extends BaseExercise {
  type: 'translate'
  prompt: string
  direction: 'kp-to-en' | 'en-to-kp'
  /** Accepted answers (lowercased compare). */
  accepted: string[]
}

/** Match Kapampangan words to English meanings. */
export interface MatchingExercise extends BaseExercise {
  type: 'matching'
  /** Each pair references a dictionary id. */
  pairs: { wordId: string }[]
}

/** Fill the blank in a Kapampangan sentence with the right word. */
export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank'
  /** Sentence with `____` marking the blank. */
  prompt: string
  answerId: string
}

/** A lesson groups exercises around a theme and a set of words. */
export interface Lesson {
  id: string
  title: string
  theme: string
  /** Short intro shown before exercises. */
  intro: string
  /** Words taught in this lesson (dictionary ids). */
  wordIds: string[]
  exercises: Exercise[]
}
