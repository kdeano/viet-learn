import { alphabetGroups } from '@/data/alphabet'
import LetterCard from '@/components/LetterCard'

const accentStyles = {
	teal:   { badge: 'bg-[#006a62] text-white' },
	yellow: { badge: 'bg-[#7b5800] text-white' },
	orange: { badge: 'bg-[#ab3500] text-white' },
} as const

export default function AlphabetPage() {
	return (
		<div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-black text-[#1b1c19] mb-1">Bảng Chữ Cái</h1>
				<p className="text-[#594139] font-semibold">The Vietnamese Alphabet</p>
			</header>

			<div className="space-y-10">
				{alphabetGroups.map(group => (
					<section key={group.id}>
						<div className="flex items-center gap-2 mb-4">
							<span className={`text-xs font-black px-3 py-1.5 rounded-full border-2 border-[#1b1c19] ink-shadow-sm ${accentStyles[group.accent].badge}`}>
								{group.title}
							</span>
							<span className="text-xs font-black text-[#594139] uppercase tracking-wide">{group.subtitle}</span>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							{group.letters.map(l => (
								<LetterCard key={l.letter} letter={l} accent={group.accent} />
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	)
}
