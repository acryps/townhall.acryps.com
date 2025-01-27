import { alignItems, border, columnGap, display, hex, paddingBlock, paddingInline, px, rem, textAlign } from "@acryps/style";

export const buttonStyle = () => [
	display('flex'),
	alignItems('center'),
	columnGap(rem(0.9)),

	paddingInline(rem(1)),
	paddingBlock(rem(0.8)),

	textAlign('center'),
	border(px(1), 'solid', hex('000'))
];
