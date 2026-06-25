import { Fragment } from 'react'
import { tokenize } from '../lib/tokenizer'
import Word from './Word'

/**
 * Render a Kapampangan string with every known headword turned into a
 * tappable <Word>. Unknown tokens (names, loanwords, punctuation) render as-is.
 */
export function KpText({ text }: { text: string }) {
  const tokens = tokenize(text)
  return (
    <span className="kptext">
      {tokens.map((t, i) =>
        t.entry ? (
          <Word key={i} entry={t.entry}>
            {t.text}
          </Word>
        ) : (
          <Fragment key={i}>{t.text}</Fragment>
        ),
      )}
    </span>
  )
}

export default KpText
