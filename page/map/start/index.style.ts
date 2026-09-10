import { alignItems, alignSelf, aspectRatio, background, backgroundColor, blur, border, borderBottom, bottom, boxShadow, child, color, cursor, display, filter, flexBasis, flexDirection, flexGrow, flexWrap, fontSize, fontWeight, fr, gap, gridTemplateColumns, height, hex, imageRendering, inset, insetInline, justifyContent, lineHeight, margin, marginBottom, minMax, minWidth, mixBlendMode, Number, objectFit, objectPosition, opacity, overflow, overflowWrap, padding, paddingBlock, paddingBottom, paddingInline, paddingTop, percentage, position, px, ratio, rem, repeat, textAlign, Variable, vh, whiteSpace, width } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { collection, collectionItem } from "../../shared/collection.style";
import { navigationBackgroundColor, pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { card } from "../../shared/card.style";
import { buttonStyle } from "../../shared/index.style";
import { microFont } from "../../assets/font/index.style";
import { tabsStyle } from "../../shared/tabs/index.style";

export const mapStartStyle = () => child('ui-map-start',
	display('flex'),
	flexDirection('column'),

	child('ui-actions',
		display('flex'),
		flexWrap('wrap'),
		justifyContent('center'),
		gap(pageGutter),
		paddingBottom(pageGutter),

		child('ui-action',
			buttonStyle()
		)
	),

	tabsStyle(
		child('ui-cities',
			collection(rem(20), pageGutter),

			flexGrow(1),
			margin(px(2)),

			child('ui-city',
				card(false),

				display('flex'),
				flexDirection('column'),

				collectionItem(),
				overflow('hidden'),

				child('img',
					width(percentage(100)),

					objectFit('cover')
				),

				child('ui-label',
					display('flex'),
					justifyContent('space-between'),
					alignItems('flex-start'),

					padding(pageGutter),
					paddingTop(pageGutter.divide(2)),
					paddingBottom(rem(0.25)),

					child('ui-name',
						fontWeight('bold')
					),

					child('ui-location',
						microFont,
						fontSize(rem(0.6))
					)
				),

				child('ui-detail',
					display('flex'),
					gap(rem(1)),
					flexGrow(1),

					padding(pageGutter),
					paddingTop(0),

					child('ui-description',
						display('block'),
						flexGrow(1)
					),

					child('ui-icon',
						alignSelf('flex-end'),

						fontSize(rem(2))
					)
				)
			)
		),

		child('ui-players',
			display('block'),

			border(px(1), 'solid', 'currentColor'),

			child('ui-player',
				display('flex'),
				alignItems('center'),
				gap(pageGutter),
				padding(pageGutter),

				borderBottom(px(1), 'dotted', 'currentColor'),

				child('img',
					height(rem(2)),
					aspectRatio(ratio(1, 1)),

					imageRendering('pixelated')
				),

				child('ui-label',
					display('block'),

					child('ui-name',
						display('block'),

						fontWeight('bold')
					)
				)
			)
		)
	)
);
