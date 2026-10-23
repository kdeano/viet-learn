'use client'
import { useState } from 'react'
import type { Deck } from '@/data/flashcards'
import FlashcardStudy from './FlashcardStudy'
import ListeningStudy from './ListeningStudy'

export default function DeckStudyShell({ deck }: { deck: Deck }) {
	const [mode, setMode] = useState<'flashcards' | 'listening'>('flashcards')

	return (
		<div>
			<div className="flex bg-[#eae8e2] border-2 border-[#1b1c19] rounded-xl p-1 mb-8 ink-shadow-sm max-w-xs mx-auto">
				{(['flashcards', 'listening'] as const).map(m => {
					const active = mode === m
					return (
						<button
							key={m}
							onClick={() => setMode(m)}
							className={`flex-1 py-2 text-sm font-black rounded-lg transition-all ${
								active
									? 'bg-white border-2 border-[#1b1c19] -translate-y-0.5 [box-shadow:2px_2px_0_#1b1c19]'
									: 'text-[#594139] hover:bg-[#f5f3ee]'
							}`}
						>
							{m === 'flashcards' ? 'Flashcards' : 'Listening'}
						</button>
					)
				})}
			</div>

			{mode === 'flashcards' ? <FlashcardStudy deck={deck} /> : <ListeningStudy deck={deck} />}
		</div>
	)
}
