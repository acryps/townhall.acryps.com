import { border, display, hex, paddingBlock, paddingInline, px, rem, textAlign } from "@acryps/style";

export const buttonStyle = () => [
	display('block'),
	paddingInline(rem(1)),
	paddingBlock(rem(0.8)),
	
	textAlign('center'),
	border(px(1), 'solid', hex('000'))
];
