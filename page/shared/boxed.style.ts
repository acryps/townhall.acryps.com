import { display, marginInline, maxWidth, rem } from "@acryps/style";

export const boxed = () => [
	display('block'),
	maxWidth(rem(60)),
	marginInline('auto'),
];
