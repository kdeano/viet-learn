'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
	{
		href: '/',
		label: 'Home',
		icon: (active: boolean) => (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.2 : 1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
			</svg>
		),
	},
	{
		href: '/alphabet',
		label: 'Alphabet',
		icon: (active: boolean) => (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.2 : 1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
			</svg>
		),
	},
	{
		href: '/tones',
		label: 'Tones',
		icon: (active: boolean) => (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.2 : 1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
			</svg>
		),
	},
	{
		href: '/flashcards',
		label: 'Cards',
		icon: (active: boolean) => (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2.2 : 1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
			</svg>
		),
	},
]

export default function BottomNav() {
	const pathname = usePathname()

	return (
		<nav
			className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#fbf9f3] border-t-2 border-[#1b1c19]"
			style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
		>
			<div className="flex items-stretch">
				{tabs.map(tab => {
					const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
					return (
						<Link
							key={tab.href}
							href={tab.href}
							className={`flex flex-col items-center justify-center flex-1 py-2 gap-0.5 text-xs font-bold transition-colors ${
								active ? 'text-[#ab3500]' : 'text-[#8d7168] active:text-[#594139]'
							}`}
						>
							{tab.icon(active)}
							<span>{tab.label}</span>
						</Link>
					)
				})}
			</div>
		</nav>
	)
}
