import { resize, paddingBlock, rem, paddingInline, fontFamily, fontSize, color, backgroundColor, border, borderRadius, outline } from "@acryps/style";
import { pageBackgroundColor, pageTextColor } from "../index.style";

export const fieldStyle = () => [
	resize('none'),

	paddingBlock(rem(0.5)),
	paddingInline(rem(0.75)),

	fontFamily('inherit'),
	fontSize(rem(1)),
	color(pageBackgroundColor),
	backgroundColor(pageTextColor),
	border(0, 'none', 'transparent'),
	borderRadius(0),
	outline(0, 'none', 'transparent')
];
