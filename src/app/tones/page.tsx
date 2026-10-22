'use client'
import { useState } from 'react'
import { tones } from '@/data/tones'
import ToneCard from '@/components/ToneCard'
import ToneQuiz from '@/components/ToneQuiz'

export default function TonesPage() {
	const [tab, setTab] = useState<'learn' | 'quiz'>('learn')

	return (
		<div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
			<header className="mb-6 text-center">
				<h1 className="text-3xl font-black text-[#1b1c19] mb-1">Thanh Điệu</h1>
				<p className="text-[#594139] font-semibold">The 6 Vietnamese Tones</p>
			</header>

			<div className="flex bg-[#eae8e2] border-2 border-[#1b1c19] rounded-xl p-1 mb-8 ink-shadow-sm max-w-xs mx-auto">
				{(['learn', 'quiz'] as const).map(t => {
					const active = tab === t
					return (
						<button
							key={t}
							onClick={() => setTab(t)}
							className={`flex-1 py-2 text-sm font-black rounded-lg transition-all capitalize ${
								active
									? 'bg-white border-2 border-[#1b1c19] -translate-y-0.5 [box-shadow:2px_2px_0_#1b1c19]'
									: 'text-[#594139] hover:bg-[#f5f3ee]'
							}`}
						>
							{t}
						</button>
					)
				})}
			</div>

			{tab === 'learn' ? (
				<div className="grid sm:grid-cols-2 gap-4">
					{tones.map(t => (
						<ToneCard key={t.id} tone={t} />
					))}
				</div>
			) : (
				<ToneQuiz />
			)}
		</div>
	)
}
