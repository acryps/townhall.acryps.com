import { border, child, display, fontSize, height, hex, imageRendering, justifyContent, marginBottom, marginInline, maxWidth, min, paddingInline, percentage, px, rem, textAlign, vh, whiteSpace, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";

export const boroughStyle = () => child('ui-borough',
	boxed(),
	paddingInline(rem(1)),

	child('ui-banner',
		display('flex'),
		justifyContent('center'),
		marginBottom(rem(1)),

		child('img',
			height(min(vh(20), rem(10))),

			border(px(1), 'solid', hex('000'))
		)
	),

	child('ui-name',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2)),
		textAlign('center')
	),

	child('ui-incorporation',
		display('block'),
		marginBottom(rem(1)),

		textAlign('center')
	),

	child('ui-district',
		display('block'),
		marginBottom(rem(1)),

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
