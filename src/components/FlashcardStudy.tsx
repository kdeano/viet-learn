'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Deck, FlashcardData } from '@/data/flashcards'
import type { Rating } from '@/lib/srs'
import { initialProgress, isDue, review } from '@/lib/srs'
import { loadProgress, saveProgress, type ProgressMap } from '@/lib/storage'
import SpeakerButton from './SpeakerButton'

export default function FlashcardStudy({ deck }: { deck: Deck }) {
	const [progress, setProgress] = useState<ProgressMap | null>(null)
	const [queue, setQueue] = useState<FlashcardData[]>([])
	const [index, setIndex] = useState(0)
	const [flipped, setFlipped] = useState(false)
	const [reviewedCount, setReviewedCount] = useState(0)
	const [studyingAll, setStudyingAll] = useState(false)

	useEffect(() => {
		const p = loadProgress()
		setProgress(p)
		setQueue(deck.cards.filter(c => isDue(p[c.id])))
	}, [deck])

	function startAll() {
		setQueue([...deck.cards])
		setIndex(0)
		setFlipped(false)
		setReviewedCount(0)
		setStudyingAll(true)
	}

	function rate(rating: Rating) {
		if (!progress) return
		const card = queue[index]
		const current = progress[card.id] ?? initialProgress()
		const updated = review(current, rating)
		const next = { ...progress, [card.id]: updated }
		setProgress(next)
		saveProgress(next)
		setReviewedCount(c => c + 1)
		setIndex(i => i + 1)
		setFlipped(false)
	}

	if (progress === null) {
		return <div className="text-center py-16 text-[#8d7168] font-semibold">Loading…</div>
	}

	if (queue.length === 0) {
		return (
			<div className="text-center py-16">
				<div className="text-4xl mb-3">🎉</div>
				<p className="font-black text-[#1b1c19] mb-1">All caught up!</p>
				<p className="text-sm text-[#8d7168] font-semibold mb-5">No cards due in this deck right now.</p>
				<button
					onClick={startAll}
					className="bg-[#ab3500] text-white font-black px-6 py-2.5 rounded-xl border-2 border-[#1b1c19] btn-push-orange active:translate-y-[2px] active:[box-shadow:none] transition-all"
				>
					Study anyway
				</button>
			</div>
		)
	}

	const done = index >= queue.length

	if (done) {
		return (
			<div className="text-center py-16">
				<div className="text-4xl mb-3">✅</div>
				<p className="font-black text-[#1b1c19] mb-1">Session complete</p>
				<p className="text-sm text-[#8d7168] font-semibold mb-5">
					You reviewed {reviewedCount} card{reviewedCount === 1 ? '' : 's'}.
				</p>
				<Link
					href="/flashcards"
					className="inline-block bg-[#ab3500] text-white font-black px-6 py-2.5 rounded-xl border-2 border-[#1b1c19] btn-push-orange active:translate-y-[2px] active:[box-shadow:none] transition-all"
				>
					Back to decks
				</Link>
			</div>
		)
	}

	const card = queue[index]

	return (
		<div className="max-w-md mx-auto">
			<div className="flex items-center justify-between mb-5 text-sm font-black text-[#594139]">
				<span>{index + 1} / {queue.length}</span>
				{studyingAll && <span className="text-[#8d7168]">Reviewing all</span>}
			</div>

			<div className="perspective mb-6">
				<div
					onClick={() => setFlipped(f => !f)}
					className={`flip-card relative h-56 cursor-pointer ${flipped ? 'flipped' : ''}`}
				>
					<div className="flip-card-front absolute inset-0 bg-white border-2 border-[#1b1c19] rounded-2xl ink-shadow flex flex-col items-center justify-center gap-3 p-6">
						<p className="text-3xl font-black text-[#1b1c19] text-center">{card.vietnamese}</p>
						<SpeakerButton text={card.vietnamese} />
						<p className="absolute bottom-3 text-[11px] text-[#8d7168] font-bold">Tap to flip</p>
					</div>
					<div className="flip-card-back absolute inset-0 bg-[#f0eee8] border-2 border-[#1b1c19] rounded-2xl ink-shadow flex flex-col items-center justify-center gap-2 p-6">
						<p className="text-2xl font-black text-[#1b1c19] text-center">{card.english}</p>
						{card.notes && <p className="text-xs text-[#8d7168] font-semibold text-center">{card.notes}</p>}
					</div>
				</div>
			</div>

			{flipped ? (
				<div className="grid grid-cols-4 gap-2">
					<RateButton label="Again" color="#ba1a1a" onClick={() => rate('again')} />
					<RateButton label="Hard" color="#ab3500" onClick={() => rate('hard')} />
					<RateButton label="Good" color="#006a62" onClick={() => rate('good')} />
					<RateButton label="Easy" color="#00ac9f" onClick={() => rate('easy')} />
				</div>
			) : (
				<p className="text-center text-xs text-[#8d7168] font-bold">Flip the card, then rate how well you knew it</p>
			)}
		</div>
	)
}

function RateButton({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className="text-white text-xs font-black py-2.5 rounded-xl border-2 border-[#1b1c19] active:translate-y-[2px] active:[box-shadow:none] transition-all"
			style={{ backgroundColor: color, boxShadow: '0 3px 0 #1b1c19' }}
		>
			{label}
		</button>
	)
}
