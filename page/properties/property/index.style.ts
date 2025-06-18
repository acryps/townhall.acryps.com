import { alignContent, alignItems, alignSelf, aspectRatio, background, backgroundColor, backgroundImage, backgroundPosition, backgroundPositionX, backgroundSize, border, borderBottom, bottom, child, color, colorStop, columnGap, display, Dvi, flexDirection, flexGrow, flexWrap, fontSize, fontStyle, fontWeight, gap, height, imageRendering, justifyContent, justifyItems, left, linearGradient, LinearGradient, lineHeight, margin, marginBlock, marginBottom, marginInline, marginLeft, marginRight, marginTop, milliseconds, min, Mm, objectFit, objectPosition, opacity, padding, percentage, position, px, ratio, rem, style, textAlign, textDecorationLine, top, turn, Variable, vh, width } from "@acryps/style";
import { negativeColor, neutralColor, pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { fieldStyle, inputStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";
import { buildingStyle } from "./building/index.style";
import { ownershipStructureStyle } from "./ownership/index.style";
import { tabsStyle } from "../../shared/tabs/index.style";
import { boxed } from "../../shared/boxed.style";
import { changeFramesStyle } from "../../shared/change-frames/index.style";

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
				fieldStyle(),

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

				child('ui-actions',
					child('ui-action',
						marginTop(rem(1)),

						buttonStyle()
					)
				)
			),

			child('ui-station',
				display('block'),

				fieldStyle(),

				child('ui-stops',
					display('block'),
					marginBottom(pageGutter),

					border(px(1), 'solid', 'currentColor'),

					child('ui-stop',
						display('block'),
						padding(pageGutter),

						fieldStyle(),

						child('ui-route',
							display('flex'),
							gap(pageGutter),

							marginBottom(rem(0.75))
						),

						child('ui-operator',
							display('block'),
							marginBottom(pageGutter)
						),

						child('ui-stops',
							display('flex'),
							justifyContent('space-between'),
							marginBottom(pageGutter)
						),

						child('ui-platforms',
							display('flex'),
							gap(pageGutter),

							fieldStyle(
								flexGrow(1),
								marginBottom(0)
							)
						),

						style(':not(:last-of-type)',
							borderBottom(px(1), 'solid', 'currentColor')
						)
					)
						.attribute('ui-closed',
							opacity(0.5)
						)
				),

				child('ui-actions',
					display('flex'),

					child('ui-action',
						buttonStyle()
					)
				)
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
			),

			child('ui-usage',
				display('block'),

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
							opacity(0.5)
						)
					),

					child('ui-create',
						display('flex'),
						flexDirection('column'),
						padding(pageGutter),

						child('ui-hint',
							display('block'),
							marginBottom(rem(1))
						),

						fieldStyle(),

						child('ui-action',
							buttonStyle(),

							marginLeft('auto')
						)
					),

					child('ui-action',
						display('flex'),
						columnGap(pageGutter),
						alignItems('center'),

						padding(pageGutter)
					)
						.attribute('ui-create-dwellings',
							child('input',
								inputStyle()
							)
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
				)
			),

			child('ui-history',
				changeFramesStyle(),

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
				)
			)
		)
	)
)
