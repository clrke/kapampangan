import { useMemo, useState } from 'react'
import { dictionary } from '../data/dictionary'
import KpText from '../components/KpText'

export default function DictionaryPage() {
  const [q, setQ] = useState('')
  const entries = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const sorted = [...dictionary].sort((a, b) => a.word.localeCompare(b.word))
    if (!needle) return sorted
    return sorted.filter(
      (e) =>
        e.word.toLowerCase().includes(needle) ||
        e.translations.some((t) => t.toLowerCase().includes(needle)) ||
        (e.relatedTagalog ?? '').toLowerCase().includes(needle),
    )
  }, [q])

  return (
    <div className="dictionary">
      <h1>Dictionary</h1>
      <input
        className="text-input search"
        placeholder="Search a word or meaning…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <p className="count">{entries.length} of {dictionary.length} words</p>
      <ul className="dict-list">
        {entries.map((e) => (
          <li key={e.id} className="dict-entry">
            <div className="dict-head">
              <strong>{e.word}</strong>
              <em className="pos">{e.partOfSpeech}</em>
            </div>
            <div className="dict-tr">{e.translations.join(', ')}</div>
            {e.relatedTagalog && <div className="dict-tl">Tagalog: {e.relatedTagalog}</div>}
            <ul className="dict-ex">
              {e.examples.map((ex, i) => (
                <li key={i}>
                  <KpText text={ex.kp} /> — <span className="ex-en">{ex.en}</span>
                </li>
              ))}
            </ul>
            {e.notes && <p className="dict-note">{e.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
