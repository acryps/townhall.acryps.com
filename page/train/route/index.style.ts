import { alignItems, backgroundColor, border, borderLeft, borderLeftColor, borderLeftStyle, bottom, ch, child, display, flexDirection, flexWrap, fontSize, fontWeight, gap, height, Hex, insetBlock, left, marginBlock, marginBottom, marginInline, marginTop, paddingBlock, paddingLeft, paddingRight, percentage, position, rem, select, style, top, vh, width, zIndex } from "@acryps/style";
import { infoColor, neutralColor, pageBackgroundColor, pageGutter } from "../../index.style";
import { bulletSize, lineSize } from "../index.style";
import { buttonStyle } from "../../shared/index.style";
import { fieldStyle } from "../../shared/field.style";

export const trainRouteStyle = () => child('ui-route',
	child('ui-header',
		display('flex'),
		alignItems('center'),
		gap(rem(1)),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-operator',
		display('block'),
		marginBottom(pageGutter),
	),

	child('ui-map-container',
		height(vh(25)),
		marginInline(pageGutter.invert()),

		position('sticky'),
		top(0),
		zIndex(100)
	),

	child('ui-detail',
		child('ui-field',
			display('flex'),
			flexDirection('column'),
			marginBottom(rem(1)),

			child('label',
				display('block'),
				marginBottom(rem(0.25))
			),

			child('input',
				fieldStyle()
			),

			child('textarea',
				fieldStyle()
			)
		),
	),

	child('ui-route',
		display('block'),

		child('ui-segments',
			display('block'),

			child('ui-segment',
				display('block'),
				position('relative'),
				marginInline(pageGutter.invert()),
				paddingBlock(pageGutter.divide(2)),
				paddingLeft(bulletSize.add(pageGutter).add(pageGutter)),
				paddingRight(pageGutter),

				style(':first-of-type:before',
					top(percentage(50))
				),

				style(':last-of-type:before',
					bottom(percentage(50))
				),

				style(':not(:has(ui-station)):after',
					display('none')
				),

				style(':not(:has(ui-station)):before',
					borderLeftStyle('dashed')
				),

				child('ui-station',
					display('flex'),
					gap(ch(1)),

					child('ui-name',
						fontWeight('bold')
					)
				),

				child('ui-interchange',
					display('flex'),
					gap(rem(0.75)),
					marginTop(rem(0.25)),

					child('ui-routes',
						display('flex'),
						gap(rem(0.5))
					)
				),

				child('ui-actions',
					display('flex'),
					flexWrap('wrap'),
					gap(pageGutter),
					marginTop(pageGutter),

					child('ui-action',
						buttonStyle()
					)
				)
			)
				.before('',
					position('absolute'),
					left(bulletSize.divide(2).subtract(lineSize.divide(2)).add(pageGutter)),
					insetBlock(0),

					borderLeft(lineSize, 'solid', 'currentColor')
				)

				.after('',
					position('absolute'),
					left(pageGutter),
					top(percentage(50).subtract(bulletSize.divide(2))),

					width(bulletSize.subtract(lineSize.multiply(2))),
					height(bulletSize.subtract(lineSize.multiply(2))),

					border(lineSize, 'solid', 'currentColor'),
					backgroundColor(pageBackgroundColor)
				)

				.attribute('ui-active',
					backgroundColor(neutralColor)
				)
		),

		child('ui-action',
			buttonStyle(),

			marginBlock(pageGutter.divide(2))
		)
	)
);
