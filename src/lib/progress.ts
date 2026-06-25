/** Lightweight progress persistence via localStorage (no backend). */

const KEY = 'kapampangan.progress.v1'

export interface Progress {
  completedLessons: string[]
  xp: number
}

const empty: Progress = { completedLessons: [], xp: 0 }

export function loadProgress(): Progress {
  if (typeof localStorage === 'undefined') return { ...empty }
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...empty }
    const parsed = JSON.parse(raw) as Progress
    return { completedLessons: parsed.completedLessons ?? [], xp: parsed.xp ?? 0 }
  } catch {
    return { ...empty }
  }
}

export function saveProgress(p: Progress): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function completeLesson(lessonId: string, earnedXp: number): Progress {
  const p = loadProgress()
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId)
    p.xp += earnedXp
  }
  saveProgress(p)
  return p
}
