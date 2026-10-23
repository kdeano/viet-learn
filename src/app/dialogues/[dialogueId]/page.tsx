import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findDialogue } from '@/data/dialogues'
import DialogueView from '@/components/DialogueView'

// Same per-request rationale as the flashcard deck route.
export const instant = false

export default async function DialoguePage(props: PageProps<'/dialogues/[dialogueId]'>) {
	const { dialogueId } = await props.params
	const dialogue = findDialogue(dialogueId)
	if (!dialogue) notFound()

	return (
		<div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
			<Link href="/dialogues" className="inline-block text-sm font-bold text-[#8d7168] hover:text-[#1b1c19] mb-4">
				← All dialogues
			</Link>

			<header className="mb-8 text-center">
				<h1 className="text-2xl font-black text-[#1b1c19] mb-1">
					{dialogue.emoji} {dialogue.title}
				</h1>
				<p className="text-[#8d7168] font-semibold text-sm">{dialogue.englishTitle}</p>
			</header>

			<DialogueView dialogue={dialogue} />
		</div>
	)
}
