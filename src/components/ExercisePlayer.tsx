import { useMemo, useState } from 'react'
import type { Exercise, Lesson } from '../data/types'
import { getEntry } from '../lib/lookup'
import { buildChoices, checkTranslation, labelFor, seededShuffle } from '../lib/quiz'
import KpText from './KpText'

const XP_PER_CORRECT = 10

export function ExercisePlayer({
  lesson,
  onComplete,
}: {
  lesson: Lesson
  onComplete: (correct: number, total: number) => void
}) {
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [wasRight, setWasRight] = useState(false)

  const ex = lesson.exercises[index]
  const isLast = index === lesson.exercises.length - 1

  function record(right: boolean) {
    setAnswered(true)
    setWasRight(right)
    if (right) setCorrect((c) => c + 1)
  }

  function next() {
    if (isLast) {
      onComplete(correct, lesson.exercises.length)
      return
    }
    setIndex((i) => i + 1)
    setAnswered(false)
    setWasRight(false)
  }

  return (
    <div className="exercise">
      <div className="progress-row">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(index / lesson.exercises.length) * 100}%` }}
          />
        </div>
        <span className="progress-label">
          {index + 1} / {lesson.exercises.length}
        </span>
      </div>

      <ExerciseBody key={ex.id} ex={ex} answered={answered} onAnswer={record} />

      {answered && (
        <div className={`feedback ${wasRight ? 'ok' : 'bad'}`}>
          <span>{wasRight ? '✓ Tama! (Correct)' : '✗ Mali (Not quite)'}</span>
          <button className="btn primary" onClick={next}>
            {isLast ? 'Finish' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  )
}

function ExerciseBody({
  ex,
  answered,
  onAnswer,
}: {
  ex: Exercise
  answered: boolean
  onAnswer: (right: boolean) => void
}) {
  switch (ex.type) {
    case 'multiple-choice':
    case 'fill-blank':
      return <ChoiceExercise ex={ex} answered={answered} onAnswer={onAnswer} />
    case 'translate':
      return <TranslateInput ex={ex} answered={answered} onAnswer={onAnswer} />
    case 'matching':
      return <Matching ex={ex} answered={answered} onAnswer={onAnswer} />
  }
}

function ChoiceExercise({
  ex,
  answered,
  onAnswer,
}: {
  ex: Extract<Exercise, { type: 'multiple-choice' | 'fill-blank' }>
  answered: boolean
  onAnswer: (right: boolean) => void
}) {
  const direction = ex.type === 'multiple-choice' ? ex.direction : 'en-to-kp'
  const choices = useMemo(() => buildChoices(ex.answerId, direction), [ex.answerId, direction])
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <div>
      <h2 className="prompt">
        <KpText text={ex.prompt} />
      </h2>
      <div className="choices">
        {choices.map((c) => {
          const state = !answered
            ? ''
            : c.correct
            ? 'correct'
            : c.id === picked
            ? 'wrong'
            : ''
          return (
            <button
              key={c.id}
              className={`choice ${state}`}
              disabled={answered}
              onClick={() => {
                setPicked(c.id)
                onAnswer(c.correct)
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TranslateInput({
  ex,
  answered,
  onAnswer,
}: {
  ex: Extract<Exercise, { type: 'translate' }>
  answered: boolean
  onAnswer: (right: boolean) => void
}) {
  const [value, setValue] = useState('')
  return (
    <div>
      <h2 className="prompt">
        Translate: <KpText text={ex.prompt} />
      </h2>
      <input
        className="text-input"
        placeholder="Type the English meaning…"
        value={value}
        disabled={answered}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !answered && value.trim()) {
            onAnswer(checkTranslation(value, ex.accepted))
          }
        }}
      />
      {!answered && (
        <button
          className="btn primary"
          disabled={!value.trim()}
          onClick={() => onAnswer(checkTranslation(value, ex.accepted))}
        >
          Check
        </button>
      )}
      {answered && (
        <p className="answer-key">Accepted: {ex.accepted[0]}</p>
      )}
    </div>
  )
}

function Matching({
  ex,
  answered,
  onAnswer,
}: {
  ex: Extract<Exercise, { type: 'matching' }>
  answered: boolean
  onAnswer: (right: boolean) => void
}) {
  const left = ex.pairs.map((p) => p.wordId)
  const right = useMemo(() => seededShuffle(left, ex.id), [ex.id]) // eslint-disable-line react-hooks/exhaustive-deps
  const [selLeft, setSelLeft] = useState<string | null>(null)
  const [matched, setMatched] = useState<Record<string, string>>({})

  function tryMatch(rightId: string) {
    if (!selLeft) return
    const next = { ...matched, [selLeft]: rightId }
    setMatched(next)
    setSelLeft(null)
    if (Object.keys(next).length === left.length) {
      const allRight = Object.entries(next).every(([l, r]) => l === r)
      onAnswer(allRight)
    }
  }

  return (
    <div>
      <h2 className="prompt">Match each word to its meaning</h2>
      <div className="match-grid">
        <div className="match-col">
          {left.map((id) => {
            const e = getEntry(id)!
            return (
              <button
                key={id}
                className={`choice ${selLeft === id ? 'sel' : ''} ${matched[id] ? 'done' : ''}`}
                disabled={answered || !!matched[id]}
                onClick={() => setSelLeft(id)}
              >
                {e.word}
              </button>
            )
          })}
        </div>
        <div className="match-col">
          {right.map((id) => {
            const e = getEntry(id)!
            const used = Object.values(matched).includes(id)
            return (
              <button
                key={id}
                className={`choice ${used ? 'done' : ''}`}
                disabled={answered || used}
                onClick={() => tryMatch(id)}
              >
                {labelFor(e, 'kp-to-en')}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { XP_PER_CORRECT }
export default ExercisePlayer
