import { dictionary } from '../data/dictionary'
import { lessons } from '../data/lessons'
import type { Lesson } from '../data/types'

/**
 * A simple, honest content-time model so we can track progress toward a
 * target amount of learning material.
 *  - Each exercise is ~40 seconds of work.
 *  - Each lesson adds ~1.5 min of intro + word-preview study.
 */
const SECONDS_PER_EXERCISE = 40
const MINUTES_INTRO = 1.5

export function lessonMinutes(lesson: Lesson): number {
  return MINUTES_INTRO + lesson.exercises.length * (SECONDS_PER_EXERCISE / 60)
}

export function totalMinutes(): number {
  return lessons.reduce((sum, l) => sum + lessonMinutes(l), 0)
}

export const contentStats = {
  get lessons() {
    return lessons.length
  },
  get words() {
    return dictionary.length
  },
  get minutes() {
    return totalMinutes()
  },
  get hours() {
    return totalMinutes() / 60
  },
}
