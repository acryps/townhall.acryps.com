import { child, cursor, display, flexGrow, fontSize, gap, marginBlock, marginBottom, rem } from "@acryps/style";
import { pageGutter } from "../../index.style";

export const cycleStyle = () => child('ui-cycle',
	display('block'),

	child('ui-neighbors',
		display('block'),
		marginBlock(pageGutter.divide(4).multiply(3)),

		child('ui-neighbor',
			display('flex'),
			gap(pageGutter),
			marginBlock(pageGutter.divide(4)),

			cursor('pointer'),

			child('ui-name',
				flexGrow(1)
			)
		)
	),

	child('ui-name',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	)
)
