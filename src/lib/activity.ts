// Daily streak + tone quiz accuracy, persisted alongside flashcard progress.

const STREAK_KEY = 'vietlearn:streak'
const TONE_STATS_KEY = 'vietlearn:toneStats'

export interface StreakData {
	current: number
	longest: number
	lastActiveDate: string // YYYY-MM-DD
}

export interface ToneStats {
	totalAnswered: number
	totalCorrect: number
}

function todayStr(): string {
	return new Date().toISOString().slice(0, 10)
}

function yesterdayStr(): string {
	return new Date(Date.now() - 86400000).toISOString().slice(0, 10)
}

export function loadStreak(): StreakData {
	if (typeof window === 'undefined') return { current: 0, longest: 0, lastActiveDate: '' }
	try {
		const raw = window.localStorage.getItem(STREAK_KEY)
		return raw ? (JSON.parse(raw) as StreakData) : { current: 0, longest: 0, lastActiveDate: '' }
	} catch {
		return { current: 0, longest: 0, lastActiveDate: '' }
	}
}

function saveStreak(data: StreakData) {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(STREAK_KEY, JSON.stringify(data))
	} catch {
		// localStorage unavailable — streak just won't persist
	}
}

// Call this whenever the user completes a study action (flashcard review,
// tone quiz answer, listening round). No-ops if already recorded today.
export function recordActivity(): StreakData {
	const today = todayStr()
	const data = loadStreak()
	if (data.lastActiveDate === today) return data

	const current = data.lastActiveDate === yesterdayStr() ? data.current + 1 : 1
	const updated: StreakData = {
		current,
		longest: Math.max(current, data.longest),
		lastActiveDate: today,
	}
	saveStreak(updated)
	return updated
}

export function loadToneStats(): ToneStats {
	if (typeof window === 'undefined') return { totalAnswered: 0, totalCorrect: 0 }
	try {
		const raw = window.localStorage.getItem(TONE_STATS_KEY)
		return raw ? (JSON.parse(raw) as ToneStats) : { totalAnswered: 0, totalCorrect: 0 }
	} catch {
		return { totalAnswered: 0, totalCorrect: 0 }
	}
}

export function recordToneAnswer(correct: boolean): ToneStats {
	const stats = loadToneStats()
	const updated: ToneStats = {
		totalAnswered: stats.totalAnswered + 1,
		totalCorrect: stats.totalCorrect + (correct ? 1 : 0),
	}
	if (typeof window !== 'undefined') {
		try {
			window.localStorage.setItem(TONE_STATS_KEY, JSON.stringify(updated))
		} catch {
			// localStorage unavailable — stats just won't persist
		}
	}
	return updated
}
