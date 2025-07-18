import { alignItems, backgroundColor, border, boxShadow, color, columnGap, cursor, display, hex, paddingBlock, paddingInline, px, rem, style, textAlign } from "@acryps/style";

export const buttonStyle = () => [
	display('flex'),
	alignItems('center'),
	columnGap(rem(0.9)),

	paddingInline(rem(1)),
	paddingBlock(rem(0.8)),

	cursor('pointer'),

	textAlign('center'),
	border(px(1), 'solid', hex('000')),

	style(':hover',
		color(hex('000')),
		backgroundColor(hex('eee')),

		boxShadow(hex('0006'), 0, 0, 0, px(2), 'inset')
	)
];
