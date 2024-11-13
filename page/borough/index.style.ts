import { child, display, fontSize, height, imageRendering, justifyContent, marginBottom, marginInline, maxWidth, min, paddingInline, percentage, rem, textAlign, vh, whiteSpace, width } from "@acryps/style";

export const boroughStyle = () => child('ui-borough',
	display('block'),
	maxWidth(rem(50)),
	marginInline('auto'),
	paddingInline(rem(1)),

	child('ui-banner',
		display('flex'),
		justifyContent('center'),
		marginBottom(rem(1)),

		child('canvas',
			height(min(vh(20), rem(10)))
		)
	),

	child('ui-name',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2)),
		textAlign('center')
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(2)),

		whiteSpace('pre-wrap')
	),

	child('ui-map-preview',
		child('img',
			imageRendering('pixelated'),
			width(percentage(100))
		)
	)
)
