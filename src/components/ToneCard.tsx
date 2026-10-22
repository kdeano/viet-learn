import type { ToneInfo } from '@/data/tones'
import ToneContour from './ToneContour'
import SpeakerButton from './SpeakerButton'

export default function ToneCard({ tone }: { tone: ToneInfo }) {
	return (
		<div className="bg-white border-2 border-[#1b1c19] rounded-2xl p-4 ink-shadow flex flex-col gap-2">
			<div className="flex items-start justify-between">
				<div>
					<h3 className="font-black text-lg text-[#1b1c19] leading-tight">{tone.name}</h3>
					<p className="text-xs font-bold text-[#8d7168] uppercase tracking-wide">{tone.englishName}</p>
				</div>
				<span className="text-3xl font-black text-[#ab3500] leading-none">{tone.mark}</span>
			</div>

			<ToneContour contour={tone.contour} />

			<p className="text-sm text-[#594139] font-semibold leading-snug">{tone.description}</p>

			<div className="flex items-center justify-between mt-1 pt-2 border-t border-[#e1bfb5]">
				<div>
					<p className="font-black text-[#1b1c19]">{tone.example}</p>
					<p className="text-xs text-[#8d7168] font-semibold">{tone.exampleMeaning}</p>
				</div>
				<SpeakerButton text={tone.example} />
			</div>
		</div>
	)
}
