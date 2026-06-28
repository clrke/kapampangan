import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getLesson } from '../lib/lookup'
import { getEntry } from '../lib/lookup'
import ExercisePlayer, { XP_PER_CORRECT } from '../components/ExercisePlayer'
import KpText from '../components/KpText'
import { completeLesson } from '../lib/progress'
import { lessons } from '../data/lessons'

export default function LessonView() {
  const { id } = useParams<{ id: string }>()
  const lesson = id ? getLesson(id) : undefined
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro')
  const [score, setScore] = useState({ correct: 0, total: 0 })

  if (!lesson) {
    return (
      <div className="lesson">
        <p>Lesson not found.</p>
        <Link to="/" className="btn">← Back to lessons</Link>
      </div>
    )
  }

  if (phase === 'intro') {
    return (
      <div className="lesson">
        <Link to="/" className="back">← Lessons</Link>
        <h1>{lesson.title}</h1>
        <p className="intro">{lesson.intro}</p>
        <div className="word-preview">
          <h3>Words in this lesson</h3>
          <div className="chips">
            {lesson.wordIds.map((wid) => {
              const e = getEntry(wid)
              if (!e) return null
              return (
                <span key={wid} className="chip">
                  <KpText text={e.word} /> — {e.translations[0]}
                </span>
              )
            })}
          </div>
        </div>
        <button className="btn primary big" onClick={() => setPhase('play')}>
          Start lesson
        </button>
      </div>
    )
  }

  if (phase === 'play') {
    return (
      <div className="lesson">
        <Link to="/" className="back">← Quit</Link>
        <ExercisePlayer
          lesson={lesson}
          onComplete={(correct, total) => {
            completeLesson(lesson.id, correct * XP_PER_CORRECT)
            setScore({ correct, total })
            setPhase('done')
          }}
        />
      </div>
    )
  }

  const lessonIndex = lessons.findIndex((l) => l.id === lesson.id)
  const nextLesson = lessonIndex >= 0 ? lessons[lessonIndex + 1] : undefined

  function goNext() {
    setPhase('intro')
    setScore({ correct: 0, total: 0 })
    navigate('/lesson/' + nextLesson!.id)
  }

  return (
    <div className="lesson done-screen">
      <h1>🎉 Lesson complete!</h1>
      <p className="score">
        {score.correct} / {score.total} correct · +{score.correct * XP_PER_CORRECT} XP
      </p>
      <div className="done-actions">
        {nextLesson ? (
          <button className="btn primary" onClick={goNext}>Next Lesson →</button>
        ) : (
          <Link to="/" className="btn primary">Back to lessons</Link>
        )}
        <Link to="/" className="btn">Back to lessons</Link>
        <button className="btn" onClick={() => { setScore({ correct: 0, total: 0 }); setPhase('play') }}>
          Try again
        </button>
      </div>
    </div>
  )
}
