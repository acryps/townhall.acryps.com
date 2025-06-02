import { child, display, fontSize, marginBottom, rem } from "@acryps/style";
import { pageGutter } from "../../../../index.style";
import { buttonStyle } from "../../../../shared/index.style";
import { fieldStyle } from "../../../../shared/field.style";

export const revalueStyle = () => child('ui-revalue',
	child('ui-guide',
		display('block'),
		marginBottom(pageGutter)
	),

	fieldStyle(),

	child('ui-action',
		buttonStyle()
	)
);
