import { border, child, display, flexWrap, fontWeight, gap, justifyContent, marginBottom, marginTop, opacity, padding, px, rem } from "@acryps/style";
import { pageGutter } from "../../../index.style";
import { buttonStyle } from "../../../shared/index.style";
import { revalueStyle } from "./revalue/index.style";

export const ownershipStructureStyle = () => child('ui-ownership-structure',
	display('block'),

	revalueStyle(),

	child('ui-owner',
		display('block'),
		marginTop(pageGutter),
		padding(pageGutter),

		border(px(1), 'solid', 'currentColor'),

		child('ui-entity',
			display('flex'),
			justifyContent('space-between'),
			marginBottom(rem(1)),

			fontWeight('bold')
		),

		child('ui-aquired',
			display('block'),
			marginBottom(rem(0.75)),

			child('ui-time',
				display('block'),
				marginBottom(rem(0.25))
			)
		),

		child('ui-sold',
			display('block')
		),

		child('ui-actions',
			display('flex'),
			gap(pageGutter),
			flexWrap('wrap'),

			child('ui-action',
				buttonStyle()
			)
		)
	)
		.attribute('ui-inactive',
			opacity(0.3)
		)
)
