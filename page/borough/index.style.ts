import { aspectRatio, border, child, display, fontSize, height, hex, imageRendering, justifyContent, marginBottom, marginInline, maxWidth, min, paddingInline, percentage, px, ratio, rem, textAlign, vh, whiteSpace, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { bannerStyle, headerBannerStyle } from "../banner/index.style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageGutter } from "../index.style";

export const boroughStyle = () => child('ui-borough',
	boxed(),
	paddingInline(rem(1)),

	headerBannerStyle(),

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

	child('ui-metrics',
		collection(rem(10), pageGutter),
		marginBottom(pageGutter),

		child('ui-metric',
			collectionItem(),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.25))
			),

			child('ui-value',
				display('block'),

				fontSize(rem(1.5))
			)
		)
	),

	child('ui-map-container',
		width(percentage(100)),
		aspectRatio(ratio(1, 1))
	)
)
