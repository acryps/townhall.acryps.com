import { alignItems, aspectRatio, backgroundColor, border, borderBottom, child, color, columnGap, display, flexDirection, flexGrow, flexWrap, fontSize, fontWeight, gap, height, imageRendering, justifyContent, lineHeight, marginBlock, marginBottom, marginInline, marginLeft, marginRight, marginTop, Mm, objectFit, objectPosition, opacity, padding, percentage, px, ratio, rem, textAlign, textDecorationLine, vh, width } from "@acryps/style";
import { negativeColor, neutralColor, pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { inputStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";
import { buildingStyle } from "./building/index.style";
import { ownershipStructureStyle } from "./ownership/index.style";
import { tabsStyle } from "../../shared/tabs/index.style";
import { boxed } from "../../shared/boxed.style";

export const propertyStyle = () => child('ui-property',
	boxed(),

	child('ui-deactivated',
		display('block'),
		padding(rem(1)),
		marginBottom(rem(1)),

		backgroundColor(negativeColor),

		textAlign('center')
	),

	child('ui-name',
		display('block'),

		fontSize(rem(1.2)),
		fontWeight('bold')
	),

	buildingStyle(),
	ownershipStructureStyle(),

	child('ui-content',
		child('ui-map-container',
			width(percentage(100).add(pageGutter.multiply(2))),
			height(vh(30)),

			marginInline(pageGutter.invert()),
			marginBlock(pageGutter)
		),

		tabsStyle(
			child('ui-general',
				child('ui-buildings',
					display('block'),
					marginBottom(rem(2)),

					border(px(1), 'solid', 'currentColor'),

					child('ui-building',
						display('flex'),
						padding(pageGutter),

						borderBottom(px(1), 'dotted', 'currentColor'),

						child('ui-detail',
							child('ui-name',
								display('block'),
								marginBottom(rem(0.25)),

								fontWeight('bold')
							),

							child('ui-area',
								display('block')
							)
						),

						child('canvas',
							marginLeft('auto'),
							height(rem(5)),
							width(rem(8)),

							objectFit('contain'),
							objectPosition('right'),
							imageRendering('pixelated')
						)
					)
						.attribute('ui-archived',
							child('ui-name',
								textDecorationLine('line-through')
							),

							child('canvas',
								height(rem(1.5))
							)
						),

					child('ui-action',
						display('flex'),
						columnGap(pageGutter),
						alignItems('center'),

						padding(pageGutter)
					)
				),


				child('ui-plot-boundaries',
					display('block'),
					marginBottom(rem(2)),

					border(px(1), 'solid', 'currentColor'),

					child('ui-plot-boundary',
						display('flex'),
						padding(pageGutter),

						opacity(0.5),
						borderBottom(px(1), 'dotted', 'currentColor'),

						child('ui-detail',
							child('ui-comment',
								display('block'),
								marginBottom(rem(0.25)),

								fontWeight('bold')
							),

							child('ui-area',
								display('block')
							)
						),

						child('canvas',
							marginLeft('auto'),
							height(rem(5)),
							width(rem(8)),

							objectFit('contain'),
							objectPosition('right'),
							imageRendering('pixelated')
						)
					)
						.attribute('ui-active',
							opacity(1)
						),

					child('ui-action',
						display('flex'),
						columnGap(pageGutter),
						alignItems('center'),

						padding(pageGutter)
					)
				),
			),

			child('ui-ownership-structure',
				display('block'),
				marginBottom(rem(2)),

				border(px(1), 'solid', 'currentColor'),

				child('ui-field').attribute('ui-quick-assign',
					display('block'),
					padding(pageGutter),

					borderBottom(px(1), 'dotted', 'currentColor'),

					child('label',
						display('block'),
						marginBottom(rem(0.25))
					)
				),

				child('ui-owner',
					display('flex'),
					gap(pageGutter),

					padding(pageGutter),
					borderBottom(px(1), 'dotted', 'currentColor'),

					child('ui-legal-entity',
						flexGrow(1)
					)
				),

				child('ui-action',
					display('flex'),
					columnGap(pageGutter),
					alignItems('center'),

					padding(pageGutter)
				)
			)
		),

		child('ui-field',
			display('flex'),
			flexDirection('column'),
			marginBottom(rem(1)),

			child('label',
				display('block'),
				marginBottom(rem(0.25))
			),

			child('input',
				inputStyle()
			),

			child('select',
				inputStyle()
			)
		),





		child('ui-dwellings',
			display('block'),
			marginBottom(rem(2)),

			border(px(1), 'solid', 'currentColor'),

			child('ui-dwelling',
				display('block'),
				padding(pageGutter),

				borderBottom(px(1), 'dotted', 'currentColor'),

				child('ui-name',
					display('block'),
					marginBottom(rem(0.25))
				),

				child('ui-vacant',
					display('block'),

					child('ui-header',
						display('block')
					),

					child('ui-hint',
						fontSize(rem(0.75))
					)
				)
			),

			child('ui-action',
				display('flex'),
				columnGap(pageGutter),
				alignItems('center'),

				padding(pageGutter)
			)
		),

		child('ui-offices',
			display('block'),
			marginBottom(rem(2)),

			border(px(1), 'solid', 'currentColor'),

			child('ui-office',
				display('block'),
				padding(pageGutter),

				borderBottom(px(1), 'dotted', 'currentColor'),

				child('ui-company',
					display('block'),

					fontWeight('bold')
				),

				child('ui-name',
					display('block')
				)
			),

			child('ui-action',
				display('flex'),
				columnGap(pageGutter),
				alignItems('center'),

				padding(pageGutter)
			)
		),

		child('ui-historic-listing',
			display('block'),
			padding(pageGutter),

			border(px(1), 'solid', 'currentColor'),

			child('ui-header',
				display('block'),
				marginBottom(rem(1)),

				fontWeight('bold')
			),

			child('ui-date',
				display('block'),
				marginBottom(rem(1))
			),

			child('ui-field',
				display('flex'),
				flexDirection('column'),
				marginBottom(rem(1)),

				child('label',
					display('block'),
					marginBottom(rem(0.25))
				),

				child('select',
					inputStyle()
				),

				child('ui-hint',
					display('block'),
					marginTop(rem(0.25)),
					fontSize(rem(0.75))
				)
			),

			child('ui-modifier',
				display('block'),
				marginBottom(rem(1)),

				child('ui-field',
					display('flex'),
					columnGap(rem(0.5))
				),

				child('ui-grade',
					display('block'),
					fontSize(rem(0.75))
				)
			)
		),

		child('ui-actions',
			child('ui-action',
				marginTop(rem(1)),

				buttonStyle()
			)
		)
	)
)
