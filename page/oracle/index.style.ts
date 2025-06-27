import { alignItems, background, backgroundColor, border, child, display, fontSize, fontStyle, fontWeight, hex, justifyContent, marginBottom, padding, px, rem, textAlign } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";
import { buttonStyle } from "../shared/index.style";
import { annotatedTextStyle } from "../shared/annotaded-text/index.style";

export const oracleProposalColor = hex('dcf21a');

export const oracleStyle = () => child('ui-oracle',
	boxed(),

	child('ui-header',
		display('block'),
		marginBottom(pageGutter),

		textAlign('center'),

		child('ui-icon',
			display('block'),
			marginBottom(rem(0.5)),

			fontSize(rem(7))
		),

		child('ui-name',
			display('block'),
			marginBottom(rem(1)),

			fontSize(rem(2)),
			fontWeight('bold')
		),

		child('ui-guide',
			display('block')
		)
	),

	child('ui-proposal',
		display('block'),
		padding(pageGutter),

		backgroundColor(oracleProposalColor),

		child('ui-legal-entity',
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-lore',
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-actions',
			display('flex'),
			justifyContent('space-between'),

			child('ui-action',
				buttonStyle()
			)
		)
	),

	child('ui-none',
		display('block'),
		marginBottom(pageGutter),

		fontStyle('italic')
	)
);
