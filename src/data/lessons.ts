import type { Lesson } from './types'

/**
 * Lessons. Each `wordIds` entry teaches a dictionary word.
 * The union of all lesson wordIds MUST equal the dictionary (enforced by tests).
 */
export const lessons: Lesson[] = [
  {
    id: 'greetings',
    title: 'Greetings & Courtesy',
    theme: 'Saying hello and being polite',
    intro:
      'Start with the essentials: greet someone, say you are fine, and thank them. Tap any highlighted word to see its meaning.',
    wordIds: ['kumusta', 'mayap', 'salamat', 'dakal', 'wa', 'ali', 'ku'],
    exercises: [
      {
        id: 'greet-mc-1',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does "Kumusta ka?" mean?',
        wordIds: ['kumusta'],
        answerId: 'kumusta',
      },
      {
        id: 'greet-mc-2',
        type: 'multiple-choice',
        direction: 'en-to-kp',
        prompt: 'How do you say "thank you"?',
        wordIds: ['salamat'],
        answerId: 'salamat',
      },
      {
        id: 'greet-fill-1',
        type: 'fill-blank',
        prompt: 'Dakal a ____!  (Thank you very much!)',
        wordIds: ['dakal', 'salamat'],
        answerId: 'salamat',
      },
      {
        id: 'greet-translate-1',
        type: 'translate',
        direction: 'kp-to-en',
        prompt: 'Mayap ku.',
        wordIds: ['mayap', 'ku'],
        accepted: ['i am fine', 'i am good', 'i am well', "i'm fine", "i'm good"],
      },
      {
        id: 'greet-match-1',
        type: 'matching',
        wordIds: ['wa', 'ali', 'mayap'],
        pairs: [{ wordId: 'wa' }, { wordId: 'ali' }, { wordId: 'mayap' }],
      },
    ],
  },
  {
    id: 'time-demonstratives',
    title: 'Time & Demonstratives',
    theme: 'Now, until, this, and "already"',
    intro:
      'Learn small but essential connective words: when something happens and how to point at things.',
    wordIds: ['ngeni', 'gang', 'eni', 'na'],
    exercises: [
      {
        id: 'time-mc-1',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does "Ngeni" mean?',
        wordIds: ['ngeni'],
        answerId: 'ngeni',
      },
      {
        id: 'time-mc-2',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does "Gang" mean?',
        wordIds: ['gang'],
        answerId: 'gang',
      },
      {
        id: 'time-fill-1',
        type: 'fill-blank',
        prompt: 'Ngeni ____ bukas.  (From now until tomorrow.)',
        wordIds: ['ngeni', 'gang'],
        answerId: 'gang',
      },
      {
        id: 'time-mc-3',
        type: 'multiple-choice',
        direction: 'en-to-kp',
        prompt: 'Which word means "this"?',
        wordIds: ['eni'],
        answerId: 'eni',
      },
      {
        id: 'time-mc-4',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does the particle "na" express?',
        wordIds: ['na'],
        answerId: 'na',
      },
    ],
  },
  {
    id: 'people-knowing',
    title: 'People & Knowing',
    theme: 'Companions, counting, and the verbs see/know',
    intro:
      'Talk about people around you and express seeing and knowing — plus the pronouns that glue Kapampangan sentences together.',
    wordIds: ['abe', 'metong', 'tamu', 'ikit', 'balu', 'ya', 'katawan'],
    exercises: [
      {
        id: 'people-mc-1',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does "Abe" mean?',
        wordIds: ['abe'],
        answerId: 'abe',
      },
      {
        id: 'people-mc-2',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What number is "Metong"?',
        wordIds: ['metong'],
        answerId: 'metong',
      },
      {
        id: 'people-translate-1',
        type: 'translate',
        direction: 'kp-to-en',
        prompt: 'Ikit ku ya.',
        wordIds: ['ikit', 'ku', 'ya'],
        accepted: ['i saw him', 'i saw her', 'i saw him/her', 'i saw them', 'i saw it'],
      },
      {
        id: 'people-fill-1',
        type: 'fill-blank',
        prompt: 'Ali ku ____.  (I do not know.)',
        wordIds: ['ali', 'ku', 'balu'],
        answerId: 'balu',
      },
      {
        id: 'people-mc-3',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does "Katawan" mean?',
        wordIds: ['katawan'],
        answerId: 'katawan',
      },
      {
        id: 'people-match-1',
        type: 'matching',
        wordIds: ['abe', 'tamu', 'ya'],
        pairs: [{ wordId: 'abe' }, { wordId: 'tamu' }, { wordId: 'ya' }],
      },
    ],
  },
]

export default lessons
