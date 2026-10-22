'use client'
import { useState } from 'react'

export default function SpeakerButton({ text, label, className = '' }: { text: string; label?: string; className?: string }) {
	const [loading, setLoading] = useState(false)

	async function play() {
		if (loading) return
		setLoading(true)
		try {
			const res = await fetch('/api/tts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text }),
			})
			if (!res.ok) return
			const blob = await res.blob()
			const url = URL.createObjectURL(blob)
			const audio = new Audio(url)
			audio.onended = () => URL.revokeObjectURL(url)
			audio.play()
		} finally {
			setLoading(false)
		}
	}

	if (label) {
		return (
			<button
				onClick={play}
				disabled={loading}
				aria-label={`Read aloud: ${text.slice(0, 40)}`}
				className={`inline-flex items-center gap-1.5 text-xs text-[#8d7168] hover:text-[#1b1c19] transition-colors disabled:opacity-40 ${className}`}
			>
				{loading ? (
					<svg className="animate-spin w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
					</svg>
				) : (
					<svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
						<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
					</svg>
				)}
				{label}
			</button>
		)
	}

	return (
		<button
			onClick={play}
			disabled={loading}
			aria-label={`Play pronunciation of: ${text}`}
			className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-[#8d7168] hover:text-[#1b1c19] hover:bg-[#eae8e2] transition-colors disabled:opacity-40 ${className}`}
		>
			{loading ? (
				<svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
				</svg>
			) : (
				<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
				</svg>
			)}
		</button>
	)
}
