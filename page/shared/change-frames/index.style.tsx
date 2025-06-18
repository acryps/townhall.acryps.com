import { child, display, marginBottom, border, px, height, width, percentage, objectFit, imageRendering, backgroundColor, alignItems, justifyContent, rem, padding, position, backgroundImage, linearGradient, turn, colorStop, backgroundSize, backgroundPositionX, milliseconds, bottom, left, opacity, fontSize, Variable, min, vh, top, gap, flexBasis, Length, flexGrow, flexShrink, max, Integer, marginLeft, cursor } from "@acryps/style";
import { pageGutter, pageTextColor } from "../../index.style";

export const frameTime = new Variable<Number>('frame-time');
export const frameMarker = new Variable<Number>('frame-marker');
export const phaseLength = new Variable<Integer>('phase-length');

const frameTic = rem(0.25);
const frameHeight = min(rem(20), vh(50));

export const changeFramesStyle = () => child('ui-change-frames',
	display('block'),
	marginBottom(pageGutter),

	border(px(1), 'solid', 'currentColor'),

	child('canvas',
		height(frameHeight),
		width(percentage(100)),

		objectFit('contain'),
		imageRendering('pixelated'),
		backgroundColor(pageTextColor)
	),

	child('ui-loading',
		display('flex'),
		alignItems('center'),
		justifyContent('center'),

		height(rem(1).add(frameTic).add(frameHeight).add(pageGutter.multiply(3)))
	),

	child('ui-timeline',
		display('block'),
		padding(pageGutter),

		child('ui-phases',
			display('flex'),
			gap(rem(0.75)),

			child('ui-phase',
				position('relative'),
				flexGrow(phaseLength),

				display('flex'),
				height(rem(0.5)),
				marginBottom(rem(0.5).add(frameTic)),

				backgroundColor(pageTextColor),

				child('ui-frame',
					position('absolute'),
					top(frameTic.invert()),
					bottom(frameTic.invert()),
					left(percentage(100).multiply(frameTime)),

					width(px(1)),
					backgroundColor(pageTextColor),
					cursor('pointer')
				)
					.attribute('ui-active',
						marginLeft(rem(-0.1)),
						width(rem(0.2))
					)
			),

			child('ui-elapsed',
				flexShrink(0),

				fontSize(rem(0.8))
			)
		),

		child('ui-references',
			display('flex'),
			justifyContent('space-between'),

			fontSize(rem(0.75))
		)
	)
);
