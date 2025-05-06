import { display, marginInline, maxWidth, rem } from "@acryps/style";

export const boxedMaxContentWidth = rem(60);

export const boxed = () => [
	display('block'),
	maxWidth(boxedMaxContentWidth),
	marginInline('auto'),
];
