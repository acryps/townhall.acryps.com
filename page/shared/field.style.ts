import { resize, paddingBlock, rem, paddingInline, fontFamily, fontSize, color, backgroundColor, border, borderRadius, outline } from "@acryps/style";
import { pageBackgroundColor, pageTextColor } from "../index.style";

export const fieldTextColor = pageBackgroundColor;
export const fieldBackgroundColor = pageTextColor;

export const fieldSpacingInline = rem(0.75);
export const fieldSpacingBlock = rem(0.5);

export const fieldStyle = () => [
	resize('none'),

	paddingBlock(fieldSpacingBlock),
	paddingInline(fieldSpacingInline),

	fontFamily('inherit'),
	fontSize(rem(1)),
	color(fieldTextColor),
	backgroundColor(fieldBackgroundColor),
	border(0, 'none', 'transparent'),
	borderRadius(0),
	outline(0, 'none', 'transparent')
];
