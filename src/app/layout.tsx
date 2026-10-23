import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

const quicksand = Quicksand({
	subsets: ['latin', 'latin-ext'],
	variable: '--font-quicksand',
	weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Viet Learn',
	description: 'Learn Vietnamese — tones, alphabet, flashcards',
	manifest: '/manifest.json',
	appleWebApp: { capable: true, statusBarStyle: 'black-translucent' },
}

export const viewport: Viewport = {
	themeColor: '#ab3500',
	width: 'device-width',
	initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="vi" className={`${quicksand.variable} h-full`}>
			<body className="min-h-full flex flex-col font-sans antialiased bg-[#fbf9f3] text-[#1b1c19]">
				<Suspense fallback={<div className="hidden md:block fixed top-0 inset-x-0 z-50 h-16 border-b-2 border-[#1b1c19] bg-[#fbf9f3]" />}>
					<Nav />
				</Suspense>
				<main className="flex-1 md:pt-16 pb-24 md:pb-10">
					{children}
				</main>
				<Suspense fallback={<div className="md:hidden fixed bottom-0 inset-x-0 z-50 h-[72px] border-t-2 border-[#1b1c19] bg-[#fbf9f3]" />}>
					<BottomNav />
				</Suspense>
			</body>
		</html>
	)
}
