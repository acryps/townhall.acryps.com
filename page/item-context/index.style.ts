import { backgroundColor, border, child, cursor, display, fontSize, fontStyle, fontWeight, gap, marginBottom, marginTop, Mm, padding, px, rem, textDecorationLine, textTransform, whiteSpace } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { infoColor, pageGutter } from "../index.style";
import { microFont } from "../assets/font/index.style";
import { tabsStyle } from "../shared/tabs/index.style";

export const itemContextStyle = () => child('ui-item-context',
	boxed(),

	child('ui-guide',
		display('block'),
		padding(pageGutter),
		marginBottom(pageGutter),

		fontSize(rem(0.8)),
		backgroundColor(infoColor)
	),

	child('ui-loading',
		display('block'),

		fontStyle('italic')
	),

	child('ui-id',
		display('block'),
		marginBottom(rem(0.25)),

		microFont,
		fontSize(rem(0.8))
	),

	child('ui-name',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-updated',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(0.8))
	),

	tabsStyle(
		child('ui-context-ranks',
			display('block'),

			child('ui-rank',
				display('block'),
				padding(pageGutter),
				marginBottom(pageGutter),

				border(px(1), 'solid', 'currentColor'),

				child('ui-name',
					display('block'),
					marginBottom(rem(0.5)),

					fontSize(rem(0.8))
				),

				child('ui-content',
					display('block'),

					whiteSpace('pre-wrap')
				)
			)
		),

		child('ui-links',
			display('block'),
			marginTop(pageGutter),

			child('ui-link',
				display('block'),
				padding(pageGutter),
				marginBottom(pageGutter),

				border(px(1), 'solid', 'currentColor'),

				child('ui-connection',
					display('block'),
					marginBottom(rem(0.5)),

					fontStyle('italic'),
					cursor('pointer')
				)
			)
		),

		child('ui-fragments',
			display('block'),
			marginTop(pageGutter),

			child('ui-fragment',
				display('block'),
				padding(pageGutter),
				marginBottom(pageGutter),

				border(px(1), 'solid', 'currentColor'),

				child('ui-header',
					display('flex'),
					gap(pageGutter),

					marginBottom(pageGutter),

					child('ui-rank',
						textTransform('uppercase')
					),

					child('ui-title',
						fontWeight('bold')
					)
				),

				child('ui-connecontentction',
					display('block'),

					whiteSpace('pre-wrap')
				)
			)
		)
	)
);
