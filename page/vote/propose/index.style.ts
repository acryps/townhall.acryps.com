import { child, display, flexDirection, marginBottom, rem } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { fieldStyle } from "../../shared/field.style";

export const proposeBillStyle = () => child('ui-propose-bill',
	display('block'),

	child('ui-field',
		display('flex'),
		flexDirection('column'),
		marginBottom(rem(1)),

		child('label',
			display('block'),
			marginBottom(rem(0.25))
		),

		child('input',
			fieldStyle()
		),

		child('textarea',
			fieldStyle()
		),

		child('select',
			fieldStyle()
		)
	),

	child('ui-process',
		display('block')
	)
)
