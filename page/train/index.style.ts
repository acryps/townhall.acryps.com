import { alignItems, backgroundColor, border, borderTop, child, color, ColorValue, cursor, display, Dvi, flexDirection, flexWrap, fontSize, fontWeight, gap, height, insetInline, justifyContent, left, marginBottom, marginInline, marginTop, minWidth, overflow, overflowY, padding, paddingInline, paddingTop, percentage, position, px, rem, right, rotate, rotateX, rotateY, style, textAlign, top, transform, translate, turn, Variable, vh, vw, whiteSpace, width, writingMode } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../index.style";
import { trainRouteStyle } from "./route/index.style";
import { registerTrainRouteStyle } from "./register/index.style";

export const routeColor = new Variable<ColorValue>('route-color');

export const bulletSize = rem(0.75);
export const lineSize = px(2);

export const trainStyle = () => child('ui-trains',
	boxed(),

	trainRouteStyle(),
	registerTrainRouteStyle(),

	child('ui-network-graph',
		display('block'),
		height(vh(70)),
		width(vw(100).subtract(bulletSize).subtract(pageGutter.multiply(2))),
		marginInline(vw(100).subtract(percentage(100)).divide(2).invert()),
		marginBottom(pageGutter),

		position('relative'),
		overflow('hidden'),

		child('canvas',
			height(percentage(100)),
			width(percentage(100).subtract(bulletSize)),
			marginInline(pageGutter.add(bulletSize.divide(2)))
		),

		child('ui-station',
			position('absolute'),

			display('block'),
			transform(
				translate(
					bulletSize.divide(2).invert().add(pageGutter),
					bulletSize.divide(2).invert()
				)
			),

			backgroundColor(pageBackgroundColor),
			border(lineSize, 'solid', pageTextColor),
			cursor('pointer'),

			width(bulletSize.subtract(lineSize.multiply(2))),
			height(bulletSize.subtract(lineSize.multiply(2))),

			child('ui-name',
				position('absolute'),
				left(bulletSize.add(pageGutter)),

				display('block')
			)
		)
	),

	child('ui-train-route',
		display('block'),
		padding(pageGutter),
		marginBottom(pageGutter),

		border(px(1), 'solid', 'currentColor'),

		child('ui-header',
			display('flex'),
			gap(pageGutter),
			marginBottom(rem(1)),

			child('ui-name',
				fontWeight('bold')
			)
		),

		child('ui-description',
			display('block'),
			marginBottom(rem(0.75)),
		),

		child('ui-operator',
			display('block'),
			marginBottom(rem(0.75)),
		),

		child('ui-stops',
			display('block'),
			width(percentage(100)),
			marginInline(pageGutter.invert()),
			paddingInline(pageGutter),
			overflowY('auto'),

			writingMode('sideways-lr'),

			child('ui-stop',
				display('flex'),
				flexDirection('row-reverse'),
				alignItems('center'),
				minWidth(rem(2)),
				paddingTop(bulletSize.add(rem(0.75))),

				position('relative'),

				style(':first-of-type:before',
					left(percentage(50))
				),

				style(':last-of-type:before',
					right(percentage(50))
				),

				child('ui-name',
					display('block'),

					transform(rotate(turn(0.5)))
				),

				child('ui-interchange',
					display('flex'),
					alignItems('center'),
					flexDirection('column'),
					gap(rem(0.5)),
					marginTop(rem(1)),

					fontSize(rem(0.75)),
					textAlign('center'),
					writingMode('horizontal-tb'),

					child('ui-routes',
						display('flex'),
						flexDirection('column'),
						gap(rem(0.25))
					)
				)
			)
				.before('',
					position('absolute'),
					insetInline(0),
					top(bulletSize.divide(2).subtract(lineSize.divide(2))),

					borderTop(lineSize, 'solid', 'currentColor'),
				)
				.after('',
					position('absolute'),
					top(0),
					left(percentage(50).subtract(bulletSize.divide(2))),

					width(bulletSize.subtract(lineSize.multiply(2))),
					height(bulletSize.subtract(lineSize.multiply(2))),

					border(lineSize, 'solid', 'currentColor'),
					backgroundColor(pageBackgroundColor)
				)
		)
	)
);
