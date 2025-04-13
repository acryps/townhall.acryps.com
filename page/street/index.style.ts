import { child, display, fontSize, fontWeight, height, imageRendering, marginBlock, marginInline, percentage, rem, vh, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";

export const streetStyle = () => child('ui-street',
	boxed(),

	child('ui-name',
		display('block'),

		fontSize(rem(1.2)),
		fontWeight('bold')
	),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-plots',
		display('block'),

		child('canvas',
			width(percentage(100)),
			imageRendering('pixelated')
		)
	)
);
