import { child, display, height, marginBlock, marginInline, percentage, vh, width } from "@acryps/style";
import { fieldStyle } from "../../../shared/field.style";
import { pageGutter } from "../../../index.style";

export const planShapeStyle = () => child('ui-shape',
	fieldStyle(),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),
);
