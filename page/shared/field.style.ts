import { resize, paddingBlock, rem, paddingInline, fontFamily, fontSize, color, backgroundColor, border, borderRadius, outline, child, display, flexDirection, marginBottom, StyleSelectorBody } from "@acryps/style";
import { pageBackgroundColor, pageTextColor } from "../index.style";

export const inputTextColor = pageBackgroundColor;
export const indexBackgroundColor = pageTextColor;

export const inputSpacingInline = rem(0.75);
export const inputSpacingBlock = rem(0.5);

export const inputStyle = () => [
	resize('none'),

	paddingBlock(inputSpacingBlock),
	paddingInline(inputSpacingInline),

	fontFamily('inherit'),
	fontSize(rem(1)),
	color(inputTextColor),
	backgroundColor(indexBackgroundColor),
	border(0, 'none', 'transparent'),
	borderRadius(0),
	outline(0, 'none', 'transparent')
];

export const fieldStyle = (...content: StyleSelectorBody[]) => child('ui-field',
	display('flex'),
	flexDirection('column'),
	marginBottom(rem(1)),

	child('input', inputStyle()),
	child('textarea', inputStyle()),
	child('select', inputStyle()),

	child('label',
		display('block'),
		marginBottom(rem(0.25))
	),

	child('ui-hint',
		display('block'),
		marginBottom(rem(0.75)),

		fontSize(rem(0.75))
	),

	content
);
