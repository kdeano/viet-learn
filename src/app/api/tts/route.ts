export async function POST(request: Request) {
	const apiKey = process.env.GOOGLE_TTS_API_KEY
	if (!apiKey) return new Response('TTS not configured', { status: 500 })

	const { text } = await request.json() as { text: string }
	if (!text || typeof text !== 'string' || text.length > 500) {
		return new Response('Invalid text', { status: 400 })
	}

	const res = await fetch(
		`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: { text },
				voice: { languageCode: 'vi-VN', name: 'vi-VN-Neural2-D' },
				audioConfig: { audioEncoding: 'MP3' },
			}),
		}
	)

	if (!res.ok) return new Response('TTS request failed', { status: 502 })

	const { audioContent } = await res.json() as { audioContent: string }
	const audio = Buffer.from(audioContent, 'base64')

	return new Response(audio, {
		headers: {
			'Content-Type': 'audio/mpeg',
			'Cache-Control': 'public, max-age=604800',
		},
	})
}
