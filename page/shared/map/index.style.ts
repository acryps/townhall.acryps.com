import { child, display, height, imageRendering, marginLeft, marginTop, Number, overflow, percentage, select, Variable, width } from "@acryps/style";

export const mapPixelWidth = new Variable<Number>('map-pixel-width');
export const mapOverdraw = 2;

export const subpixelOffsetX = new Variable<Number>('subpixel-offset-x');
export const subpixelOffsetY = new Variable<Number>('subpixel-offset-y');

export const mapStyle = () => select('ui-map-container',
	display('block'),
	overflow('hidden'),

	child('canvas',
		width(percentage(100).divide(mapPixelWidth).multiply(mapPixelWidth.add(mapOverdraw))),
		height(percentage(100).divide(mapPixelWidth).multiply(mapPixelWidth.add(mapOverdraw))),

		marginLeft(percentage(100).divide(mapPixelWidth).multiply(subpixelOffsetX).invert()),
		marginTop(percentage(100).divide(mapPixelWidth).multiply(subpixelOffsetY).invert()),

		imageRendering('pixelated')
	)
)
