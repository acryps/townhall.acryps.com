import { alignItems, aspectRatio, background, backgroundColor, border, borderBottom, child, color, columnGap, cursor, display, Dvi, flexBasis, flexGrow, flexShrink, fontSize, fontWeight, height, imageRendering, inset, marginBottom, marginInline, marginTop, objectFit, objectPosition, opacity, overflow, padding, paddingBlock, paddingInline, percentage, position, px, ratio, rem, style, textAlign, textDecorationLine, textTransform, transform, translate, whiteSpace, width } from "@acryps/style";
import { negativeColor, pageBackgroundColor, pageGutter, pageTextColor, positiveColor } from "../../index.style";
import { boxed } from "../../shared/boxed.style";

export const relationsStyle = () => child('ui-relation-graph',
	position('fixed'),
	inset(0),

	child('canvas',
		width(percentage(100)),
		height(percentage(100)),

		imageRendering('pixelated')
	),

	child('ui-resident',
		position('fixed'),
		paddingBlock(rem(0.25)),
		paddingInline(rem(0.5)),

		display('block'),
		transform(translate(percentage(-50), percentage(-50))),

		color(pageTextColor),
		backgroundColor(pageBackgroundColor),
		border(px(1), 'solid', pageTextColor),
		whiteSpace('nowrap'),
		cursor('pointer'),

		child('ui-given-name',
			display('block'),

			fontWeight('bold'),
			textAlign('center')
		),

		child('ui-family-name',
			display('block'),

			textAlign('center')
		),

		child('ui-age',
			display('block'),

			textAlign('center'),
			fontSize(rem(0.8))
		)
	)
		.attribute('ui-expanded',
			color(pageBackgroundColor),
			backgroundColor(pageTextColor)
		)
);
