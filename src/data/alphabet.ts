// Northern (Hà Nội) Vietnamese pronunciation.
// See .claude/steering/VIETNAMESE.md for family-specific corrections before editing.

export interface Letter {
	letter: string
	sound: string      // plain-English description of how it sounds, Northern dialect
	example: string
	exampleMeaning: string
	// What to send to TTS for the "letter" button. Vowels are naturally
	// pronounceable alone, so this is only set for consonants/clusters —
	// a bare consonant like "d" is ambiguous to TTS, so we use its spoken
	// "đánh vần" name instead (e.g. "dờ"), same convention Vietnamese
	// literacy teaching uses since consonants can't stand alone anyway.
	ttsText?: string
}

export interface LetterGroup {
	id: string
	title: string
	subtitle: string
	accent: 'teal' | 'yellow' | 'orange'
	letters: Letter[]
}

export const alphabetGroups: LetterGroup[] = [
	{
		id: 'vowels',
		title: 'Nguyên Âm',
		subtitle: 'Vowels',
		accent: 'teal',
		letters: [
			{ letter: 'a', sound: 'like "a" in "father"', example: 'ba', exampleMeaning: 'dad / three' },
			{ letter: 'ă', sound: 'like "a" in "hat", very short — never stands alone', example: 'ăn', exampleMeaning: 'to eat' },
			{ letter: 'â', sound: 'like "u" in "but", short and neutral', example: 'ấm', exampleMeaning: 'warm' },
			{ letter: 'e', sound: 'like "e" in "bet"', example: 'em', exampleMeaning: 'younger sibling / you' },
			{ letter: 'ê', sound: 'like "ay" in "day", but short with no glide', example: 'êm', exampleMeaning: 'soft, gentle' },
			{ letter: 'i', sound: 'like "ee" in "see"', example: 'đi', exampleMeaning: 'to go' },
			{ letter: 'y', sound: 'also like "ee" in "see"', example: 'ý', exampleMeaning: 'idea' },
			{ letter: 'o', sound: 'like "aw" in "law"', example: 'to', exampleMeaning: 'big' },
			{ letter: 'ô', sound: 'like "o" in "go", no glide', example: 'cô', exampleMeaning: 'aunt / Miss' },
			{ letter: 'ơ', sound: 'like "er" in "her", no "r" sound', example: 'mở', exampleMeaning: 'to open' },
			{ letter: 'u', sound: 'like "oo" in "food"', example: 'thu', exampleMeaning: 'autumn' },
			{ letter: 'ư', sound: 'like "oo" but unrounded lips — no English equivalent', example: 'từ', exampleMeaning: 'word' },
		],
	},
	{
		id: 'consonants',
		title: 'Phụ Âm Đơn',
		subtitle: 'Single consonants',
		accent: 'yellow',
		letters: [
			{ letter: 'b', sound: 'like English "b"', example: 'bà', exampleMeaning: 'grandma', ttsText: 'bờ' },
			{ letter: 'c', sound: 'like English "k" (hard)', example: 'cá', exampleMeaning: 'fish', ttsText: 'cờ' },
			{ letter: 'd', sound: 'Northern: like English "z" — not like English "d"', example: 'da', exampleMeaning: 'skin', ttsText: 'dờ' },
			{ letter: 'đ', sound: 'like English "d"', example: 'đỏ', exampleMeaning: 'red', ttsText: 'đờ' },
			{ letter: 'g', sound: 'like English "g" (hard)', example: 'gà', exampleMeaning: 'chicken', ttsText: 'gờ' },
			{ letter: 'h', sound: 'like English "h"', example: 'hoa', exampleMeaning: 'flower', ttsText: 'hờ' },
			{ letter: 'k', sound: 'like English "k" (used before e/ê/i)', example: 'kem', exampleMeaning: 'ice cream', ttsText: 'ca' },
			{ letter: 'l', sound: 'like English "l"', example: 'lá', exampleMeaning: 'leaf', ttsText: 'lờ' },
			{ letter: 'm', sound: 'like English "m"', example: 'mẹ', exampleMeaning: 'mother', ttsText: 'mờ' },
			{ letter: 'n', sound: 'like English "n"', example: 'nước', exampleMeaning: 'water', ttsText: 'nờ' },
			{ letter: 'p', sound: 'like English "p"', example: 'pin', exampleMeaning: 'battery', ttsText: 'pờ' },
			{ letter: 'q', sound: 'always paired with "u" — "kw" sound', example: 'quả', exampleMeaning: 'fruit', ttsText: 'quờ' },
			{ letter: 'r', sound: 'Northern: like English "z" — same as "d"', example: 'ra', exampleMeaning: 'to go out', ttsText: 'rờ' },
			{ letter: 's', sound: 'Northern: like English "s" — same as "x"', example: 'sữa', exampleMeaning: 'milk', ttsText: 'sờ' },
			{ letter: 't', sound: 'like English "t" but unaspirated (no puff of air)', example: 'tay', exampleMeaning: 'hand', ttsText: 'tờ' },
			{ letter: 'v', sound: 'like English "v"', example: 'vui', exampleMeaning: 'happy', ttsText: 'vờ' },
			{ letter: 'x', sound: 'like English "s"', example: 'xe', exampleMeaning: 'vehicle', ttsText: 'xờ' },
		],
	},
	{
		id: 'clusters',
		title: 'Phụ Âm Ghép',
		subtitle: 'Consonant clusters',
		accent: 'orange',
		letters: [
			{ letter: 'ch', sound: 'like "ch" in "church", softer/unaspirated', example: 'chó', exampleMeaning: 'dog', ttsText: 'chờ' },
			{ letter: 'gh', sound: 'same hard "g" sound, used before e/ê/i', example: 'ghế', exampleMeaning: 'chair', ttsText: 'ghờ' },
			{ letter: 'gi', sound: 'Northern: like English "z" — same as "d"', example: 'giày', exampleMeaning: 'shoes', ttsText: 'giờ' },
			{ letter: 'kh', sound: 'throaty "k", like Scottish "loch"', example: 'không', exampleMeaning: 'no / zero', ttsText: 'khờ' },
			{ letter: 'ng', sound: 'like "ng" in "singer" — can start a word', example: 'ngon', exampleMeaning: 'delicious', ttsText: 'ngờ' },
			{ letter: 'ngh', sound: 'same as "ng", used before e/ê/i', example: 'nghe', exampleMeaning: 'to listen', ttsText: 'ngờ' },
			{ letter: 'nh', sound: 'like "ny" in "canyon"', example: 'nhà', exampleMeaning: 'house', ttsText: 'nhờ' },
			{ letter: 'ph', sound: 'like English "f"', example: 'phở', exampleMeaning: 'pho (noodle soup)', ttsText: 'phờ' },
			{ letter: 'qu', sound: 'like "kw" in "quick"', example: 'quê', exampleMeaning: 'hometown', ttsText: 'quờ' },
			{ letter: 'th', sound: 'like "t" in English "top", aspirated', example: 'thích', exampleMeaning: 'to like', ttsText: 'thờ' },
			{ letter: 'tr', sound: 'Northern: merges with "ch" — like "ch" in "church"', example: 'trà', exampleMeaning: 'tea', ttsText: 'trờ' },
		],
	},
]
