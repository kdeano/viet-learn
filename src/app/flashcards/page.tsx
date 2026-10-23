'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { decks } from '@/data/flashcards'
import { loadProgress } from '@/lib/storage'
import { isDue } from '@/lib/srs'

export default function FlashcardsPage() {
	const [dueCounts, setDueCounts] = useState<Record<string, number>>({})
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const progress = loadProgress()
		const counts: Record<string, number> = {}
		for (const deck of decks) {
			counts[deck.id] = deck.cards.filter(c => isDue(progress[c.id])).length
		}
		setDueCounts(counts)
		setMounted(true)
	}, [])

	return (
		<div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-black text-[#1b1c19] mb-1">Flashcards</h1>
				<p className="text-[#594139] font-semibold">Pick a deck to review</p>
			</header>

			<div className="grid sm:grid-cols-2 gap-4">
				{decks.map(deck => {
					const due = mounted ? (dueCounts[deck.id] ?? 0) : deck.cards.length
					return (
						<Link
							key={deck.id}
							href={`/flashcards/${deck.id}`}
							className="bg-white border-2 border-[#1b1c19] rounded-2xl p-4 ink-shadow flex items-center gap-4 hover:translate-x-px hover:translate-y-px hover:[box-shadow:1px_1px_0_#1b1c19] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:none] transition-all"
						>
							<span className="w-14 h-14 rounded-xl bg-[#f0eee8] flex items-center justify-center text-2xl shrink-0">
								{deck.emoji}
							</span>
							<div className="flex-1 min-w-0">
								<h2 className="font-black text-[#1b1c19] leading-tight">{deck.title}</h2>
								<p className="text-xs text-[#8d7168] font-semibold">
									{deck.englishTitle} · {deck.cards.length} cards
								</p>
							</div>
							{due > 0 && (
								<span className="shrink-0 text-xs font-black px-2.5 py-1 rounded-full bg-[#ab3500] text-white border-2 border-[#1b1c19]">
									{due} due
								</span>
							)}
						</Link>
					)
				})}
			</div>
		</div>
	)
}
