import { alignItems, border, borderBottom, child, columnGap, display, flexGrow, flexShrink, fontSize, fontWeight, gap, height, imageRendering, marginBottom, marginLeft, marginRight, objectFit, objectPosition, padding, px, rem, textAlign, textDecorationLine, width } from "@acryps/style";
import { pageGutter } from "../../index.style";
import { tabsStyle } from "../../shared/tabs/index.style";
import { boxed } from "../../shared/boxed.style";

export const marketEntityStyle = () => child('ui-entity',
	boxed(),

	child('ui-title',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	tabsStyle(
		child('ui-stock',
			display('block'),

			child('ui-description',
				display('block'),
				marginBottom(pageGutter)
			),

			child('ui-list',
				display('block'),
				marginBottom(rem(2)),

				border(px(1), 'solid', 'currentColor'),

				child('ui-item',
					display('flex'),
					padding(pageGutter),

					borderBottom(px(1), 'dotted', 'currentColor'),

					child('ui-commodity',
						flexGrow(1),

						child('ui-name',
							display('block'),

							fontWeight('bold')
						),

						child('ui-seed',
							display('block'),

							fontSize(rem(0.7))
						)
					),

					child('ui-quantity',
						child('ui-number',
							display('inline-block'),
							marginRight(rem(0.25))
						),

						child('ui-unit',
							display('inline-block'),

							fontSize(rem(0.7))
						)
					)
				)
			),
		),

		child('ui-positions',
			display('block'),

			child('ui-description',
				display('block'),
				marginBottom(pageGutter)
			),

			child('ui-commodities',
				display('block'),
				marginBottom(rem(2)),

				border(px(1), 'solid', 'currentColor'),

				child('ui-commodity',
					display('block'),
					padding(pageGutter),

					borderBottom(px(1), 'dotted', 'currentColor'),

					child('ui-header',
						flexGrow(1),

						display('flex'),
						gap(pageGutter),

						child('ui-commodity',
							flexGrow(1),

							fontWeight('bold')
						),

						child('ui-quantity',
							flexShrink(0),

							child('ui-number',
								display('inline-block'),
								marginRight(rem(0.25))
							),

							child('ui-unit',
								display('inline-block'),

								fontSize(rem(0.7))
							)
						),

						child('ui-price',
							flexShrink(0)
						)
					),

					child('ui-positions',
						display('block'),

						child('ui-position',
							display('flex'),
							gap(pageGutter),

							child('ui-date',
								flexGrow(1)
							),

							child('ui-quantity',
								flexShrink(0),

								child('ui-number',
									display('inline-block'),
									marginRight(rem(0.25))
								),

								child('ui-unit',
									display('inline-block'),

									fontSize(rem(0.7))
								)
							),

							child('ui-price',
								flexShrink(0)
							)
						)
					)
				)
			),
		)
	)
)
