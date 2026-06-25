import { describe, expect, it } from 'vitest'
import { contentStats, lessonMinutes, totalMinutes } from '../src/lib/contentStats'
import { lessons } from '../src/data/lessons'

describe('content stats', () => {
  it('every lesson contributes positive minutes', () => {
    for (const l of lessons) expect(lessonMinutes(l)).toBeGreaterThan(0)
  })

  it('reports a positive total', () => {
    expect(totalMinutes()).toBeGreaterThan(0)
  })

  it('logs the running content total', () => {
    // eslint-disable-next-line no-console
    console.log(
      `\n📚 Content: ${contentStats.lessons} lessons · ${contentStats.words} words · ` +
        `${contentStats.minutes.toFixed(0)} min (${contentStats.hours.toFixed(2)} h)\n`,
    )
    expect(contentStats.hours).toBeGreaterThan(0)
  })

  it('provides at least 10 hours of learning content', () => {
    // Target locked in: the app must always ship >= 10 hours of material.
    expect(contentStats.minutes).toBeGreaterThanOrEqual(600)
  })
})
