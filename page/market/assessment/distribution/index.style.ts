import { alignItems, alignSelf, backdropFilter, backgroundColor, backgroundImage, blur, border, borderInline, borderRight, borderTop, borderTopColor, child, colorStop, display, flexGrow, flexShrink, fontSize, fontWeight, gap, height, insetInline, justifyContent, linearGradient, marginBottom, marginInline, Number, paddingTop, percentage, position, px, rem, style, textAlign, top, turn, Variable, width } from "@acryps/style";
import { boxed } from "../../../shared/boxed.style";
import { infoColor, negativeColor, neutralColor, pageBackgroundColor, pageGutter, positiveColor } from "../../../index.style";

export const rangePeak = new Variable<Number>('range-peak');
export const rangeValue = new Variable<Number>('range-value');

const chartHeight = rem(3);

export const residentAsessmentDistributionStyle = () => child('ui-assessment-parameter-distribution',
	boxed(),

	child('ui-title',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-description',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-parameters',
		display('block'),

		child('ui-parameter',
			display('flex'),
			gap(pageGutter),
			justifyContent('space-between'),

			marginBottom(pageGutter),

			child('ui-header',
				flexGrow(1),

				child('ui-prompt',
					display('block'),

					fontWeight('bold')
				)
			),

			child('ui-distribution',
				flexShrink(0),
				alignSelf('stretch'),

				display('flex'),
				justifyContent('space-between'),
				alignItems('flex-end'),
				gap(rem(0.5)),

				width(percentage(40)),
				position('relative'),
				paddingTop(chartHeight.add(pageGutter.divide(2))),

				fontSize(rem(0.6)),

				child('ui-ranges',
					position('absolute'),
					top(0),
					insetInline(0),

					display('flex'),
					alignItems('flex-end'),
					height(chartHeight),

					child('ui-range',
						flexGrow(1),
						marginInline(px(-0.5)),
						height(percentage(100).divide(rangePeak).multiply(rangeValue)),

						backgroundColor(infoColor),
						border(px(1), 'solid', 'currentColor')
					)
				),

				child('ui-high',
					textAlign('right')
				)
			)
		)
	)
);
