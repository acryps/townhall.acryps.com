import { alignItems, backgroundColor, child, ColorValue, display, flexWrap, fontWeight, gap, height, marginBottom, percentage, rem, select, Variable, width } from "@acryps/style";
import { pageGutter } from "../../index.style";

export const chartLineWidth = 2;

export const seriesColor = new Variable<ColorValue>('chart-series-color');

export const chartStyle = () => select('ui-chart',
	display('block'),

	child('ui-legend',
		display('flex'),
		flexWrap('wrap'),
		alignItems('center'),
		gap(rem(1)),
		marginBottom(rem(0.5)),

		child('ui-series',
			display('flex'),
			alignItems('center'),
			gap(rem(0.4)),

			child('ui-swatch',
				display('block'),
				width(rem(0.6)),
				height(rem(0.6)),

				backgroundColor(seriesColor)
			),

			child('ui-value',
				fontWeight('bold')
			)
		)
	),

	child('ui-canvas',
		display('block'),
		height(rem(10)),

		child('canvas',
			width(percentage(100)),
			height(percentage(100))
		)
	)
);
