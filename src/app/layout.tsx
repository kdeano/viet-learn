import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

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
				{children}
			</body>
		</html>
	)
}
