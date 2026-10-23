// Northern (Hà Nội) Vietnamese dialogues.
// See .claude/steering/VIETNAMESE.md for family-specific corrections before editing.

export interface DialogueLine {
	speaker: 'A' | 'B'
	vietnamese: string
	english: string
}

export interface Dialogue {
	id: string
	title: string
	englishTitle: string
	emoji: string
	lines: DialogueLine[]
}

export const dialogues: Dialogue[] = [
	{
		id: 'greeting-friend',
		title: 'Chào Bạn Bè',
		englishTitle: 'Greeting a Friend',
		emoji: '👋',
		lines: [
			{ speaker: 'A', vietnamese: 'Chào bạn! Bạn khỏe không?', english: 'Hi! How are you?' },
			{ speaker: 'B', vietnamese: 'Mình khỏe, cảm ơn. Còn bạn?', english: "I'm good, thanks. And you?" },
			{ speaker: 'A', vietnamese: 'Mình cũng khỏe. Lâu rồi không gặp!', english: "I'm good too. Long time no see!" },
			{ speaker: 'B', vietnamese: 'Đúng rồi! Hẹn gặp lại nhé.', english: "That's right! See you later." },
		],
	},
	{
		id: 'ordering-food',
		title: 'Gọi Món Ăn',
		englishTitle: 'Ordering Food',
		emoji: '🍜',
		lines: [
			{ speaker: 'A', vietnamese: 'Em ơi, cho anh một bát phở.', english: "Excuse me, I'd like a bowl of pho." },
			{ speaker: 'B', vietnamese: 'Dạ, anh muốn phở bò hay phở gà?', english: 'Sure, beef or chicken pho?' },
			{ speaker: 'A', vietnamese: 'Cho anh phở bò nhé.', english: 'Beef pho, please.' },
			{ speaker: 'B', vietnamese: 'Vâng, anh chờ một chút.', english: 'Okay, please wait a moment.' },
		],
	},
	{
		id: 'asking-directions',
		title: 'Hỏi Đường',
		englishTitle: 'Asking for Directions',
		emoji: '🗺️',
		lines: [
			{ speaker: 'A', vietnamese: 'Xin lỗi, nhà vệ sinh ở đâu?', english: 'Excuse me, where is the bathroom?' },
			{ speaker: 'B', vietnamese: 'Ở đằng kia, bên trái.', english: "It's over there, on the left." },
			{ speaker: 'A', vietnamese: 'Cảm ơn bạn nhiều.', english: 'Thank you very much.' },
			{ speaker: 'B', vietnamese: 'Không có gì.', english: "You're welcome." },
		],
	},
	{
		id: 'introducing-yourself',
		title: 'Giới Thiệu Bản Thân',
		englishTitle: 'Introducing Yourself',
		emoji: '🙋',
		lines: [
			{ speaker: 'A', vietnamese: 'Xin chào, tôi tên là Kyle.', english: "Hello, my name is Kyle." },
			{ speaker: 'B', vietnamese: 'Chào Kyle, rất vui được gặp bạn.', english: 'Hi Kyle, nice to meet you.' },
			{ speaker: 'A', vietnamese: 'Tôi cũng rất vui được gặp bạn.', english: 'Nice to meet you too.' },
			{ speaker: 'B', vietnamese: 'Bạn đến từ đâu?', english: 'Where are you from?' },
			{ speaker: 'A', vietnamese: 'Tôi đến từ nước Anh.', english: 'I\'m from England.' },
		],
	},
	{
		id: 'shopping',
		title: 'Mua Sắm',
		englishTitle: 'Shopping',
		emoji: '🛍️',
		lines: [
			{ speaker: 'A', vietnamese: 'Cái này bao nhiêu tiền?', english: 'How much is this?' },
			{ speaker: 'B', vietnamese: 'Năm mươi nghìn đồng.', english: '50,000 dong.' },
			{ speaker: 'A', vietnamese: 'Có đắt không? Giảm giá được không?', english: "Is that expensive? Can you lower the price?" },
			{ speaker: 'B', vietnamese: 'Được, bốn mươi nghìn thôi.', english: "Sure, just 40,000." },
			{ speaker: 'A', vietnamese: 'Cảm ơn, tôi lấy cái này.', english: "Thanks, I'll take this one." },
		],
	},
]

export function findDialogue(id: string): Dialogue | undefined {
	return dialogues.find(d => d.id === id)
}
