import { background, backgroundColor, border, display, hex, padding, paddingBlock, paddingInline, px, rem } from "@acryps/style";

export const cardSpacingInline = rem(1);
export const cardSpacingBlock = rem(0.5);

export const card = (addSpacing = true) => [
	display('block'),
	border(px(1), 'solid', hex('000')),
	backgroundColor(hex('eee')),

	addSpacing ? [
		paddingInline(cardSpacingInline),
		paddingBlock(cardSpacingBlock)
	] : []
];
