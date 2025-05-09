import { border, child, display, fontSize, fontWeight, marginBottom, padding, px, rem, tabSize, textAlign, whiteSpace } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { pageGutter } from "../../index.style";

export const valuationStyle = () => child('ui-valuation',
	boxed(),

	child('ui-time',
		display('block'),
		marginBottom(rem(0.5))
	),

	child('ui-issuer',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-target',
		display('block'),
		marginBottom(pageGutter),
		padding(pageGutter),

		border(px(1), 'solid', 'currentColor'),

		child('ui-item',
			display('block'),
			marginBottom(rem(0.5)),

			fontWeight('bold')
		),

		child('ui-description',
			display('block'),

			whiteSpace('pre-wrap'),
			tabSize(2)
		)
	),

	child('ui-price',
		display('block'),

		fontSize(rem(2)),
		textAlign('right')
	)
);
