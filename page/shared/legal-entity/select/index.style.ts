import { alignItems, background, backgroundColor, border, borderBottom, boxShadow, child, cursor, display, flexGrow, gap, hex, inset, insetInline, lineHeight, maxHeight, overflow, paddingBlock, paddingInline, percentage, position, px, rem, select, style, top, zIndex } from "@acryps/style";
import { inputSpacingBlock, inputSpacingInline, inputStyle, inputTextColor } from "../../field.style";

export const legalEntitySelectorStyle = () => select('ui-legal-entity-selector',
	display('flex'),
	position('relative'),

	child('input',
		flexGrow(1),

		inputStyle()
	),

	child('ui-list',
		position('absolute'),
		insetInline(0),
		top(percentage(100)),
		zIndex(10000),

		maxHeight(rem(20)),
		overflow('hidden', 'scroll'),

		display('none'),

		border(px(1), 'solid', 'currentColor'),
		backgroundColor(inputTextColor),
		boxShadow(hex('0002'), 0, rem(0.5), rem(1)),

		child('ui-entity',
			display('block'),
			paddingBlock(inputSpacingBlock.divide(1.5)),
			paddingInline(inputSpacingInline),

			cursor('pointer'),

			borderBottom(px(1), 'dashed', 'currentColor')
		)
	)
)
	.attribute('ui-focus',
		child('ui-list',
			display('block')
		)
	);
