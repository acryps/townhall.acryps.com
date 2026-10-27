import { alignItems, backgroundColor, border, borderBottom, child, color, columnGap, display, flexWrap, fontSize, fontWeight, gap, hex, justifyContent, marginBottom, marginLeft, marginTop, opacity, padding, percentage, px, rem, textAlign, textTransform, whiteSpace, width, wordBreak } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { infoColor, negativeColor, pageBackgroundColor, pageGutter, pageTextColor, positiveColor } from "../index.style";

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
			justifyContent('space-between'),
			gap(pageGutter),
			padding(pageGutter),

			borderBottom(px(1), 'dotted', 'currentColor'),

			child('ui-detail',
				display('block'),

				child('ui-name',
					display('block'),

					fontWeight('bold'),
					wordBreak('break-word')
				),

				child('ui-tags',
					display('flex'),
					flexWrap('wrap'),
					gap(pageGutter.divide(2)),

					child('*',
						fontSize(rem(0.75)),
						textTransform('uppercase')
					)
				)
			),

			child('ui-runtime',
				textAlign('right'),
				fontSize(rem(0.75)),
				whiteSpace('nowrap'),

				child('ui-status',
					display('block'),

					fontWeight('bold')
				),

				child('ui-next',
					display('block'),
				),

				child('ui-last',
					display('block')
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
			.attribute('ui-state', 'disabled',
				opacity(0.4)
			)
			.attribute('ui-state', 'running',
				color(pageBackgroundColor),
				backgroundColor(pageTextColor)
			)
			.attribute('ui-state', 'ready',
				backgroundColor(positiveColor)
			)
	)
);
