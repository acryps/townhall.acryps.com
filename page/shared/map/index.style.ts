import { alignItems, aspectRatio, backgroundColor, backgroundImage, backgroundSize, child, color, colorStop, display, fontSize, height, hex, imageRendering, inset, justifyContent, left, linearGradient, marginLeft, marginTop, Number, opacity, overflow, padding, paddingBlock, paddingInline, percentage, pointerEvents, position, ratio, rem, Rem, select, textAlign, top, transform, translate, turn, Variable, whiteSpace, width, wordBreak, zIndex } from "@acryps/style";
import { pageBackgroundColor, pageTextColor } from "../../index.style";
import { PageComponent } from "../../page";
import { micro } from "../../assets/font/index.style";

export const mapPixelWidth = new Variable<Number>('map-pixel-width');
export const mapPixelHeight = new Variable<Number>('map-pixel-height');

// like pixel width/height but including the unrounded part
export const mapSubpixelWidth = new Variable<Number>('map-subpixel-width');
export const mapSubpixelHeight = new Variable<Number>('map-subpixel-height');

export const mapOverdraw = 6;

export const subpixelOffsetX = new Variable<Number>('subpixel-offset-x');
export const subpixelOffsetY = new Variable<Number>('subpixel-offset-y');

export const labelX = new Variable<Number>('x');
export const labelY = new Variable<Number>('y');

export const mapPositionX = new Variable<Number>('map-x');
export const mapPositionY = new Variable<Number>('map-y');

const blankBackground = hex('0001');

export const mapStyle = () => select('ui-map-container',
	display('block'),
	overflow('hidden'),

	position('relative'),

	child('canvas',
		position('absolute'),

		imageRendering('pixelated'),
		backgroundImage(
			linearGradient(turn(0.25),
				colorStop(percentage(0), blankBackground),
				colorStop(percentage(50), blankBackground),
				colorStop(percentage(50), 'transparent'),
				colorStop(percentage(100), 'transparent')
			),
			linearGradient(turn(0),
				colorStop(percentage(0), blankBackground),
				colorStop(percentage(50), blankBackground),
				colorStop(percentage(50), 'transparent'),
				colorStop(percentage(100), 'transparent')
			)
		),
		backgroundSize([
			percentage(100).divide(mapPixelWidth).multiply(2),
			percentage(100).divide(mapPixelHeight).multiply(2)
		])
	),

	child('ui-labels',
		display('block'),
		position('relative'),

		child('ui-label',
			position('absolute'),
			left(labelX.subtract(mapPositionX).multiply(percentage(100).divide(mapSubpixelWidth))),
			top(labelY.subtract(mapPositionY).multiply(percentage(100).divide(mapSubpixelHeight))),

			paddingInline(rem(0.25)),
			paddingBlock(rem(0.125)),
			whiteSpace('pre'),

			transform(translate(percentage(-50))),

			micro,
			fontSize(rem(0.5)),
			opacity(0.95),
			textAlign('center'),

			color(pageTextColor),
			backgroundColor(pageBackgroundColor)
		)
	)
)
