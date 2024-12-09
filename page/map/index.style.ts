import { child, height, imageRendering, inset, percentage, position, width } from "@acryps/style";

export const mapStyle = () => child('ui-map',
	position('fixed'),
	inset(0),

	child('ui-map',
		position('fixed'),
		inset(0),

		child('canvas',
			width(percentage(100)),
			height(percentage(100)),

			imageRendering('pixelated')
		)
	)
)
