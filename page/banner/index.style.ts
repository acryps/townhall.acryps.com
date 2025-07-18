import { alignContent, alignItems, border, child, columnGap, display, DistributedJustificationMode, height, hex, imageRendering, justifyContent, marginBottom, maxWidth, min, padding, px, rem, select, style, vh, vw, width } from "@acryps/style";

export const bannerStyle = () => select('ui-banner',
	child('img',
		imageRendering('pixelated')
	)
);

export const headerBannerStyle = (alignment: DistributedJustificationMode = 'center') => child('ui-banner',
	display('flex'),
	justifyContent(alignment),
	marginBottom(rem(1)),

	child('img',
		height(min(vh(20), rem(10))),

		border(px(1), 'solid', hex('000'))
	)
);

export const createBannerStyle = () => child('ui-create-banner',
	display('block'),

	child('ui-banner',
		display('flex'),
		justifyContent('center'),

		child('img',
			width(min(rem(20), vw(50))),

			border(px(1), 'dashed', 'currentColor')
		)
	),

	child('ui-layers',
		display('block'),

		child('ui-layer',
			display('flex'),
			alignItems('center'),
			columnGap(rem(2)),

			child('ui-banner',
				child('img',
					height(rem(5))
				)
			),

			child('select',
				padding(rem(1))
			)
		)
	)
)
