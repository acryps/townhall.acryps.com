import { alignItems, border, borderBottom, ch, child, display, Dvi, em, Em, flexDirection, flexWrap, fontSize, fontWeight, gap, height, hex, Hex, imageRendering, justifyContent, lineHeight, marginBlock, marginBottom, marginInline, marginRight, marginTop, maxHeight, maxWidth, min, objectFit, overflow, overflowY, paddingLeft, paddingRight, percentage, px, Px, rem, scrollSnapType, textAlign, textOverflow, vh, vw, whiteSpace, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { card } from "../shared/card.style";
import { boxed } from "../shared/boxed.style";
import { buttonStyle } from "../shared/index.style";
import { headlineFont } from "../assets/font/index.style";
import { headerBannerStyle } from "../banner/index.style";
import { pageGutter } from "../index.style";

const bodyLineHeight = 1.3;

export const newsStyle = () => child('ui-news',
	boxed(),

	child('ui-publications',
		display('flex'),
		gap(pageGutter),
		marginBottom(pageGutter.multiply(2)),

		overflowY('auto'),

		child('ui-publication',
			display('flex'),
			border(px(1), 'solid', 'currentColor'),

			child('ui-banner',
				fontSize(0),

				child('img',
					height(rem(4))
				)
			)
		)
	),

	articleListStyle()
);

export const publicationStyle = () => child('ui-publication',
	boxed(),

	headerBannerStyle(),

	child('ui-name',
		display('block'),
		marginBottom(rem(1)),

		headlineFont,
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
		marginBottom(pageGutter),

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

				headlineFont,
				fontSize(rem(1.75))
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

				child('ui-oracle',
					display('flex'),
					gap(ch(0.5)),
					alignItems('center'),

					marginRight(rem(1))
				),

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
