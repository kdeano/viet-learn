import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findDeck } from '@/data/flashcards'
import FlashcardStudy from '@/components/FlashcardStudy'

// Deck pages are inherently per-request (params pick the deck) — allow blocking
// rather than forcing an artificial Suspense split around params.
export const instant = false

export default async function DeckStudyPage(props: PageProps<'/flashcards/[deckId]'>) {
	const { deckId } = await props.params
	const deck = findDeck(deckId)
	if (!deck) notFound()

	return (
		<div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
			<Link href="/flashcards" className="inline-block text-sm font-bold text-[#8d7168] hover:text-[#1b1c19] mb-4">
				← All decks
			</Link>

			<header className="mb-8 text-center">
				<h1 className="text-2xl font-black text-[#1b1c19] mb-1">
					{deck.emoji} {deck.title}
				</h1>
				<p className="text-[#8d7168] font-semibold text-sm">{deck.englishTitle}</p>
			</header>

			<FlashcardStudy deck={deck} />
		</div>
	)
}
