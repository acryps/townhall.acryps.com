import { alignItems, alignSelf, animationDelay, animationIterationCount, aspectRatio, backgroundColor, border, borderTop, ch, child, color, cursor, display, flexGrow, flexShrink, flexWrap, fontSize, fontWeight, gap, height, imageRendering, justifyContent, Keyframes, margin, marginBottom, marginInline, marginLeft, marginRight, marginTop, maxHeight, minWidth, objectFit, objectPosition, outline, overflow, overflowWrap, padding, paddingBlock, PaddingBlockStyleProperty, paddingBottom, paddingInline, paddingLeft, percentage, pointerEvents, px, ratio, rem, seconds, textAlign, textDecoration, textDecorationLine, textTransform, transform, translateX, Variable, vh, whiteSpace, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../index.style";
import { card } from "../shared/card.style";
import { topicHeaderStyle } from "../shared/topic-header.style";
import { boxed } from "../shared/boxed.style";
import { PageComponent } from "../page";
import { inputStyle } from "../shared/field.style";
import { commodityStyle } from "./commodity/index.style";
import { marketEntityStyle } from "./entity/index.style";
import { residentAsessmentDistributionStyle } from "./assessment/distribution/index.style";
import { microFont } from "../assets/font/index.style";
import { cycleStyle } from "./cycle/index.style";

export const marketStyle = () => child('ui-market',
	display('block'),

	topicHeaderStyle(),

	commodityStyle(),
	marketEntityStyle(),
	cycleStyle(),
	residentAsessmentDistributionStyle(),

	changeAnimation,

	child('ui-symbols',
		display('block'),
		margin(pageGutter.invert()),
		marginBottom(pageGutter),

		color(pageBackgroundColor),
		backgroundColor(pageTextColor),

		child('canvas',
			width(percentage(100)),
			height(rem(1.5)),

			imageRendering('pixelated')
		)
	),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2))
	),

	child('ui-current-cycle',
		card(),

		display('flex'),
		gap(pageGutter),
		marginBottom(pageGutter),

		cursor('pointer'),

		child('ui-state',
			textTransform('uppercase')
		),

		child('ui-detail',
			display('block'),
			flexGrow(1),

			child('ui-identifier',
				fontWeight('bold')
			),

			child('ui-opened', display('block')),
			child('ui-closed', display('block'))
		),

		child('ui-fear-and-greed',
			display('block'),
			alignSelf('center'),

			textAlign('center'),

			child('ui-value',
				display('block'),

				fontSize(rem(1.2))
			),

			child('ui-name',
				display('block'),

				fontSize(rem(0.8))
			)
		)
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(1)),
	),

	child('ui-search',
		display('flex'),
		marginBottom(pageGutter.divide(2)),

		child('input',
			inputStyle(),

			width(percentage(100))
		)
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
		collection(rem(20), pageGutter.divide(2)),

		child('ui-commodity',
			collectionItem(),
			alignSelf('flex-start'),

			display('flex'),
			justifyContent('space-between'),
			gap(pageGutter),

			padding(pageGutter.divide(2)),

			cursor('pointer'),

			child('img',
				flexShrink(1),
				width(rem(2)),
				aspectRatio(ratio(1, 1)),

				objectFit('contain'),
				objectPosition('top')
			),

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

			.attribute('ui-highlight',
				outline(px(1), 'solid', 'currentColor')
			)

			.attribute('ui-hidden',
				display('none')
			)
	)
);

const changeAnimation = new Keyframes('ticker-change')
	.addKeyframe('from', backgroundColor('currentColor'))
	.addKeyframe('to', backgroundColor('transparent'))
