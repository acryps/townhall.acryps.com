import { alignItems, backgroundColor, border, bottom, child, color, cursor, display, flexDirection, flexGrow, fontSize, fontWeight, height, lineHeight, margin, marginBottom, marginRight, maxHeight, overflow, padding, PaddingBlockStyleProperty, paddingBottom, paddingRight, percentage, position, px, rem, right, textOverflow, whiteSpace } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { loreQueryStyle } from "./query/index.style";
import { inputBackgroundColor, inputSpacingBlock, inputSpacingInline, inputStyle, inputTextColor } from "../shared/field.style";
import { pageGutter } from "../index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/index.style";
import { loreItemStyle } from "./item/index.style";
import { writeLoreStyle } from "./propose/write/index.style";
import { loreProposalReview } from "./propose/review/index.style";

export const loreStyle = () => child('ui-lore',
	boxed(),

	loreQueryStyle(),
	loreItemStyle(),
	writeLoreStyle(),
	loreProposalReview(),

	child('ui-prompt',
		display('flex'),
		alignItems('flex-end'),
		marginBottom(pageGutter),

		color(inputTextColor),
		backgroundColor(inputBackgroundColor),

		child('textarea',
			inputStyle(),

			flexGrow(1)
		),

		child('ui-action',
			display('flex'),
			marginBottom(inputSpacingInline),
			marginRight(inputSpacingInline),
			padding(rem(0.5)),

			cursor('pointer'),
			color(inputBackgroundColor),
			backgroundColor(inputTextColor),
		)
	),

	child('ui-actions',
		buttonGroupStyle(),
		marginBottom(pageGutter.multiply(2)),

		child('ui-action',
			buttonStyle()
		)
	),

	child('ui-timeline',
		display('block'),

		child('ui-lore',
			display('block'),
			marginBottom(pageGutter),

			child('ui-tagline',
				display('block'),
				marginBottom(rem(0.25)),

				fontSize(rem(0.8))
			),

			child('ui-title',
				display('block'),

				fontWeight('bold')
			),

			child('ui-facts',
				display('block'),

				overflow('hidden'),
				whiteSpace('nowrap'),
				textOverflow('ellipsis')
			)
		),

		child('ui-actions',
			buttonGroupStyle(),

			child('ui-action',
				buttonStyle()
			)
		)
	)
);
