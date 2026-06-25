# 🇵🇭 Aral Kapampangan — Learn Kapampangan

A Duolingo-style app for learning **Kapampangan** (the language of Pampanga, Philippines): bite-sized lessons, quizzes, and a tappable dictionary where every word reveals its translation and example usage.

👉 **Live site:** https://clrke.github.io/kapampangan/

## Features

- **Lessons & quizzes** — multiple-choice, translate, fill-in-the-blank, and matching exercises, with progress and XP saved locally.
- **Tappable words** — tap any highlighted Kapampangan word anywhere in the app to see its translations and example sentences.
- **Searchable dictionary** — the full word list with parts of speech, Tagalog cognates, and examples.

## Tech stack

React + TypeScript + Vite, tested with Vitest + React Testing Library, deployed to GitHub Pages via GitHub Actions.

## Develop locally

> **Note:** this environment has `NODE_ENV=production` globally, which makes npm skip devDependencies and React load its production build. Install and test accordingly:

```sh
NODE_ENV=development npm install --include=dev   # install everything
npm run dev                                       # local dev server
npm test                                          # runs with NODE_ENV=test (see package.json)
npm run build                                      # production build to dist/
```

## Tests — *no dictionary definition left behind*

`tests/dictionary.coverage.test.ts` enforces the core data invariant:

- **No definition left behind** — every dictionary entry is taught in ≥1 lesson.
- **No orphan references** — every word a lesson/exercise references exists in the dictionary.
- **Bijection** — the set of words taught and the dictionary are exactly equal.
- **In-context** — every word appears as a tappable token in ≥1 example sentence.
- **Schema completeness & uniqueness** — every entry has translations + examples; ids/headwords are unique.

Plus tokenizer, quiz-logic, and `<Word>`/`<KpText>` component tests. The CI workflow blocks deploys if any of these fail.

## Project structure

```
src/
  data/        dictionary.ts, lessons.ts, types.ts   (source of truth)
  lib/         lookup, tokenizer, quiz, progress
  components/  Word, KpText, ExercisePlayer
  pages/       Home, LessonView, DictionaryPage
tests/         coverage + unit + component tests
.github/workflows/deploy.yml
cheatsheet-legacy.html   (the original static cheat sheet, kept for reference)
```

## Privacy

Private chat transcripts are **never committed** — `.gitignore` excludes `private/`, `conversations/`, `*.private.md`, and `*.chat.txt`. Keep any personal conversation logs inside those paths.
