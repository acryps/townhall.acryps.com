import { alignContent, alignItems, child, columnGap, display, height, imageRendering, justifyContent, maxWidth, min, padding, rem, select, style, vw, width } from "@acryps/style";

export const bannerStyle = () => select('ui-banner',
	child('canvas',
		imageRendering('pixelated')
	)
);

export const createBannerStyle = () => child('ui-create-banner',
	display('block'),

	child('ui-banner',
		display('flex'),
		justifyContent('center'),

		child('canvas',
			width(min(rem(20), vw(50)))
		)
	),

	child('ui-layers',
		display('block'),

		child('ui-layer',
			display('flex'),
			alignItems('center'),
			columnGap(rem(2)),

			child('ui-banner',
				child('canvas',
					height(rem(5))
				)
			),

			child('select',
				padding(rem(1))
			)
		)
	)
)
