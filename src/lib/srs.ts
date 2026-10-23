// SM-2 spaced repetition, simplified to 4 Anki-style ratings.

export interface CardProgress {
	easeFactor: number
	interval: number       // days
	repetitions: number
	dueDate: string         // ISO
	lastReviewed: string    // ISO
}

export type Rating = 'again' | 'hard' | 'good' | 'easy'

const QUALITY: Record<Rating, number> = { again: 0, hard: 3, good: 4, easy: 5 }

export function initialProgress(): CardProgress {
	const now = new Date().toISOString()
	return { easeFactor: 2.5, interval: 0, repetitions: 0, dueDate: now, lastReviewed: now }
}

export function review(progress: CardProgress, rating: Rating): CardProgress {
	const quality = QUALITY[rating]
	let { easeFactor, interval, repetitions } = progress

	if (quality < 3) {
		repetitions = 0
		interval = 1
	} else {
		if (repetitions === 0) interval = 1
		else if (repetitions === 1) interval = 6
		else interval = Math.round(interval * easeFactor)
		repetitions += 1
	}

	easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

	const due = new Date()
	due.setDate(due.getDate() + interval)

	return {
		easeFactor,
		interval,
		repetitions,
		dueDate: due.toISOString(),
		lastReviewed: new Date().toISOString(),
	}
}

export function isDue(progress: CardProgress | undefined): boolean {
	if (!progress) return true
	return new Date(progress.dueDate).getTime() <= Date.now()
}
