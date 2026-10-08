import { aspectRatio, backgroundColor, border, bottom, child, cursor, display, fontSize, fontWeight, height, inset, justifyContent, left, marginBlock, marginBottom, marginInline, marginTop, overflow, padding, paddingBlock, paddingInline, paddingLeft, paddingRight, percentage, position, px, ratio, rem, right, vh, width, zIndex } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageBackgroundColor, pageGutter } from "../index.style";
import { card, cardSpacingBlock, cardSpacingInline } from "../shared/card.style";

const bannerWidth = rem(2.5);

export const boroughsStyle = () => child('ui-boroughs',
	boxed(),

	child('ui-districts',
		display('block'),

		child('ui-district',
			display('block'),

			child('ui-header',
				display('block'),
				paddingBlock(pageGutter.divide(2)),

				cursor('pointer'),

				child('ui-name',
					display('block'),

					fontWeight('bold')
				)
			),

			child('ui-boroughs',
				collection(rem(15), pageGutter),
				marginBottom(pageGutter),

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
							zIndex(0),

							overflow('hidden')
						),

						child('ui-banner',
							position('absolute'),
							right(pageGutter),
							bottom(pageGutter.invert()),
							zIndex(1),

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
						),

						child('ui-metrics',
							display('block'),
							marginTop(pageGutter),

							child('ui-metric',
								display('flex'),
								justifyContent('space-between')
							)
						)
					)
				)
			)
		)
	)
);
