import { borderBottom, child, display, flexDirection, fontSize, fontWeight, imageRendering, lineHeight, marginBottom, marginInline, marginTop, maxHeight, maxWidth, objectFit, overflow, paddingLeft, paddingRight, percentage, px, Px, rem, textAlign, textOverflow, vh, whiteSpace, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { card } from "../shared/card.style";
import { boxed } from "../shared/boxed.style";

const bodyLineHeight = 1.3;

export const newsStyle = () => child('ui-news',
	display('block'),

	child('ui-publications',
		collection(rem(10), rem(1)),
		marginBottom(rem(2)),

		child('ui-publication',
			collectionItem(),
			card()
		)
	),

	child('ui-articles',
		child('ui-block'),

		child('ui-date',
			display('block'),
			marginTop(rem(2)),
			marginBottom(rem(0.5))
		),

		child('ui-article',
			card(),

			marginBottom(rem(1)),

			child('ui-title',
				display('block'),
				marginBottom(rem(0.5)),

				fontWeight('bold')
			),

			child('ui-body',
				display('block'),
				maxHeight(rem(3).multiply(bodyLineHeight)),

				overflow('hidden'),
				textOverflow('ellipsis'),
				lineHeight(bodyLineHeight)
			),

			child('ui-publication',
				display('block'),
				marginTop(rem(0.5)),

				fontSize(rem(0.8))
			)
		)
	)
)

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
