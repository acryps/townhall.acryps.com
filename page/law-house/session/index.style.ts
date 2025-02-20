import { backgroundColor, border, boxShadow, child, color, display, fontSize, fontWeight, gap, hex, margin, marginBottom, padding, paddingBlock, paddingInline, px, rem, whiteSpace } from "@acryps/style";
import { pageBackgroundColor, pageTextColor } from "../../index.style";
import { buttonStyle } from "../../shared/index.style";

export const sessionStyle = () => child('ui-session',
	display('block'),

	child('ui-scope',
		display('block'),
		marginBottom(rem(1)),

		fontWeight('bold')
	),

	child('ui-date',
		display('block'),
		marginBottom(rem(0.5))
	),

	child('ui-sessionaries',
		display('block'),
		marginBottom(rem(2))
	),

	child('ui-actions',
		display('block'),
		marginBottom(rem(1)),

		child('ui-action',
			buttonStyle()
		)
	),

	child('ui-protocol',
		display('block'),

		border(px(1), 'solid', 'currentColor'),

		child('ui-item',
			display('block'),
			paddingInline(rem(1)),
			paddingBlock(rem(0.75)),

			child('ui-message',
				display('block'),
				whiteSpace('pre-wrap')
			),

			child('ui-tagline',
				display('flex'),
				gap(rem(1)),

				fontSize(rem(0.8))
			)
		)
			.attribute('ui-active',
				color(pageBackgroundColor),
				backgroundColor(pageTextColor)
			)
	)
);
