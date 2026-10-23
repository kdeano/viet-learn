import type { CardProgress } from './srs'

const KEY = 'vietlearn:progress'

export type ProgressMap = Record<string, CardProgress>

export function loadProgress(): ProgressMap {
	if (typeof window === 'undefined') return {}
	try {
		const raw = window.localStorage.getItem(KEY)
		return raw ? (JSON.parse(raw) as ProgressMap) : {}
	} catch {
		return {}
	}
}

export function saveProgress(map: ProgressMap) {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(KEY, JSON.stringify(map))
	} catch {
		// localStorage unavailable (private mode, quota) — progress just won't persist
	}
}
