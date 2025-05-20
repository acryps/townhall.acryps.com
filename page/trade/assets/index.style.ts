import { borderBottom, child, display, fontSize, fontWeight, justifyContent, marginBottom, paddingBlock, px, rem, textAlign } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { pageGutter } from "../../index.style";

export const assetsStyle = () => child('ui-assets',
	boxed(),

	child('ui-entity',
		marginBottom(pageGutter),

		fontSize(rem(1.5))
	),

	child('ui-assets',
		display('block'),

		child('ui-asset',
			display('flex'),
			justifyContent('space-between'),
			paddingBlock(pageGutter.divide(2)),

			borderBottom(px(1), 'dashed', 'currentColor')
		),

		child('ui-total',
			display('block'),
			paddingBlock(pageGutter),

			textAlign('right'),
			fontWeight('bold')
		)
	)
);
