import { backgroundColor, ch, child, display, flexBasis, flexGrow, flexShrink, fontSize, fontWeight, gap, height, hsl, justifyContent, lineHeight, marginBottom, marginLeft, marginRight, overflow, percentage, Percentage, px, rem, rgb, textAlign, textOverflow, Variable, whiteSpace, width } from "@acryps/style";
import { pageGutter } from "../../index.style";

export const positionIntensity = new Variable<Number>('intensity');

export const commodityStyle = () => child('ui-commodity',
	display('block'),

	child('ui-title',
		display('block'),
		marginBottom(rem(0.75)),

		fontSize(rem(2))
	),

	child('ui-description',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-positions',
		display('flex'),
		gap(pageGutter),

		overflow('hidden'),

		child('ui-positions',
			width(percentage(50)),

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
					width(ch(8)),

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
