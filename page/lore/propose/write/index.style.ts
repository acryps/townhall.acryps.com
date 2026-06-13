import { child, display, flexDirection, marginBottom } from "@acryps/style";
import { pageGutter } from "../../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/index.style";
import { inputStyle } from "../../../shared/field.style";

export const writeLoreStyle = () => child('ui-write',
	display('flex'),
	flexDirection('column'),

	child('ui-guide',
		display('block'),
		marginBottom(pageGutter)
	),

	child('textarea',
		inputStyle(),

		marginBottom(pageGutter)
	),

	child('ui-actions',
		buttonGroupStyle(),

		child('ui-action',
			buttonStyle()
		)
	)
)
