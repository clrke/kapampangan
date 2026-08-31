# HANDOFF — Aral Kapampangan

_Last updated: 2026-08-23 (session rollover). Overwrite stale sections as you go._

## 1. What this project is

A Duolingo-style web app for learning **Kapampangan** (Pampanga, Philippines).
React + TypeScript + Vite, tested with Vitest + React Testing Library, auto-deployed
to GitHub Pages on push to `main`.

- Repo root: `/Users/arke/Projects/kapampangan`
- Live: https://clrke.github.io/kapampangan/
- Branch: `main` (only branch; `origin/main` in sync)

## 2. Current objective

**Keep growing the content** — add real, attested Kapampangan dictionary entries and the
lessons that teach them, without ever breaking the coverage invariants.

Current state (from `npm test` output):
- **201 lessons · 526 words · ~1133 min (18.88 h)** of material
- Hard floor enforced in `tests/content.test.ts`: must always ship **≥ 600 min (10 h)**

## 3. Status right now

- Working tree **clean**, `main` **pushed**, nothing in flight.
- **All 7 test files / 63 tests pass** (`npm test`).
- Last commit: `0319119` — "Add family-expenses lesson: gastus, kuryenti, maski + apu grandchild sense"
  (added `mkt-gastus`, `mkt-kuryenti`, `part-maski`, enriched `fam-apu`, new lesson `mkt-10`).

Recent commit rhythm (useful pattern to imitate):
1. `Add N dictionary entries across M packs (...)` — entries + lessons together, or
2. `Batch N: define <words>` — fleshing out previously-thin entries, or
3. A single-topic commit: one small lesson + the 2–4 words it teaches.

## 4. How content is structured (read before editing data)

```
src/data/
  types.ts        # DictionaryEntry, Exercise (4 variants), Lesson, ContentPack
  dictionary.ts   # coreEntries[] + entries flattened from every pack
  lessons.ts      # coreLessons[] + lessons flattened from every pack
  packs/
    index.ts      # extraPacks[] — EVERY new pack MUST be imported + listed here
    *.json        # 24 packs: numbers, family, food, colors, verbs, time, body,
                  # animals, house, nature, greetings, emotions, questions, travel,
                  # clothing, actions, money, grammar, particles, everyday, school,
                  # places, adjectives, daily
src/lib/          # lookup, tokenizer, quiz, progress, contentStats
src/components/   # Word, KpText, ExercisePlayer
src/pages/        # Home, LessonView, DictionaryPage
tests/            # coverage + unit + component tests
.github/workflows/deploy.yml  # typecheck → test → build → Pages (blocks deploy on failure)
cheatsheet-legacy.html        # original static cheat sheet, reference only
```

A **ContentPack** is self-contained: `{ id, title, entries[], lessons[] }` and its lessons must
teach *exactly* its own entries. This keeps additions local and the global invariants satisfiable.

Entry id convention: pack-prefixed slug (`mkt-gastus`, `fam-apu`, `part-maski`, `gram-…`).
Lesson id convention: `<prefix>-L<N>` or `<prefix>-<N>` (both are in use; match the pack you're editing).

## 5. Invariants — the tests that will stop you

`tests/dictionary.coverage.test.ts` (the important one):
- **No definition left behind** — every dictionary entry is taught in ≥1 lesson.
- **No orphan references** — every word id a lesson/exercise references exists in the dictionary.
- **Bijection** — taught-word set == dictionary set, exactly.
- **In-context** — every word appears as a tappable token in ≥1 example sentence.
- **Schema completeness** — every entry has ≥1 translation and ≥1 example; ids and headwords unique.

Also: `tests/example-coverage.test.ts`, `tests/tokenizer.test.ts`, `tests/quiz.test.ts`,
`tests/negation.test.ts`, `tests/word.component.test.tsx`, `tests/content.test.ts`.

Practical consequence: **never add an entry without adding/extending a lesson that teaches it**,
and never reference a word id you haven't defined.

## 6. Content-quality constraints (established across prior sessions)

- **Attested Kapampangan only.** Avoid Tagalog intrusions — several past commits exist purely to
  remove them (e.g. `13d93a8` "fix Tagalog intrusions in 7 packs"). When a word looks Tagalog-ish,
  justify it in the entry's `notes` (see `part-maski`, which is attested in Kapampangan prose).
- Use `relatedTagalog` to help Filipino learners, and `notes` for etymology (Spanish loans, vocalism
  shifts), sense distinctions (`kayi` vs `kayli`), and reciprocal senses (`apu` = grandparent *and*
  grandchild).
- Example sentences must be natural and must contain the headword as a tokenizable word.
- Commit messages are substantive: say what was added and why the form is legitimate.

## 7. Environment gotchas

- This machine has `NODE_ENV=production` globally → npm skips devDependencies and React loads its
  production build. Install with:
  `NODE_ENV=development npm install --include=dev`
- `npm test` already sets `NODE_ENV=test` internally. `node_modules/` is present and working.
- Never `cd` / `git -C`; the working directory is already the repo root.

## 8. Privacy

`private/`, `conversations/`, `*.private.md`, `*.chat.txt` are git-ignored and **must never be
committed**. `private/conversation-jorelle.private.md` holds a real chat transcript that has been
mined for vocabulary (e.g. `ngeni`, `kayabe`, `abe`) — it is a source of authentic usage, but
its content stays local.

## 9. Immediate next steps

1. Pick the next content increment — a themed mini-lesson of 2–4 new words in an existing pack
   (recent sessions favored `money`, `family`, `particles`, `grammar`).
2. Add entries + the lesson that teaches them **in the same edit**; if you create a new pack file,
   register it in `src/data/packs/index.ts`.
3. Run `npm test` (must be 63+/63 green) and `npm run typecheck`.
4. Commit with a descriptive message (no Claude co-author, no "Generated with Claude Code") and push
   — per the user's standing instruction, commit + push finished units of work without asking.

## 10. Standing user preferences that affect this repo

- Commit finished work without asking; push immediately if ahead of upstream.
- No Claude co-authorship lines, no "Generated with Claude Code" in commits or PRs.
- Durable cross-session decisions belong in `.saint-expeditus/PROJECT_DECISIONS.md`
  (directory exists but the file does not yet — create it when a real decision is made).
