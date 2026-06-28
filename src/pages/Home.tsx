import { Link, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { loadProgress } from '../lib/progress'
import { contentStats } from '../lib/contentStats'

export default function Home() {
  const progress = loadProgress()
  const navigate = useNavigate()

  function goRandom() {
    const idx = Math.floor(Math.random() * lessons.length)
    navigate('/lesson/' + lessons[idx].id)
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Aral Kapampangan</h1>
        <p>Learn Kapampangan one bite-sized lesson at a time. Tap any highlighted word to see what it means.</p>
        <div className="pills">
          <span className="xp-pill">⭐ {progress.xp} XP</span>
          <span className="xp-pill">📚 {contentStats.lessons} lessons · {contentStats.hours.toFixed(1)} h</span>
        </div>
        <button className="random-btn" onClick={goRandom}>🎲 Random Lesson</button>
      </section>

      <ol className="lesson-list">
        {lessons.map((lesson, i) => {
          const done = progress.completedLessons.includes(lesson.id)
          return (
            <li key={lesson.id} className={`lesson-card ${done ? 'done' : ''}`}>
              <Link to={`/lesson/${lesson.id}`}>
                <span className="lesson-num">{i + 1}</span>
                <span className="lesson-meta">
                  <strong>{lesson.title}</strong>
                  <small>{lesson.theme}</small>
                </span>
                <span className="lesson-status">{done ? '✓' : '›'}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
