'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/alphabet', label: 'Alphabet' },
	{ href: '/tones', label: 'Tones' },
	{ href: '/flashcards', label: 'Flashcards' },
	{ href: '/dialogues', label: 'Dialogues' },
]

export default function Nav() {
	const pathname = usePathname()

	return (
		<nav className="hidden md:flex fixed top-0 inset-x-0 z-50 bg-[#fbf9f3] border-b-2 border-[#1b1c19] h-16 items-center">
			<div className="max-w-5xl mx-auto px-4 w-full flex items-stretch h-full gap-6">
				<Link href="/" className="flex items-center gap-2 shrink-0 py-4">
					<span className="text-xl">🇻🇳</span>
					<span className="font-bold text-[#ab3500] tracking-tight">Viet Learn</span>
				</Link>

				<div className="flex items-stretch flex-1 gap-0.5">
					{links.map(link => {
						const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`flex items-center px-3 text-sm font-bold border-b-[3px] transition-colors ${
									active
										? 'text-[#ab3500] border-[#ab3500]'
										: 'text-[#594139] border-transparent hover:text-[#1b1c19] hover:border-[#e1bfb5]'
								}`}
							>
								{link.label}
							</Link>
						)
					})}
				</div>
			</div>
		</nav>
	)
}
