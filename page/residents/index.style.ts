import { ch, child, display, fontWeight, marginBottom, marginRight, rem, Rem } from "@acryps/style";
import { card } from "../shared/card.style";

export const residentsStyle = () => child('ui-residents',
	display('block'),

	child('ui-resident',
		card(),
		marginBottom(rem(1)),

		child('ui-name',
			display('block'),

			fontWeight('bold'),

			child('ui-given-name',
				display('inline-block'),
				marginRight(ch(1))
			)
		)
	)
)
