import { alignItems, backgroundColor, border, borderBottom, ch, child, display, flexBasis, flexGrow, flexShrink, flexWrap, fontSize, fontWeight, gap, hex, height, hsl, justifyContent, lineHeight, marginBottom, marginLeft, marginRight, overflow, padding, percentage, Percentage, px, rem, rgb, textAlign, textOverflow, Variable, whiteSpace, width } from "@acryps/style";
import { pageGutter } from "../../index.style";
import { tabsStyle } from "../../shared/tabs/index.style";
import { inputStyle } from "../../shared/field.style";

export const positionIntensity = new Variable<Number>('intensity');

export const retailColor = hex('c91a4b');
export const commercialColor = hex('1a6ac9');

export const commodityStyle = () => child('ui-commodity',
	display('block'),

	child('ui-title',
		display('flex'),
		justifyContent('space-between'),
		alignItems('flex-end'),
		gap(pageGutter),
		marginBottom(rem(0.75)),

		fontSize(rem(2)),

		child('ui-price',
			flexShrink(0),

			fontSize(rem(1.25))
		)
	),

	child('ui-category',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-description',
		display('block'),
		marginBottom(pageGutter)
	),

	tabsStyle(
		child('ui-ratings',
			display('block'),

			child('ui-view-options',
				display('flex'),
				flexWrap('wrap'),
				gap(pageGutter),
				marginBottom(pageGutter.multiply(2)),

				child('select',
					inputStyle()
				)
			),

			child('ui-rating',
				display('block'),
				marginBottom(rem(2)),

				child('ui-header',
					display('block'),
					marginBottom(rem(0.75)),

					child('ui-name',
						display('block'),

						fontWeight('bold')
					),

					child('ui-description',
						display('block')
					)
				),

				child('ui-empty',
					display('block'),
					padding(pageGutter),

					border(px(1), 'solid', 'currentColor')
				)
			)
		),

		child('ui-demand',
			display('block'),

			child('ui-description',
				display('block'),
				marginBottom(pageGutter)
			),

			child('ui-timeline',
				display('block'),
				marginBottom(rem(2)),

				border(px(1), 'solid', 'currentColor'),

				child('ui-demand',
					display('flex'),
					justifyContent('space-between'),
					padding(pageGutter),

					borderBottom(px(1), 'dotted', 'currentColor')
				)
			),
		),

		child('ui-stocking',
			display('block'),

			child('ui-description',
				display('block'),
				marginBottom(pageGutter)
			),

			child('ui-rules',
				display('block'),
				marginBottom(rem(2)),

				border(px(1), 'solid', 'currentColor'),

				child('ui-rule',
					display('flex'),
					justifyContent('space-between'),
					padding(pageGutter),

					borderBottom(px(1), 'dotted', 'currentColor')
				),

				child('ui-empty',
					display('block'),
					padding(pageGutter)
				)
			)
		),

		child('ui-positions',
			display('block'),
			overflow('hidden'),

			child('ui-header',
				display('flex'),
				justifyContent('space-between'),
				marginBottom(rem(0.25)),

				child('ui-name',
					fontWeight('bold')
				)
			),

			child('ui-description',
				display('block'),
				marginBottom(pageGutter)
			),

			child('ui-position',
				display('flex'),
				gap(rem(0.5)),

				marginBottom(rem(0.1)),

				child('ui-indicator',
					width(px(3)),

					backgroundColor(rgb(
						percentage(100).subtract(percentage(100).multiply(positionIntensity)),
						percentage(100).subtract(percentage(100).multiply(positionIntensity)),
						percentage(100).subtract(percentage(100).multiply(positionIntensity))
					))
				),

				child('ui-legal-entity',
					flexGrow(1),

					overflow('hidden'),
					textOverflow('ellipsis'),
					whiteSpace('nowrap')
				),

				child('ui-quantity',
					display('inline-block'),

					textAlign('right')
				),

				child('ui-price',
					display('inline-block'),
					width(ch(8)),

					textAlign('right')
				)
			)
		)
	)
)
