'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import type { Deck, FlashcardData } from '@/data/flashcards'
import { initialProgress, isDue, review } from '@/lib/srs'
import { loadProgress, saveProgress, type ProgressMap } from '@/lib/storage'
import { recordActivity } from '@/lib/activity'

interface Round {
	card: FlashcardData
	options: FlashcardData[] // 4 options, one of which is `card`
}

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr]
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

function buildRound(deck: Deck, card: FlashcardData): Round {
	const others = deck.cards.filter(c => c.id !== card.id)
	const distractors = shuffle(others).slice(0, 3)
	return { card, options: shuffle([card, ...distractors]) }
}

export default function ListeningStudy({ deck }: { deck: Deck }) {
	const [progress, setProgress] = useState<ProgressMap | null>(null)
	const [queue, setQueue] = useState<FlashcardData[]>([])
	const [index, setIndex] = useState(0)
	const [round, setRound] = useState<Round | null>(null)
	const [selected, setSelected] = useState<string | null>(null)
	const [reviewedCount, setReviewedCount] = useState(0)
	const [studyingAll, setStudyingAll] = useState(false)
	const [playing, setPlaying] = useState(false)

	useEffect(() => {
		const p = loadProgress()
		setProgress(p)
		const due = deck.cards.filter(c => isDue(p[c.id]))
		setQueue(due)
		if (due.length > 0) setRound(buildRound(deck, due[0]))
	}, [deck])

	const play = useCallback(async (text: string) => {
		setPlaying(true)
		try {
			const res = await fetch('/api/tts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text }),
			})
			if (!res.ok) return
			const blob = await res.blob()
			const url = URL.createObjectURL(blob)
			const audio = new Audio(url)
			audio.onended = () => URL.revokeObjectURL(url)
			await audio.play()
		} finally {
			setPlaying(false)
		}
	}, [])

	function startAll() {
		const all = [...deck.cards]
		setQueue(all)
		setIndex(0)
		setRound(buildRound(deck, all[0]))
		setSelected(null)
		setReviewedCount(0)
		setStudyingAll(true)
	}

	function choose(cardId: string) {
		if (!progress || !round || selected) return
		setSelected(cardId)

		const correct = cardId === round.card.id
		const current = progress[round.card.id] ?? initialProgress()
		const updated = review(current, correct ? 'good' : 'again')
		const next = { ...progress, [round.card.id]: updated }
		setProgress(next)
		saveProgress(next)
		recordActivity()
		setReviewedCount(c => c + 1)
	}

	function next() {
		const nextIndex = index + 1
		setIndex(nextIndex)
		setSelected(null)
		if (nextIndex < queue.length) {
			setRound(buildRound(deck, queue[nextIndex]))
		}
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

	if (!round) return null

	const answered = selected !== null
	const isCorrect = selected === round.card.id

	return (
		<div className="max-w-md mx-auto">
			<div className="flex items-center justify-between mb-5 text-sm font-black text-[#594139]">
				<span>{index + 1} / {queue.length}</span>
				{studyingAll && <span className="text-[#8d7168]">Reviewing all</span>}
			</div>

			<div className="flex flex-col items-center gap-3 mb-6">
				<button
					onClick={() => play(round.card.vietnamese)}
					disabled={playing}
					aria-label="Play word"
					className="w-20 h-20 rounded-full bg-[#006a62] border-2 border-[#1b1c19] ink-shadow flex items-center justify-center text-white hover:translate-x-px hover:translate-y-px active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:none] transition-all disabled:opacity-60"
				>
					<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
						<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
					</svg>
				</button>
				<p className="text-xs text-[#8d7168] font-bold">Tap to hear the word</p>
			</div>

			<div className="grid grid-cols-2 gap-2.5 mb-4">
				{round.options.map(opt => {
					const isThis = selected === opt.id
					const showCorrect = answered && opt.id === round.card.id
					const showWrong = answered && isThis && !isCorrect

					let look = 'bg-white border-[#1b1c19] text-[#1b1c19] ink-shadow-sm hover:translate-x-px hover:translate-y-px'
					if (showCorrect) look = 'bg-[#70f8e8] border-[#006a62] text-[#003834] ink-shadow-sm'
					if (showWrong) look = 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a] ink-shadow-sm animate-shake'

					return (
						<button
							key={opt.id}
							onClick={() => choose(opt.id)}
							disabled={answered}
							className={`border-2 rounded-xl py-3 px-2 font-black text-sm transition-all disabled:cursor-default ${look}`}
						>
							{opt.vietnamese}
						</button>
					)
				})}
			</div>

			{answered && (
				<div className="text-center animate-pop-in">
					<p className={`font-black mb-1 ${isCorrect ? 'text-[#006a62]' : 'text-[#ba1a1a]'}`}>
						{isCorrect ? 'Correct!' : `It was "${round.card.vietnamese}"`}
					</p>
					<p className="text-xs text-[#8d7168] font-semibold mb-3">{round.card.english}</p>
					<button
						onClick={next}
						className="bg-[#ab3500] text-white font-black px-6 py-2.5 rounded-xl border-2 border-[#1b1c19] btn-push-orange active:translate-y-[2px] active:[box-shadow:none] transition-all"
					>
						Next →
					</button>
				</div>
			)}
		</div>
	)
}
