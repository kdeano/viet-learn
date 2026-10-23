import Link from 'next/link'
import DashboardStats from '@/components/DashboardStats'

const sections = [
	{ href: '/alphabet', emoji: '🔤', title: 'Alphabet', desc: 'All 29 letters and clusters, with Northern pronunciation and audio.', color: 'bg-[#70f8e8]/25' },
	{ href: '/tones', emoji: '🎵', title: 'Tones', desc: 'Learn the 6 tones, then test yourself.', color: 'bg-[#fdc656]/25' },
	{ href: '/flashcards', emoji: '🗂️', title: 'Flashcards', desc: 'Review vocabulary with spaced repetition.', color: 'bg-[#ff6b35]/15' },
	{ href: '/dialogues', emoji: '💬', title: 'Dialogues', desc: 'Short conversations to listen and read along.', color: 'bg-[#fdc656]/25' },
]

export default function Home() {
	return (
		<div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
			<header className="text-center mb-10">
				<h1 className="text-4xl font-black text-[#ab3500] mb-2">Viet Learn</h1>
				<p className="text-[#594139] font-semibold">Học Tiếng Việt — one tone at a time</p>
			</header>

			<DashboardStats />

			<div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
				{sections.map(s => (
					<Link
						key={s.href}
						href={s.href}
						className="bg-white border-2 border-[#1b1c19] rounded-2xl p-5 ink-shadow flex flex-col gap-2 hover:translate-x-px hover:translate-y-px hover:[box-shadow:1px_1px_0_#1b1c19] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:none] transition-all"
					>
						<span className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${s.color}`}>
							{s.emoji}
						</span>
						<h2 className="font-black text-[#1b1c19]">{s.title}</h2>
						<p className="text-sm text-[#594139] font-semibold">{s.desc}</p>
					</Link>
				))}
			</div>
		</div>
	)
}
