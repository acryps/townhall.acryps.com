import { background, backgroundColor, border, display, hex, padding, paddingBlock, paddingInline, px, rem } from "@acryps/style";

export const card = (addSpacing = true) => [
	display('block'),
	border(px(1), 'solid', hex('000')),
	backgroundColor(hex('eee')),

	addSpacing ? [
		paddingInline(rem(1)),
		paddingBlock(rem(0.5))
	] : []
];
