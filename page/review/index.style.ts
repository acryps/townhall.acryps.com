import { child, display, height, marginBlock, marginBottom, marginInline, percentage, vh, width } from "@acryps/style";
import { pageGutter } from "../index.style";
import { boxed } from "../shared/boxed.style";
import { buttonStyle } from "../shared/index.style";

export const reviewStyle = () => child('ui-review',
	boxed(),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-name',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-actions',
		display('block'),

		child('ui-action',
			buttonStyle(),

			marginBottom(pageGutter)
		)
	)
);
