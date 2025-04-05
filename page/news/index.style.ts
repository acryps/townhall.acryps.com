import { alignItems, border, borderBottom, child, display, em, Em, flexDirection, fontSize, fontWeight, gap, height, hex, Hex, imageRendering, justifyContent, lineHeight, marginBlock, marginBottom, marginInline, marginTop, maxHeight, maxWidth, min, objectFit, overflow, paddingLeft, paddingRight, percentage, px, Px, rem, scrollSnapType, textAlign, textOverflow, vh, vw, whiteSpace, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { card } from "../shared/card.style";
import { boxed } from "../shared/boxed.style";
import { buttonStyle } from "../shared/index.style";

const bodyLineHeight = 1.3;

export const newsStyle = () => child('ui-news',
	boxed(),

	child('ui-publications',
		collection(rem(15), rem(1)),
		marginBottom(rem(2)),

		child('ui-publication',
			collectionItem(),
			card(),

			display('flex'),
			alignItems('center'),
			gap(rem(1)),

			child('ui-banner',
				fontSize(0),

				child('img',
					height(rem(4))
				)
			),

			child('ui-detail',
				child('ui-name',
					display('block'),
					marginBottom(rem(0.5)),

					fontWeight('bold')
				)
			)
		)
	),

	articleListStyle()
);

export const publicationStyle = () => child('ui-publication',
	boxed(),

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

	child('ui-legal-name',
		display('block'),
		marginBottom(rem(1)),

		textAlign('center')
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(2)),

		whiteSpace('pre-wrap'),
		textAlign('center')
	),

	child('ui-actions',
		display('flex'),
		justifyContent('center'),
		gap(rem(1)),

		child('ui-action',
			buttonStyle()
		)
	),

	articleListStyle()
);

export const articleListStyle = () => child('ui-articles',
	boxed(),

	child('ui-date',
		display('block'),
		marginTop(rem(3)),
		marginBottom(rem(0.5))
	),

	child('ui-article',
		display('flex'),
		gap(rem(1)),
		marginBottom(rem(2)),

		child('ui-detail',
			display('block'),

			child('ui-title',
				display('block'),
				marginBottom(rem(0.5)),

				fontWeight('bold'),
				fontSize(rem(1.25))
			),

			child('ui-body',
				display('block'),
				maxHeight(rem(3).multiply(bodyLineHeight)),

				overflow('hidden'),
				textOverflow('ellipsis'),
				lineHeight(bodyLineHeight)
			),

			child('ui-publication',
				display('flex'),
				alignItems('center'),
				gap(rem(0.5)),
				marginTop(rem(0.5)),

				fontSize(rem(0.8)),

				child('ui-banner',
					fontSize(0),

					child('img',
						height(rem(0.9))
					)
				)
			)
		),

		child('img',
			height(rem(8)),
			maxHeight(percentage(100)),

			objectFit('cover')
		)
	)
);

export const articleStyle = () => child('ui-article',
	boxed(),

	child('ui-title',
		display('block'),
		marginBottom(rem(1.5)),

		textAlign('center'),
		fontSize(rem(2))
	),

	child('ui-detail',
		display('block'),
		marginBottom(rem(1.5)),

		fontSize(rem(0.8)),

		child('ui-publication',
			display('block'),
			marginBottom(rem(0.25))
		),

		child('ui-date',
			display('block'),
			marginBottom(rem(0.5))
		)
	),

	child('ui-body',
		display('block'),
		whiteSpace('pre-wrap')
	),

	child('ui-image',
		display('block'),
		marginTop(rem(1)),

		child('img',
			width(percentage(100)),
			maxHeight(vh(70)),

			objectFit('contain'),
			imageRendering('pixelated')
		),

		child('ui-caption',
			display('block'),
			marginTop(rem(0.25))
		)
	)
)
