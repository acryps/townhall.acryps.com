import { child, display, flexDirection, fontSize, fontWeight, marginBottom, rem } from "@acryps/style";
import { fieldStyle, inputStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";

export const registerCompanyStyle = () => child('ui-register',
	display('block'),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2)),
		fontWeight('bold')
	),

	child('ui-office',
		display('block'),
		marginBottom(rem(1))
	),

	fieldStyle(),

	child('ui-action',
		buttonStyle()
	)
)
