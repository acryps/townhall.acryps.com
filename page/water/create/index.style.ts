import { child, display, flexDirection, fontSize, height, marginBottom, marginInline, marginLeft, rem, vh } from "@acryps/style";
import { fieldStyle, inputStyle } from "../../shared/field.style";
import { pageGutter } from "../../index.style";
import { buttonStyle } from "../../shared/index.style";

export const createWaterBodyStyle = () => child('ui-create-water-body',
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
