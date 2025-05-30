import { alignItems, backgroundColor, border, child, color, ColorValue, display, em, fontSize, fontWeight, justifyItems, padding, paddingBlock, paddingInline, px, select, Variable } from "@acryps/style";

export const trainRouteColor = new Variable<ColorValue>('train-route-color');
export const trainRouteTextColor = new Variable<ColorValue>('train-route-text-color');

export const trainRouteIconStyle = () => select('ui-train-route-icon',
	display('inline-flex'),
	alignItems('center'),
	justifyItems('center'),
	paddingBlock(em(0.125).subtract(px(1))),
	paddingInline(em(0.5)),

	color(trainRouteTextColor),
	backgroundColor(trainRouteColor),
	border(px(1), 'solid', trainRouteTextColor),

	fontWeight('bold'),
	fontSize(em(0.75))
);
