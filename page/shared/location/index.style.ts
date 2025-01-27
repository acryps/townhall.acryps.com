import { child, display, fontSize, lineHeight, em, select, gap, alignSelf } from "@acryps/style";

export const locationMarkerStyle = () => select('ui-location-marker',
	display('flex'),
	lineHeight(1),

	child('ui-x',
		alignSelf('flex-start'),

		fontSize(em(0.8))
	),

	child('ui-marker',
		alignSelf('center')
	),

	child('ui-y',
		alignSelf('flex-end'),

		fontSize(em(0.8))
	)
)
