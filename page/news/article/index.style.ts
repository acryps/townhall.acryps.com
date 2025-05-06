import { child, display, marginBottom, rem, fontSize, whiteSpace, marginTop, width, percentage, maxHeight, vh, objectFit, imageRendering, scrollSnapType, overflowX, height, backgroundColor, gap, color, marginInline, paddingInline, flexShrink, overflow, flexGrow, scrollSnapAlign, flexDirection, paddingBlock, outline, px, alignSelf, scrollbarWidth, vw, Hex, position, inset, zIndex, background, padding, hex, cursor, min } from "@acryps/style";
import { headline } from "../../assets/font/index.style";
import { boxed, boxedMaxContentWidth } from "../../shared/boxed.style";
import { neutralColor, pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";

const slideWidth = min(boxedMaxContentWidth, vw(100).subtract(pageGutter.multiply(2)))

export const articleStyle = () => child('ui-article',
	boxed(),

	child('ui-title',
		display('block'),
		marginBottom(rem(1.5)),

		headline,
		fontSize(rem(2.5))
	),

	child('ui-detail',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(0.8)),

		child('ui-publication',
			display('block'),
			marginBottom(rem(0.25))
		),

		child('ui-date',
			display('block'),
			marginBottom(rem(0.5))
		)
	),

	child('ui-slideshow',
		display('flex'),
		gap(pageGutter),

		height(vh(45)),
		marginInline(vw(100).subtract(slideWidth).divide(2).invert().add(pageGutter.divide(2))),
		marginBottom(rem(1.5)),
		paddingInline(vw(100).subtract(slideWidth).divide(2)),
		paddingBlock(pageGutter),

		scrollSnapType('x', 'mandatory'),
		overflow('scroll', 'hidden'),
		scrollbarWidth('none'),

		backgroundColor(neutralColor),

		child('ui-slide',
			flexShrink(0),
			scrollSnapAlign('center'),

			display('flex'),
			flexDirection('column'),
			height(percentage(100)),
			width(slideWidth),

			child('ui-image',
				flexGrow(1),

				position('relative'),

				child('img',
					position('absolute'),
					inset(0),

					width(percentage(100)),
					height(percentage(100)),
					objectFit('contain'),

					cursor('pointer')
				)
			),

			child('ui-caption',
				flexShrink(0),

				display('block'),
				marginTop(rem(0.25)),

				fontSize(rem(0.85))
			)
		)
			.attribute('ui-expanded',
				child('ui-image',
					position('fixed'),
					inset(0),
					zIndex(1000),

					backgroundColor(hex('000'))
				)
			)
	),

	child('ui-body',
		boxed(),
		marginTop(rem(0.5)),

		whiteSpace('pre-wrap'),
	)
)
