'use client'
import { useCallback, useState } from 'react'
import { tones } from '@/data/tones'

interface Round {
	toneId: string
	word: string
	meaning: string
}

function randomRound(excludeWord?: string): Round {
	const tone = tones[Math.floor(Math.random() * tones.length)]
	const words = tone.quizWords
	let pick = words[Math.floor(Math.random() * words.length)]
	let tries = 0
	while (pick.word === excludeWord && tries < 5) {
		pick = words[Math.floor(Math.random() * words.length)]
		tries++
	}
	return { toneId: tone.id, word: pick.word, meaning: pick.meaning }
}

export default function ToneQuiz() {
	const [round, setRound] = useState<Round>(() => randomRound())
	const [selected, setSelected] = useState<string | null>(null)
	const [score, setScore] = useState({ correct: 0, total: 0 })
	const [streak, setStreak] = useState(0)
	const [playing, setPlaying] = useState(false)

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

	function choose(toneId: string) {
		if (selected) return
		setSelected(toneId)
		const correct = toneId === round.toneId
		setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
		setStreak(s => (correct ? s + 1 : 0))
	}

	function next() {
		setRound(randomRound(round.word))
		setSelected(null)
	}

	const answered = selected !== null
	const isCorrect = selected === round.toneId
	const correctTone = tones.find(t => t.id === round.toneId)!

	return (
		<div className="max-w-md mx-auto">
			<div className="flex items-center justify-between mb-5 text-sm font-black text-[#594139]">
				<span>{score.correct}/{score.total} correct</span>
				{streak > 1 && <span className="text-[#ab3500]">🔥 {streak} streak</span>}
			</div>

			<div className="flex flex-col items-center gap-3 mb-6">
				<button
					onClick={() => play(round.word)}
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
				{tones.map(t => {
					const isThis = selected === t.id
					const showCorrect = answered && t.id === round.toneId
					const showWrong = answered && isThis && !isCorrect

					let look = 'bg-white border-[#1b1c19] text-[#1b1c19] ink-shadow-sm hover:translate-x-px hover:translate-y-px'
					if (showCorrect) look = 'bg-[#70f8e8] border-[#006a62] text-[#003834] ink-shadow-sm'
					if (showWrong) look = 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a] ink-shadow-sm animate-shake'

					return (
						<button
							key={t.id}
							onClick={() => choose(t.id)}
							disabled={answered}
							className={`border-2 rounded-xl py-3 px-2 font-black text-sm transition-all disabled:cursor-default ${look}`}
						>
							<div className="text-xl mb-0.5 leading-none">{t.mark}</div>
							<div>{t.name}</div>
						</button>
					)
				})}
			</div>

			{answered && (
				<div className="text-center animate-pop-in">
					<p className={`font-black mb-1 ${isCorrect ? 'text-[#006a62]' : 'text-[#ba1a1a]'}`}>
						{isCorrect ? 'Correct!' : `It was ${correctTone.name}`}
					</p>
					<p className="text-xs text-[#8d7168] font-semibold mb-3">
						{round.word} — {round.meaning}
					</p>
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
