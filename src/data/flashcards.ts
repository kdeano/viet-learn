// Northern (Hà Nội) Vietnamese vocabulary.
// See .claude/steering/VIETNAMESE.md for family-specific corrections before editing.

export interface FlashcardData {
	id: string
	vietnamese: string
	english: string
	notes?: string
}

export interface Deck {
	id: string
	title: string
	englishTitle: string
	emoji: string
	cards: FlashcardData[]
}

export const decks: Deck[] = [
	{
		id: 'greetings',
		title: 'Chào Hỏi',
		englishTitle: 'Greetings',
		emoji: '👋',
		cards: [
			{ id: 'greet-1', vietnamese: 'xin chào', english: 'hello' },
			{ id: 'greet-2', vietnamese: 'tạm biệt', english: 'goodbye' },
			{ id: 'greet-3', vietnamese: 'cảm ơn', english: 'thank you' },
			{ id: 'greet-4', vietnamese: 'xin lỗi', english: 'sorry / excuse me' },
			{ id: 'greet-5', vietnamese: 'làm ơn', english: 'please' },
			{ id: 'greet-6', vietnamese: 'không có gì', english: "you're welcome" },
			{ id: 'greet-7', vietnamese: 'hẹn gặp lại', english: 'see you later' },
			{ id: 'greet-8', vietnamese: 'chúc ngủ ngon', english: 'goodnight' },
		],
	},
	{
		id: 'family',
		title: 'Gia Đình',
		englishTitle: 'Family',
		emoji: '👨‍👩‍👧',
		cards: [
			{ id: 'fam-1', vietnamese: 'bố', english: 'dad', notes: 'Northern term; "ba" is more Southern' },
			{ id: 'fam-2', vietnamese: 'mẹ', english: 'mom' },
			{ id: 'fam-3', vietnamese: 'anh', english: 'older brother' },
			{ id: 'fam-4', vietnamese: 'chị', english: 'older sister' },
			{ id: 'fam-5', vietnamese: 'em', english: 'younger sibling' },
			{ id: 'fam-6', vietnamese: 'ông', english: 'grandfather' },
			{ id: 'fam-7', vietnamese: 'bà', english: 'grandmother' },
			{ id: 'fam-8', vietnamese: 'con', english: 'child' },
		],
	},
	{
		id: 'numbers',
		title: 'Số Đếm',
		englishTitle: 'Numbers',
		emoji: '🔢',
		cards: [
			{ id: 'num-1', vietnamese: 'một', english: 'one' },
			{ id: 'num-2', vietnamese: 'hai', english: 'two' },
			{ id: 'num-3', vietnamese: 'ba', english: 'three' },
			{ id: 'num-4', vietnamese: 'bốn', english: 'four' },
			{ id: 'num-5', vietnamese: 'năm', english: 'five' },
			{ id: 'num-6', vietnamese: 'sáu', english: 'six' },
			{ id: 'num-7', vietnamese: 'bảy', english: 'seven' },
			{ id: 'num-8', vietnamese: 'tám', english: 'eight' },
			{ id: 'num-9', vietnamese: 'chín', english: 'nine' },
			{ id: 'num-10', vietnamese: 'mười', english: 'ten' },
		],
	},
	{
		id: 'food',
		title: 'Đồ Ăn',
		englishTitle: 'Food & Drink',
		emoji: '🍜',
		cards: [
			{ id: 'food-1', vietnamese: 'cơm', english: 'rice (cooked)' },
			{ id: 'food-2', vietnamese: 'phở', english: 'pho (noodle soup)' },
			{ id: 'food-3', vietnamese: 'nước', english: 'water' },
			{ id: 'food-4', vietnamese: 'trà', english: 'tea' },
			{ id: 'food-5', vietnamese: 'cà phê', english: 'coffee' },
			{ id: 'food-6', vietnamese: 'bánh mì', english: 'bread / sandwich' },
			{ id: 'food-7', vietnamese: 'rau', english: 'vegetables' },
			{ id: 'food-8', vietnamese: 'thịt', english: 'meat' },
		],
	},
	{
		id: 'phrases',
		title: 'Câu Thông Dụng',
		englishTitle: 'Common Phrases',
		emoji: '💬',
		cards: [
			{ id: 'phr-1', vietnamese: 'tôi tên là...', english: 'my name is...' },
			{ id: 'phr-2', vietnamese: 'bạn khỏe không?', english: 'how are you?' },
			{ id: 'phr-3', vietnamese: 'tôi không hiểu', english: "I don't understand" },
			{ id: 'phr-4', vietnamese: 'bạn nói tiếng Anh không?', english: 'do you speak English?' },
			{ id: 'phr-5', vietnamese: 'bao nhiêu tiền?', english: 'how much is it?' },
			{ id: 'phr-6', vietnamese: 'đi đâu?', english: 'where are you going?' },
		],
	},
]

export function findDeck(id: string): Deck | undefined {
	return decks.find(d => d.id === id)
}

export function findCard(id: string): FlashcardData | undefined {
	for (const deck of decks) {
		const card = deck.cards.find(c => c.id === id)
		if (card) return card
	}
	return undefined
}
