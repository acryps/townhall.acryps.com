import { aspectRatio, background, backgroundColor, blur, bottom, boxShadow, child, color, cursor, display, filter, flexBasis, flexGrow, flexWrap, fontSize, fontWeight, gap, height, hex, imageRendering, inset, insetInline, justifyContent, margin, marginBottom, mixBlendMode, objectFit, opacity, padding, paddingBlock, paddingInline, percentage, position, px, ratio, rem, textAlign, whiteSpace, width } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { collection, collectionItem } from "../../shared/collection.style";
import { navigationBackgroundColor, pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { card } from "../../shared/card.style";
import { buttonStyle } from "../../shared/index.style";
import { microFont } from "../../assets/font/index.style";

export const mapStartStyle = () => child('ui-map-start',
	child('ui-minimap',
		position('fixed'),
		inset(rem(0)),

		cursor('crosshair'),

		child('img',
			width(percentage(100)),
			height(percentage(100)),

			objectFit('cover'),
			imageRendering('pixelated')
		),

		child('canvas',
			position('absolute'),
			inset(0),
			width(percentage(100)),
			height(percentage(100)),

			objectFit('cover'),

			filter(blur(px(2))),
			opacity(0.75)
		),

		child('ui-cursor',
			position('absolute'),

			paddingInline(rem(0.5)),
			paddingBlock(rem(0.25)),
			margin(px(5)),
			whiteSpace('pre'),

			opacity(0.95),

			color(pageTextColor),
			backgroundColor(pageBackgroundColor),
			boxShadow(hex('0004'), 0, rem(0.25), rem(0.5)),

			child('ui-borough',
				display('block'),
				marginBottom(rem(0.25))
			)
				.empty(display('none')),

			child('ui-position',
				display('block'),

				microFont,
				fontSize(rem(0.75))
			)
		)
	),

	child('ui-actions',
		position('fixed'),
		insetInline(0),
		bottom(0),

		display('flex'),
		flexWrap('wrap'),
		justifyContent('center'),
		gap(pageGutter),
		padding(pageGutter),

		color(pageTextColor),
		backgroundColor(navigationBackgroundColor),

		child('ui-action',
			buttonStyle()
		)
	)
);
