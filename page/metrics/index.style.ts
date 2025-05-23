import { alignItems, backgroundColor, borderBottom, child, display, flexDirection, flexGrow, flexShrink, flexWrap, fontSize, fontWeight, gap, height, hex, insetBlock, marginBottom, marginLeft, marginTop, minWidth, Number, overflow, paddingBottom, percentage, position, px, rem, right, textAlign, Variable, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";
import { fieldStyle } from "../shared/field.style";

export const chartLineColor = hex('000');
export const chartLineWidth = 2;

export const chartFillColor = hex('00f4');

// duartion of one pixel
const timescale = 1000 * 60;

export const metricsStyle = () => child('ui-metrics',
	boxed(),

	child('ui-view-options',
		display('flex'),
		flexWrap('wrap'),
		gap(pageGutter),
		marginBottom(pageGutter.multiply(2)),

		child('select',
			fieldStyle()
		)
	),

	child('ui-metric',
		display('block'),
		paddingBottom(pageGutter),
		marginBottom(pageGutter),

		borderBottom(px(1), 'dashed', 'currentColor'),

		child('ui-header',
			display('flex'),
			gap(pageGutter),
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
					display('block'),

					fontSize(rem(0.8))
				)
			)
		),

		child('ui-chart',
			display('flex'),
			height(rem(10)),
			marginBottom(pageGutter)
		),

		child('ui-time',
			display('block'),
			fontSize(rem(0.75))
		)
	)
);
