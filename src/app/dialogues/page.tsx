import Link from 'next/link'
import { dialogues } from '@/data/dialogues'

export default function DialoguesPage() {
	return (
		<div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-black text-[#1b1c19] mb-1">Hội Thoại</h1>
				<p className="text-[#594139] font-semibold">Short dialogues to listen and read</p>
			</header>

			<div className="grid sm:grid-cols-2 gap-4">
				{dialogues.map(d => (
					<Link
						key={d.id}
						href={`/dialogues/${d.id}`}
						className="bg-white border-2 border-[#1b1c19] rounded-2xl p-4 ink-shadow flex items-center gap-4 hover:translate-x-px hover:translate-y-px hover:[box-shadow:1px_1px_0_#1b1c19] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:none] transition-all"
					>
						<span className="w-14 h-14 rounded-xl bg-[#f0eee8] flex items-center justify-center text-2xl shrink-0">
							{d.emoji}
						</span>
						<div className="flex-1 min-w-0">
							<h2 className="font-black text-[#1b1c19] leading-tight">{d.title}</h2>
							<p className="text-xs text-[#8d7168] font-semibold">
								{d.englishTitle} · {d.lines.length} lines
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
