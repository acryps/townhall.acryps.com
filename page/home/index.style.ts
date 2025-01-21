import { alignContent, alignItems, aspectRatio, backdropFilter, backgroundColor, border, bottom, boxShadow, brightness, child, color, ColorValue, contrast, display, flexDirection, flexWrap, fontSize, fontStyle, fontWeight, gap, grayscale, height, hex, Hex, inset, insetInline, invert, justifyContent, left, lineHeight, margin, marginBlock, marginBottom, marginInline, marginRight, marginTop, maxHeight, objectFit, padding, percentage, position, px, ratio, rem, style, textAlign, Variable, vh, width } from "@acryps/style";
import { buttonStyle } from "../shared/index.style";
import { collection, collectionItem } from "../shared/collection.style";
import { card } from "../shared/card.style";
import { pageGutter } from "../index.style";

export const homeStyle = () => child('ui-home',
	display('block'),

	child('ui-impression',
		display('block'),
		width(percentage(100).add(pageGutter).add(pageGutter)),
		maxHeight(vh(50)),
		aspectRatio(ratio(16, 9)),
		margin(pageGutter.invert()),
		marginBottom(rem(1)),

		position('relative'),

		child('img',
			position('absolute'),
			inset(0),

			width(percentage(100)),
			height(percentage(100)),

			objectFit('cover')
		),

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
