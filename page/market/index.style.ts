import { alignItems, backgroundColor, border, borderTop, ch, child, color, cursor, display, flexGrow, flexShrink, flexWrap, fontSize, fontWeight, gap, height, justifyContent, Keyframes, margin, marginBottom, marginInline, marginLeft, marginRight, marginTop, maxHeight, minWidth, objectFit, padding, paddingBlock, PaddingBlockStyleProperty, paddingInline, percentage, pointerEvents, px, rem, seconds, textAlign, textDecoration, textDecorationLine, vh, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../index.style";
import { card } from "../shared/card.style";
import { topicHeaderStyle } from "../shared/topic-header.style";
import { boxed } from "../shared/boxed.style";
import { PageComponent } from "../page";

export const marketStyle = () => child('ui-market',
	display('block'),
	boxed(),

	topicHeaderStyle(),

	changeAnimation,

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2))
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(1)),
	),

	child('ui-sort',
		display('flex'),
		flexWrap('wrap'),
		gap(pageGutter.divide(2)),

		marginBottom(pageGutter),

		child('ui-sorter',
			paddingInline(pageGutter.divide(2)),
			paddingBlock(pageGutter.divide(4)),

			border(px(1), 'solid', pageTextColor),
			cursor('pointer')
		)
			.attribute('ui-active',
				color(pageBackgroundColor),
				backgroundColor(pageTextColor)
			)
	),

	child('ui-commodities',
		collection(rem(15), pageGutter),

		child('ui-commodity',
			collectionItem(),

			display('flex'),
			justifyContent('space-between'),
			gap(pageGutter),

			marginBottom(pageGutter.divide(2)),

			child('ui-detail',
				flexShrink(1),
				flexGrow(1),

				display('block'),

				child('ui-header',
					display('block'),

					child('ui-name',
						display('inline'),
						marginRight(rem(0.5)),

						fontWeight('bold')
					),

					child('ui-unit',
						display('inline')
					)
				),

				child('ui-volume',
					display('block'),

					fontSize(rem(0.8))
				)
			),

			child('ui-price',
				display('block'),

				fontSize(rem(0.8)),

				child('*',
					display('flex'),
					justifyContent('flex-end'),
					gap(rem(0.5)),

					child('ui-median',
						width(ch(8)),

						textAlign('right')
					),

					child('ui-spread',
						width(ch(8)),
						textAlign('right')
					)
				)
			)
		)
			.attribute('ui-changed',
				changeAnimation.animate(seconds(0.2), 'linear')
			)
	)
);

const changeAnimation = new Keyframes('ticker-change')
	.addKeyframe('from', backgroundColor('currentColor'))
	.addKeyframe('to', backgroundColor('transparent'))
