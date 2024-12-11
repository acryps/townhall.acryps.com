import { child, height, imageRendering, inset, marginLeft, marginTop, Number, percentage, position, Variable, width } from "@acryps/style";

export const mapPixelWidth = new Variable<Number>('map-pixel-width');
export const mapOverdraw = 2;

export const subpixelOffsetX = new Variable<Number>('subpixel-offset-x');
export const subpixelOffsetY = new Variable<Number>('subpixel-offset-y');

export const mapStyle = () => child('ui-map',
	position('fixed'),
	inset(0),

	child('ui-map',
		position('fixed'),
		inset(0),

		child('canvas',
			width(percentage(100).divide(mapPixelWidth).multiply(mapPixelWidth.add(mapOverdraw))),
			height(percentage(100).divide(mapPixelWidth).multiply(mapPixelWidth.add(mapOverdraw))),

			marginLeft(percentage(100).divide(mapPixelWidth).multiply(subpixelOffsetX).invert()),
			marginTop(percentage(100).divide(mapPixelWidth).multiply(subpixelOffsetY).invert()),

			imageRendering('pixelated')
		)
	)
)
