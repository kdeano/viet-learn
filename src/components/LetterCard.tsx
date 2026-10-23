import type { Letter } from '@/data/alphabet'
import SpeakerButton from './SpeakerButton'

const accentBg = {
	teal: 'bg-[#70f8e8]/25',
	yellow: 'bg-[#fdc656]/25',
	orange: 'bg-[#ff6b35]/15',
} as const

export default function LetterCard({ letter, accent }: { letter: Letter; accent: 'teal' | 'yellow' | 'orange' }) {
	return (
		<div className="bg-white border-2 border-[#1b1c19] rounded-2xl p-3 ink-shadow-sm flex flex-col gap-1.5">
			<div className="flex items-start justify-between gap-1">
				<span className={`text-2xl font-black text-[#1b1c19] rounded-lg px-2 py-0.5 ${accentBg[accent]}`}>
					{letter.letter}
				</span>
				<SpeakerButton text={letter.letter} className="shrink-0 -mt-1 -mr-1" />
			</div>

			<p className="text-[11px] text-[#594139] font-semibold leading-tight">{letter.sound}</p>

			<div className="mt-auto pt-1 border-t border-[#e1bfb5] flex items-end justify-between gap-1">
				<div>
					<p className="text-sm font-black text-[#1b1c19] leading-tight">{letter.example}</p>
					<p className="text-[11px] text-[#8d7168] font-semibold leading-tight">{letter.exampleMeaning}</p>
				</div>
				<SpeakerButton text={letter.example} className="shrink-0 -mb-1 -mr-1" />
			</div>
		</div>
	)
}
