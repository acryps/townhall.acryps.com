import { child, display, marginBottom, rem, fontSize, whiteSpace, marginTop, width, percentage, maxHeight, vh, objectFit, imageRendering, scrollSnapType, overflowX, height, backgroundColor, gap, color, marginInline, paddingInline, flexShrink, overflow, flexGrow, scrollSnapAlign, flexDirection, paddingBlock, outline, px, alignSelf, scrollbarWidth, vw, Hex, position, inset, zIndex, background, padding, hex, cursor, min, border, alignItems, justifyContent, opacity } from "@acryps/style";
import { headlineFont } from "../../assets/font/index.style";
import { boxed, boxedMaxContentWidth } from "../../shared/boxed.style";
import { neutralColor, pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { oracleProposalColor } from "../../oracle/index.style";
import { buttonStyle } from "../../shared/index.style";

const slideWidth = min(boxedMaxContentWidth, vw(100).subtract(pageGutter.multiply(2)))

export const articleStyle = () => child('ui-article',
	boxed(),

	child('ui-title',
		display('block'),
		marginBottom(rem(1.5)),

		headlineFont,
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
	),

	child('ui-opinions',
		display('block'),
		marginTop(pageGutter.multiply(2)),

		child('ui-opinion',
			display('block'),
			marginTop(pageGutter),

			fontSize(rem(0.9)),

			child('ui-meta',
				display('flex'),
				alignItems('center'),
				justifyContent('space-between'),
				marginBottom(rem(0.25)),

				fontSize(rem(0.8))
			),

			child('ui-comment',
				display('block'),

				whiteSpace('pre-wrap')
			)
		)
	),

	child('ui-oracle',
		display('block'),
		padding(pageGutter),
		marginTop(pageGutter.multiply(2)),

		border(px(2), 'solid', oracleProposalColor),

		child('ui-guide',
			display('block'),
			marginBottom(pageGutter),

			fontSize(rem(0.8))
		),

		child('ui-lore',
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-actions',
			display('flex'),

			child('ui-action',
				buttonStyle()
			)
		)
	)
)
