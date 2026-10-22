// Northern (Hà Nội) Vietnamese tones.
// See .claude/steering/VIETNAMESE.md for family-specific corrections before editing.

export interface ToneInfo {
	id: string
	name: string         // Vietnamese name
	englishName: string
	mark: string          // the classic "ma" example spelled with this tone
	description: string
	example: string
	exampleMeaning: string
	// Pitch contour as one or more path segments (a gap = glottal break), each
	// point is [x 0-100, pitch 0-10 where 10 = highest].
	contour: [number, number][][]
	quizWords: { word: string; meaning: string }[]
}

export const tones: ToneInfo[] = [
	{
		id: 'ngang',
		name: 'Ngang',
		englishName: 'Level',
		mark: 'a',
		description: 'Flat and calm — hold your natural speaking pitch steady, with no rise or fall.',
		example: 'ma',
		exampleMeaning: 'ghost',
		contour: [[[0, 5], [100, 5]]],
		quizWords: [
			{ word: 'ba', meaning: 'dad / three' },
			{ word: 'xe', meaning: 'vehicle' },
			{ word: 'cô', meaning: 'aunt / Miss' },
			{ word: 'con', meaning: 'child' },
			{ word: 'khi', meaning: 'when' },
		],
	},
	{
		id: 'huyen',
		name: 'Huyền',
		englishName: 'Falling',
		mark: 'à',
		description: 'Starts around mid pitch and glides down low, like a sigh.',
		example: 'mà',
		exampleMeaning: 'but',
		contour: [[[0, 6], [100, 2]]],
		quizWords: [
			{ word: 'bà', meaning: 'grandma' },
			{ word: 'nhà', meaning: 'house' },
			{ word: 'người', meaning: 'person' },
			{ word: 'chào', meaning: 'hello' },
			{ word: 'là', meaning: 'to be' },
		],
	},
	{
		id: 'sac',
		name: 'Sắc',
		englishName: 'Rising',
		mark: 'á',
		description: 'Starts mid and rises sharply upward, like asking "what?!" in English.',
		example: 'má',
		exampleMeaning: 'mom / cheek',
		contour: [[[0, 4], [50, 5], [100, 9]]],
		quizWords: [
			{ word: 'cá', meaning: 'fish' },
			{ word: 'đá', meaning: 'stone / ice' },
			{ word: 'vé', meaning: 'ticket' },
			{ word: 'ghế', meaning: 'chair' },
			{ word: 'phố', meaning: 'street' },
		],
	},
	{
		id: 'hoi',
		name: 'Hỏi',
		englishName: 'Dipping',
		mark: 'ả',
		description: 'Starts mid, dips down low, then curls back up — like a questioning "hmm?"',
		example: 'mả',
		exampleMeaning: 'grave, tomb',
		contour: [[[0, 6], [40, 2], [100, 5]]],
		quizWords: [
			{ word: 'hỏi', meaning: 'to ask' },
			{ word: 'cổ', meaning: 'neck / ancient' },
			{ word: 'chỉ', meaning: 'only' },
			{ word: 'nghỉ', meaning: 'to rest' },
			{ word: 'kẻ', meaning: 'person / line' },
		],
	},
	{
		id: 'nga',
		name: 'Ngã',
		englishName: 'Broken-rising',
		mark: 'ã',
		description: 'Starts mid, breaks with a short glottal catch, then rises sharply high.',
		example: 'mã',
		exampleMeaning: 'horse (code word)',
		contour: [[[0, 5], [35, 4]], [[45, 5], [100, 9]]],
		quizWords: [
			{ word: 'cũng', meaning: 'also' },
			{ word: 'đã', meaning: 'already' },
			{ word: 'sữa', meaning: 'milk' },
			{ word: 'ngã', meaning: 'to fall' },
			{ word: 'mỡ', meaning: 'fat, grease' },
		],
	},
	{
		id: 'nang',
		name: 'Nặng',
		englishName: 'Heavy',
		mark: 'ạ',
		description: 'Low and short, cut off abruptly — like a clipped grunt.',
		example: 'mạ',
		exampleMeaning: 'rice seedling',
		contour: [[[0, 4], [60, 0]]],
		quizWords: [
			{ word: 'đẹp', meaning: 'beautiful' },
			{ word: 'lạnh', meaning: 'cold' },
			{ word: 'bạn', meaning: 'friend' },
			{ word: 'nặng', meaning: 'heavy' },
			{ word: 'học', meaning: 'to study' },
		],
	},
]
