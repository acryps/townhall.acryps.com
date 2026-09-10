import { backgroundColor, borderTop, child, color, display, flexDirection, fontSize, fontWeight, gap, hex, inset, justifyContent, marginBottom, marginInline, maxWidth, paddingBlock, paddingInline, percentage, position, px, rem, width, zIndex } from "@acryps/style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { buttonStyle } from "../index.style";
import { boxedMaxContentWidth } from "../boxed.style";

export const alertStyle = () => child('ui-alert-overlay',
	position('fixed'),
	inset(0),

	zIndex(1000000),

	display('flex'),
	flexDirection('column'),
	justifyContent('flex-end'),

	backgroundColor(hex('fffc')),

	child('ui-alert-sheet',
		display('block'),

		width(percentage(100)),
		maxWidth(boxedMaxContentWidth),
		marginInline('auto'),

		paddingInline(pageGutter),
		paddingBlock(pageGutter),

		backgroundColor(pageBackgroundColor),
		borderTop(px(2), 'solid', pageTextColor),

		child('ui-title',
			display('block'),
			marginBottom(pageGutter.divide(2)),

			fontSize(rem(1.1)),
			fontWeight('bold')
		),

		child('ui-content',
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-actions',
			display('flex'),
			flexDirection('column'),
			gap(pageGutter.divide(2)),

			child('ui-action',
				buttonStyle(),

				justifyContent('center')
			)
				.attribute('ui-primary',
					backgroundColor(pageTextColor),
					color(pageBackgroundColor)
				)
		)
	)
);
