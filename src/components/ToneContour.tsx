export default function ToneContour({ contour, color = '#006a62' }: { contour: [number, number][][]; color?: string }) {
	const W = 120
	const H = 64

	const toSvg = ([x, y]: [number, number]): [number, number] => [
		(x / 100) * W,
		H - (y / 10) * H,
	]

	const [startX, startY] = toSvg(contour[0][0])

	return (
		<svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16">
			{/* mid baseline for reference */}
			<line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#e1bfb5" strokeWidth={1} strokeDasharray="2 3" />

			{contour.map((seg, i) => {
				const d = seg.map((p, j) => `${j === 0 ? 'M' : 'L'} ${toSvg(p).join(' ')}`).join(' ')
				return <path key={i} d={d} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />
			})}

			<circle cx={startX} cy={startY} r={3} fill={color} />
		</svg>
	)
}
