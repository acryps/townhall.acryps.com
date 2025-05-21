import { backgroundColor, borderBottom, child, display, flexDirection, flexGrow, flexShrink, fontSize, fontWeight, height, hex, insetBlock, marginBottom, marginLeft, marginTop, minWidth, Number, overflow, paddingBottom, percentage, position, px, rem, right, textAlign, Variable, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";

export const chartMaxValue = new Variable<Number>('max-value');
export const chartValue = new Variable<Number>('value');
export const chartDuration = new Variable<Number>('duration');

// duartion of one pixel
const timescale = 1000 * 60;

export const metricsStyle = () => child('ui-metrics',
	boxed(),

	child('ui-metric',
		display('block'),
		paddingBottom(pageGutter),
		marginBottom(pageGutter),

		borderBottom(px(1), 'dashed', 'currentColor'),

		child('ui-header',
			display('flex'),
			marginBottom(pageGutter),

			child('ui-detail',
				flexGrow(1),

				child('ui-name',
					display('block'),
					marginBottom(rem(0.25)),

					fontWeight('bold')
				),

				child('ui-description',
					display('block')
				)
			),

			child('ui-value',
				flexShrink(0),

				textAlign('right'),

				child('ui-current',
					display('block'),

					fontSize(rem(1.25))
				),

				child('ui-peak',
					display('block')
				)
			)
		),

		child('ui-chart',
			display('flex'),
			height(rem(10)),
			marginBottom(pageGutter),

			overflow('hidden'),
			position('relative'),

			child('ui-data',
				position('absolute'),
				insetBlock(0),
				right(0),
				minWidth(percentage(100)),

				display('flex'),
				flexDirection('row-reverse'),

				child('ui-value',
					height(percentage(100).divide(chartMaxValue).multiply(chartValue)),
					width(px(1).multiply(chartDuration).divide(timescale).add(px(1))),
					marginLeft(px(-1)),

					backgroundColor(hex('2031b2'))
				)
			)
		),

		child('ui-time',
			display('block'),
			fontSize(rem(0.75))
		)
	)
);
