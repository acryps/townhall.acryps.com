import { child, display, alignItems, columnGap, rem, padding, margin, marginBottom, color, backgroundColor } from "@acryps/style";
import { pageGutter, pageBackgroundColor, pageTextColor } from "../index.style";

export const topicHeaderStyle = () => child('ui-header',
	display('flex'),
	alignItems('center'),
	columnGap(rem(1)),

	padding(pageGutter),
	margin(pageGutter.invert()),
	marginBottom(pageGutter),

	color(pageBackgroundColor),
	backgroundColor(pageTextColor)
);
