import { child, height, imageRendering, inset, marginLeft, marginTop, Number, percentage, position, Variable, width } from "@acryps/style";

export const mapStyle = () => child('ui-map',
	position('fixed'),
	inset(0),

	child('ui-map-container',
		position('fixed'),
		inset(0)
	)
)
