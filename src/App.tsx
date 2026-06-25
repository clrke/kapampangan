import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LessonView from './pages/LessonView'
import DictionaryPage from './pages/DictionaryPage'

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">🇵🇭 Aral Kapampangan</Link>
        <nav>
          <Link to="/">Lessons</Link>
          <Link to="/dictionary">Dictionary</Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonView />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
        </Routes>
      </main>
      <footer className="appfoot">
        Made as a personal study aid · Amánu&rsquo;ng Kapampángan
      </footer>
    </div>
  )
}
