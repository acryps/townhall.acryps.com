import { alignContent, alignItems, animationIterationCount, aspectRatio, backdropFilter, background, backgroundColor, border, bottom, boxShadow, brightness, child, color, ColorValue, contrast, cursor, display, flexDirection, flexWrap, fontSize, fontStyle, fontWeight, gap, grayscale, height, hex, Hex, inset, insetInline, invert, justifyContent, Keyframe, Keyframes, left, lineHeight, margin, marginBlock, marginBottom, marginInline, marginRight, marginTop, maxHeight, Mm, objectFit, overflow, padding, paddingBlock, paddingInline, percentage, position, px, ratio, rem, seconds, style, textAlign, top, transform, translateX, Variable, vh, whiteSpace, width, zIndex } from "@acryps/style";
import { buttonStyle } from "../shared/index.style";
import { collection, collectionItem } from "../shared/collection.style";
import { card } from "../shared/card.style";
import { neutralColor, pageBackgroundColor, pageGutter, pageTextColor } from "../index.style";
import { headlineFont } from "../assets/font/index.style";

export const homeStyle = () => child('ui-home',
	display('block'),

	child('ui-newsticker',
		display('block'),
		height(rem(1).add(pageGutter)),
		marginInline(pageGutter.invert()),
		marginTop(pageGutter.invert()),
		overflow('hidden'),

		position('relative'),
		backgroundColor(neutralColor),

		child('ui-scroller',
			position('absolute'),
			top(0),

			newstickerScrollerAnimation.animate(seconds(25), 'linear'),
			animationIterationCount('infinite'),

			display('flex'),

			lineHeight(1),
			whiteSpace('nowrap'),

			child('ui-article',
				display('flex'),
				alignItems('center'),
				gap(rem(0.75)),

				paddingBlock(pageGutter.divide(2)),
				paddingInline(pageGutter),
				cursor('pointer'),

				child('ui-title',
					headlineFont
				),

				child('ui-date',
					fontSize(rem(0.6))
				)
			)
		),
	),

	child('ui-impression',
		display('block'),
		width(percentage(100).add(pageGutter).add(pageGutter)),
		maxHeight(vh(50)),
		aspectRatio(ratio(16, 9)),
		marginInline(pageGutter.invert()),
		marginBottom(rem(1)),

		position('relative'),
		backgroundColor(hex('000')),

		child('img',
			position('absolute'),
			inset(0),

			width(percentage(100)),
			height(percentage(100)),

			objectFit('cover')
		)
			.attribute('ui-next', zIndex(1))
			.attribute('ui-last', zIndex(2))
			.attribute('ui-current', zIndex(3)),

		child('ui-name',
			position('absolute'),
			left(pageGutter.divide(2)),
			bottom(pageGutter.divide(2)),
			padding(pageGutter.divide(2)),
			marginRight(pageGutter.divide(2)),

			backdropFilter(grayscale(1), brightness(1.5), contrast(0.2)),
			lineHeight(1),
			fontSize(rem(0.75)),

			color(hex('fff'))
		)
	),

	child('ui-title',
		display('block'),

		fontSize(rem(3))
	),

	child('ui-time',
		display('block'),
		marginBottom(rem(1)),
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(1))
	),

	child('ui-online',
		card(),
		marginBottom(rem(2)),

		backgroundColor(hex('eee')),

		child('ui-empty',
			display('block'),
			marginTop(rem(1)),

			fontStyle('italic')
		),

		child('ui-players',
			display('block'),

			child('ui-player',
				display('block'),
				marginTop(rem(1))
			)
		)
	),

	child('ui-topics',
		collection(rem(10), rem(1)),
		marginBottom(rem(2)),

		textAlign('center'),

		child('ui-topic',
			collectionItem(),
			card(),

			display('flex'),
			flexDirection('column'),
			alignItems('center'),

			child('ui-icon',
				fontSize(rem(5))
			),

			child('ui-name',
				display('block'),
				marginBlock(rem(0.5)),

				fontWeight('bold')
			),

			child('ui-description',
				display('block'),

				fontSize(rem(0.8))
			)
		)
	),

	child('ui-connection',
		card(),
		marginBottom(rem(2)),

		child('ui-host',
			fontWeight('bold')
		),

		child('ui-platform',
			fontWeight('bold')
		),

		child('ui-hint',
			display('block'),

			fontSize(rem(0.6))
		)
	),

	child('ui-section',
		display('block'),
		marginBottom(rem(2)),

		child('ui-title',
			display('block'),
			marginBottom(rem(1)),

			fontSize(rem(1.75))
		),

		child('ui-description',
			display('block'),
			marginBottom(rem(1)),
		),

		child('ui-boroughs',
			collection(rem(20), rem(1)),

			child('ui-borough',
				collectionItem(),
				card(),

				display('flex'),
				alignItems('center'),

				child('ui-banner',
					marginRight(rem(1)),
					fontSize(0),

					child('img',
						height(rem(3)),

						border(px(1), 'solid', hex('000'))
					)
				),

				child('ui-detail',
					child('ui-name',
						display('block'),

						fontWeight('bold')
					),

					child('ui-incorporation',
						display('block'),

						fontSize(rem(0.8))
					),

					child('ui-area',
						display('block'),

						fontSize(rem(0.8))
					)
				)
			)
		)
	)
)

export const boroughColor = new Variable<ColorValue>('borough-color');

const newstickerScrollerAnimation = new Keyframes('newsticker-scroller')
	.addKeyframe('from', transform(translateX(percentage(0))))
	.addKeyframe('to', transform(translateX(percentage(-50))));
