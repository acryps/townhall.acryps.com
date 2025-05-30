import { alignItems, child, display, fontSize, gap, height, marginBottom, marginInline, rem, vh } from "@acryps/style";
import { pageGutter } from "../../index.style";

export const trainRouteStyle = () => child('ui-route',
	child('ui-header',
		display('flex'),
		alignItems('center'),
		gap(rem(1)),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-map-container',
		height(vh(30)),
		marginInline(pageGutter.invert())
	)
);
