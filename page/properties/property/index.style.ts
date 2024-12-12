import { child, display, fontSize, fontWeight, height, marginBlock, marginBottom, marginInline, marginTop, percentage, rem, Rem, vh, width } from "@acryps/style";
import { pageGutter } from "../../index.style";

export const propertyStyle = () => child('ui-property',
	display('block'),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-name',
		display('block'),

		fontSize(rem(1.2)),
		fontWeight('bold')
	)
)
