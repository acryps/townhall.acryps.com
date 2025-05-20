import { child, display, fontSize, marginBottom, rem } from "@acryps/style";
import { pageGutter } from "../../../../index.style";
import { buttonStyle } from "../../../../shared/index.style";

export const revalueStyle = () => child('ui-revalue',
	child('ui-guide',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-field',
		display('block'),
		marginBottom(pageGutter),

		child('label',
			display('block'),
			marginBottom(rem(0.5))
		)
	),

	child('ui-action',
		buttonStyle()
	)
);
