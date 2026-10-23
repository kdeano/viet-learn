'use client'
import { useState } from 'react'
import type { Dialogue } from '@/data/dialogues'
import SpeakerButton from './SpeakerButton'

async function fetchAudio(text: string): Promise<string | null> {
	const res = await fetch('/api/tts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text }),
	})
	if (!res.ok) return null
	const blob = await res.blob()
	return URL.createObjectURL(blob)
}

function playAudio(url: string): Promise<void> {
	return new Promise(resolve => {
		const audio = new Audio(url)
		audio.onended = () => {
			URL.revokeObjectURL(url)
			resolve()
		}
		audio.play()
	})
}

export default function DialogueView({ dialogue }: { dialogue: Dialogue }) {
	const [playingAll, setPlayingAll] = useState(false)

	async function playAll() {
		if (playingAll) return
		setPlayingAll(true)
		try {
			for (const line of dialogue.lines) {
				const url = await fetchAudio(line.vietnamese)
				if (url) await playAudio(url)
			}
		} finally {
			setPlayingAll(false)
		}
	}

	return (
		<div className="max-w-md mx-auto">
			<button
				onClick={playAll}
				disabled={playingAll}
				className="w-full mb-6 bg-[#006a62] text-white font-black py-2.5 rounded-xl border-2 border-[#1b1c19] btn-push-teal active:translate-y-[2px] active:[box-shadow:none] transition-all disabled:opacity-60"
			>
				{playingAll ? 'Playing…' : '▶ Play All'}
			</button>

			<div className="flex flex-col gap-3">
				{dialogue.lines.map((line, i) => {
					const isA = line.speaker === 'A'
					return (
						<div key={i} className={`flex ${isA ? 'justify-start' : 'justify-end'}`}>
							<div
								className={`max-w-[80%] bg-white border-2 border-[#1b1c19] rounded-2xl p-3 ink-shadow-sm ${
									isA ? 'rounded-tl-sm' : 'rounded-tr-sm'
								}`}
							>
								<div className="flex items-start justify-between gap-2">
									<p className="font-black text-[#1b1c19] leading-tight">{line.vietnamese}</p>
									<SpeakerButton text={line.vietnamese} className="shrink-0 -mt-1 -mr-1" />
								</div>
								<p className="text-xs text-[#8d7168] font-semibold mt-1">{line.english}</p>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
