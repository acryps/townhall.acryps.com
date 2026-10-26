import { alignItems, border, borderBottom, child, color, columnGap, display, flexWrap, fontSize, fontWeight, hex, marginBottom, marginLeft, marginTop, opacity, padding, percentage, px, rem, textTransform, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { infoColor, negativeColor, pageGutter, positiveColor } from "../index.style";

export const queueStyle = () => child('ui-queue',
	boxed(),

	child('ui-header',
		display('block'),
		fontSize(rem(1.25)),
		fontWeight('bold'),
		marginBottom(pageGutter)
	),

	child('ui-tasks',
		display('block'),

		border(px(1), 'solid', 'currentColor'),

		child('ui-task',
			display('flex'),
			flexWrap('wrap'),
			alignItems('center'),
			columnGap(pageGutter),
			padding(rem(0.6), pageGutter),

			borderBottom(px(1), 'dotted', 'currentColor'),

			child('ui-name',
				fontWeight('bold')
			),

			child('ui-priority',
				fontSize(rem(0.75)),
				textTransform('uppercase'),
				opacity(0.6)
			),

			child('ui-worker',
				fontSize(rem(0.75)),
				textTransform('uppercase'),
				opacity(0.6)
			),

			child('ui-detail',
				display('flex'),
				columnGap(pageGutter),
				marginLeft('auto'),

				fontSize(rem(0.85)),

				child('ui-status',
					fontWeight('bold')
				)
			),

			child('ui-error',
				display('block'),
				width(percentage(100)),
				marginTop(rem(0.3)),

				fontSize(rem(0.8)),
				color(negativeColor)
			)
		)
			.attribute('ui-state', 'disabled', opacity(0.4))
			.attribute('ui-state', 'waiting', opacity(0.7))
			.attribute('ui-state', 'running', color(infoColor))
			.attribute('ui-state', 'ready', color(positiveColor))
	)
);
