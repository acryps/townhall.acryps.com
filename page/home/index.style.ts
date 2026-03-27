import { alignContent, alignItems, animationIterationCount, aspectRatio, backdropFilter, background, backgroundColor, border, bottom, boxShadow, brightness, child, color, ColorValue, contrast, cursor, display, flexDirection, flexGrow, flexWrap, fontSize, fontStyle, fontWeight, gap, grayscale, gridTemplateColumns, height, hex, Hex, imageRendering, inset, insetInline, invert, justifyContent, Keyframe, Keyframes, left, lineHeight, margin, marginBlock, marginBottom, marginInline, marginLeft, marginRight, marginTop, maxHeight, minWidth, Mm, objectFit, overflow, padding, paddingBlock, paddingInline, percentage, position, px, Rad, ratio, rem, rotate, seconds, style, textAlign, top, transform, translateX, turn, Variable, vh, whiteSpace, width, zIndex } from "@acryps/style";
import { buttonStyle } from "../shared/index.style";
import { collection, collectionItem } from "../shared/collection.style";
import { card, cardSpacingBlock, cardSpacingInline } from "../shared/card.style";
import { areaColor, areaContrastColor, neutralColor, pageBackgroundColor, pageGutter, pageTextColor } from "../index.style";
import { headlineFont } from "../assets/font/index.style";
import { Banner } from "../../interface/banner";

export const boroughMapBaseColor = hex('999');
export const boroughMapItemColor = pageTextColor;

export const boroughMapCompassDirection = new Variable<Rad>('direction');

const boroughBannerWidth = rem(1.5);

export const homeStyle = () => child('ui-home',
	display('block'),

	child('ui-newsticker',
		display('block'),
		height(rem(1).add(pageGutter)),
		marginInline(pageGutter.invert()),
		marginTop(pageGutter.invert()),
		overflow('hidden'),

		position('relative'),
		color(areaContrastColor),
		backgroundColor(areaColor),

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
			zIndex(10),

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
				card(false),

				display('grid'),
				gridTemplateColumns('min-content', 'auto', 'min-content'),

				child('ui-banner',
					marginBlock(cardSpacingBlock),
					marginLeft(cardSpacingInline),
					fontSize(0),

					child('img',
						width(boroughBannerWidth),

						border(px(1), 'solid', hex('000'))
					)
				),

				child('ui-banner-placeholder',
					width(boroughBannerWidth.add(cardSpacingInline))
				),

				child('ui-detail',
					display('flex'),
					flexDirection('column'),

					marginBlock(cardSpacingBlock),
					marginInline(cardSpacingInline),

					child('ui-name',
						display('block'),

						fontWeight('bold')
					),

					child('ui-tagline',
						display('block'),

						flexGrow(1)
					),

					child('ui-incorporation',
						display('block'),

						fontSize(rem(0.8))
					),

					child('ui-area',
						display('block'),

						fontSize(rem(0.8))
					)
				),

				child('ui-map',
					display('flex'),
					overflow('hidden'),
					position('relative'),
					height(percentage(100)),

					backgroundColor(pageBackgroundColor),

					child('img',
						display('block'),
						height(percentage(100)),

						imageRendering('pixelated')
					),

					child('ui-compass',
						position('absolute'),
						inset(percentage(5)),

						display('flex'),
						alignItems('center'),
						justifyContent('flex-end'),

						transform(rotate(boroughMapCompassDirection)),

						fontSize(rem(0.8)),

						child('ui-icon',
							padding(rem(0.2)),

							color(pageBackgroundColor),
							backgroundColor(pageTextColor)
						)
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
