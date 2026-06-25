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
    id: 'saying-no',
    title: 'Saying No: ali · e · ala · aliwa',
    theme: 'Three kinds of "not" — and the word that means "different"',
    intro:
      'Kapampangan splits the idea of "no" into different words. Learn when to use each: ali / e (not), ala (there is none), and aliwa (different / other).',
    wordIds: ['ali', 'e', 'ala', 'aliwa'],
    exercises: [
      {
        id: 'no-mc-ali',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does the particle "Ali" mean?',
        wordIds: ['ali'],
        answerId: 'ali',
      },
      {
        id: 'no-mc-ala',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does "Ala" mean?',
        wordIds: ['ala'],
        answerId: 'ala',
      },
      {
        id: 'no-mc-aliwa',
        type: 'multiple-choice',
        direction: 'kp-to-en',
        prompt: 'What does "Aliwa" mean?',
        wordIds: ['aliwa'],
        answerId: 'aliwa',
      },
      {
        id: 'no-fill-ala',
        type: 'fill-blank',
        prompt: '____ ku kuwarta.  (I have no money.)',
        wordIds: ['ala', 'ku'],
        answerId: 'ala',
      },
      {
        id: 'no-fill-aliwa',
        type: 'fill-blank',
        prompt: '____ ya i abe ku.  (My companion is a different one.)',
        wordIds: ['aliwa', 'ya', 'abe'],
        answerId: 'aliwa',
      },
      {
        id: 'no-translate-e',
        type: 'translate',
        direction: 'kp-to-en',
        prompt: 'E ku balu.',
        wordIds: ['e', 'ku', 'balu'],
        accepted: ['i do not know', "i don't know", 'i dont know'],
      },
      {
        id: 'no-match',
        type: 'matching',
        wordIds: ['ali', 'ala', 'aliwa'],
        pairs: [{ wordId: 'ali' }, { wordId: 'ala' }, { wordId: 'aliwa' }],
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
