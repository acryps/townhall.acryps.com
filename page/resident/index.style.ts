import { ch, child, display, fontSize, fontWeight, marginBottom, marginRight, rem, textAlign, whiteSpace } from "@acryps/style";
import { boxed } from "../shared/boxed.style";

export const residentStyle = () => child('ui-resident',
	boxed(),

	child('ui-name',
		display('block'),
		marginBottom(rem(1)),

		textAlign('center'),
		fontSize(rem(2)),

		child('ui-given-name',
			display('inline-block'),
			marginRight(ch(1)),

			fontWeight('bold')
		)
	),

	child('ui-age',
		display('block'),
		textAlign('center'),

		marginBottom(rem(2))
	),

	child('ui-biography',
		display('block'),
		whiteSpace('pre-wrap')
	)
)
