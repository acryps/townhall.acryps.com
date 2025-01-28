import { aspectRatio, backgroundColor, backgroundImage, backgroundSize, child, colorStop, display, height, hex, imageRendering, inset, linearGradient, marginLeft, marginTop, Number, overflow, percentage, pointerEvents, position, ratio, select, turn, Variable, width, zIndex } from "@acryps/style";

export const mapPixelWidth = new Variable<Number>('map-pixel-width');
export const mapPixelHeight = new Variable<Number>('map-pixel-height');

// like pixel width/height but including the unrounded part
export const mapSubpixelWidth = new Variable<Number>('map-subpixel-width');
export const mapSubpixelHeight = new Variable<Number>('map-subpixel-height');

export const mapOverdraw = 6;

export const subpixelOffsetX = new Variable<Number>('subpixel-offset-x');
export const subpixelOffsetY = new Variable<Number>('subpixel-offset-y');

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
	)
)
