import { aspectRatio, backgroundColor, border, bottom, child, display, fontSize, fontWeight, height, inset, left, marginBottom, marginInline, marginTop, overflow, paddingLeft, paddingRight, percentage, position, px, ratio, rem, right, vh, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageBackgroundColor, pageGutter } from "../index.style";
import { card, cardSpacingBlock, cardSpacingInline } from "../shared/card.style";

const bannerWidth = rem(2.5);

export const boroughsStyle = () => child('ui-boroughs',
	boxed(),

	collection(rem(15), pageGutter),

	child('ui-borough',
		collectionItem(),
		card(),

		child('ui-preview',
			display('block'),
			aspectRatio(ratio(4, 3)),
			marginInline(cardSpacingInline.invert()),
			marginTop(cardSpacingBlock.invert()),
			marginBottom(cardSpacingBlock),

			position('relative'),

			backgroundColor(pageBackgroundColor),

			child('ui-map-container',
				position('absolute'),
				inset(0),
				overflow('hidden')
			),

			child('ui-banner',
				position('absolute'),
				right(pageGutter),
				bottom(pageGutter.invert()),

				border(px(1), 'solid', 'currentColor'),
				fontSize(0),

				child('img',
					width(bannerWidth)
				)
			)
		),

		child('ui-detail',
			display('block'),

			child('ui-name',
				display('block'),
				paddingRight(bannerWidth.add(cardSpacingInline)),

				fontWeight('bold')
			)
		)
	)
);
