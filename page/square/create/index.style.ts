import { child, display, height, marginBottom, marginInline, vh } from "@acryps/style";
import { fieldStyle } from "../../shared/field.style";
import { pageGutter } from "../../index.style";
import { buttonStyle } from "../../shared/index.style";

export const createSquareStyle = () => child('ui-create-square',
	display('block'),

	child('ui-map-container',
		height(vh(30)),
		marginInline(pageGutter.invert()),
		marginBottom(pageGutter)
	),

	fieldStyle(),

	child('ui-actions',
		child('ui-action',
			buttonStyle()
		)
	)
);
