import { display, marginInline, maxWidth, min, rem, vw } from "@acryps/style";

export const boxedMaxContentWidth = rem(60);
export const usedBoxedWidth = min(boxedMaxContentWidth, vw(100));

export const boxed = () => [
	display('block'),
	maxWidth(boxedMaxContentWidth),
	marginInline('auto'),
];
