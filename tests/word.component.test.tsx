import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Word from '../src/components/Word'
import KpText from '../src/components/KpText'
import { getEntry } from '../src/lib/lookup'

describe('<Word>', () => {
  it('shows translations and examples when clicked', async () => {
    const user = userEvent.setup()
    const entry = getEntry('mayap')!
    render(<Word entry={entry}>Mayap</Word>)

    // Popover not visible initially.
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Mayap' }))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveTextContent('good')
    expect(dialog).toHaveTextContent('Mayap ku.')
  })

  it('toggles closed on a second click', async () => {
    const user = userEvent.setup()
    const entry = getEntry('salamat')!
    render(<Word entry={entry}>Salamat</Word>)
    const btn = screen.getByRole('button', { name: 'Salamat' })
    await user.click(btn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(btn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('<KpText>', () => {
  it('wraps every known headword as a tappable button', () => {
    render(<KpText text="Mayap ku." />)
    expect(screen.getByRole('button', { name: 'Mayap' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ku' })).toBeInTheDocument()
  })

  it('leaves unknown words as plain text', () => {
    render(<KpText text="Kumusta ya i Kaycee?" />)
    expect(screen.queryByRole('button', { name: 'Kaycee' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Kumusta' })).toBeInTheDocument()
  })
})
