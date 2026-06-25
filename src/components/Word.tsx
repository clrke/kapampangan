import { useEffect, useId, useRef, useState } from 'react'
import type { DictionaryEntry } from '../data/types'

/**
 * A tappable Kapampangan word. Clicking it toggles a popover showing
 * translations and example usage pulled from the dictionary entry.
 */
export function Word({ entry, children }: { entry: DictionaryEntry; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span className="word-wrap" ref={ref}>
      <button
        type="button"
        className="word"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
      </button>
      {open && (
        <span className="word-pop" id={panelId} role="dialog" aria-label={`Definition of ${entry.word}`}>
          <span className="word-pop-head">
            <strong>{entry.word}</strong>
            <em className="pos">{entry.partOfSpeech}</em>
          </span>
          <span className="word-pop-tr">{entry.translations.join(', ')}</span>
          {entry.relatedTagalog && (
            <span className="word-pop-tl">Tagalog: {entry.relatedTagalog}</span>
          )}
          <span className="word-pop-ex-label">Examples</span>
          <ul className="word-pop-ex">
            {entry.examples.map((ex, i) => (
              <li key={i}>
                <span className="ex-kp">{ex.kp}</span>
                <span className="ex-en">{ex.en}</span>
              </li>
            ))}
          </ul>
          {entry.notes && <span className="word-pop-note">{entry.notes}</span>}
        </span>
      )}
    </span>
  )
}

export default Word
