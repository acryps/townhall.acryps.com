import { alignItems, backgroundColor, borderTop, ch, child, cursor, display, flexShrink, fontSize, fontWeight, gap, height, justifyContent, Keyframes, margin, marginBottom, marginInline, marginLeft, marginTop, maxHeight, minWidth, objectFit, percentage, pointerEvents, rem, seconds, textAlign, textDecoration, textDecorationLine, vh, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageGutter } from "../index.style";
import { card } from "../shared/card.style";
import { topicHeaderStyle } from "../shared/topic-header.style";
import { boxed } from "../shared/boxed.style";

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

	child('ui-commodities',
		display('block'),
		marginTop(pageGutter),

		child('ui-commodity',
			display('flex'),
			justifyContent('space-between'),
			gap(pageGutter),

			marginBottom(pageGutter.divide(2)),

			child('ui-name',
				flexShrink(1),

				display('block'),

				fontWeight('bold')
			),

			child('ui-price',
				display('block'),
				fontSize(rem(0.8)),

				child('*',
					display('flex'),
					justifyContent('flex-end'),
					gap(rem(0.5)),

					child('ui-range',
						display('flex'),
						gap(rem(0.5)),

						child('ui-median',
							width(ch(6)),

							fontWeight('bold'),
							textAlign('right')
						),

						child('ui-spread',
							display('flex'),
							gap(rem(0.25)),

							textAlign('right'),

							child('ui-low', width(ch(4))),
							child('ui-high', width(ch(4)))
						),

						child('ui-volume',
							width(ch(6)),

							fontWeight('bold'),
							textAlign('right')
						),
					)
				)
			)
		)
			.attribute('ui-changed',
				changeAnimation.animate(seconds(0.2), 'linear')
			)

			.attribute('ui-stale',
				child('ui-price',
					display('none')
				)
			)
	)
);

const changeAnimation = new Keyframes('ticker-change')
	.addKeyframe('from', backgroundColor('currentColor'))
	.addKeyframe('to', backgroundColor('transparent'))
