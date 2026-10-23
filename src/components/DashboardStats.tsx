'use client'
import { useEffect, useState } from 'react'
import { decks } from '@/data/flashcards'
import { isDue } from '@/lib/srs'
import { loadProgress } from '@/lib/storage'
import { loadStreak, loadToneStats, type StreakData, type ToneStats } from '@/lib/activity'

interface Stats {
	streak: StreakData
	dueToday: number
	reviewedToday: number
	tone: ToneStats
}

function computeStats(): Stats {
	const progress = loadProgress()
	const today = new Date().toISOString().slice(0, 10)

	let dueToday = 0
	let reviewedToday = 0
	for (const deck of decks) {
		for (const card of deck.cards) {
			const p = progress[card.id]
			if (isDue(p)) dueToday++
			if (p && p.lastReviewed.slice(0, 10) === today) reviewedToday++
		}
	}

	return { streak: loadStreak(), dueToday, reviewedToday, tone: loadToneStats() }
}

export default function DashboardStats() {
	const [stats, setStats] = useState<Stats | null>(null)

	useEffect(() => {
		setStats(computeStats())
	}, [])

	if (!stats) {
		return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" aria-hidden />
	}

	const toneAccuracy = stats.tone.totalAnswered > 0
		? Math.round((stats.tone.totalCorrect / stats.tone.totalAnswered) * 100)
		: null

	const tiles = [
		{ label: 'Day streak', value: `🔥 ${stats.streak.current}` },
		{ label: 'Due today', value: String(stats.dueToday) },
		{ label: 'Reviewed today', value: String(stats.reviewedToday) },
		{ label: 'Tone accuracy', value: toneAccuracy === null ? '—' : `${toneAccuracy}%` },
	]

	return (
		<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
			{tiles.map(t => (
				<div
					key={t.label}
					className="bg-white border-2 border-[#1b1c19] rounded-2xl p-3 ink-shadow-sm text-center"
				>
					<p className="text-xl font-black text-[#1b1c19] leading-tight">{t.value}</p>
					<p className="text-[11px] text-[#8d7168] font-bold uppercase tracking-wide">{t.label}</p>
				</div>
			))}
		</div>
	)
}
