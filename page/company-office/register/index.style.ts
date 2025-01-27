import { child, display, flexDirection, fontSize, fontWeight, marginBottom, rem } from "@acryps/style";
import { fieldStyle } from "../../shared/field.style";
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

	child('ui-field',
		display('flex'),
		flexDirection('column'),
		marginBottom(rem(1)),

		child('input', fieldStyle()),
		child('textarea', fieldStyle()),
		child('select', fieldStyle()),

		child('label',
			display('block'),
			marginBottom(rem(0.5)),

			fontWeight('bold')
		),

		child('ui-hint',
			display('block'),
			marginBottom(rem(0.5))
		)
	),

	child('ui-action',
		buttonStyle()
	)
)
