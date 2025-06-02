import { backgroundColor, border, borderBottomColor, borderTop, child, cursor, display, flexDirection, flexWrap, marginInline, marginLeft, marginRight, marginTop, overflowY, padding, paddingBlock, paddingInline, position, px, scrollbarWidth, select, StyleSelectorBody, whiteSpace } from "@acryps/style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";

const borderSize = px(2);

export const tabsStyle = (...content: StyleSelectorBody[]) => select('ui-tabs',
	display('flex'),
	flexDirection('column'),
	marginInline(pageGutter.invert()),

	child('ui-headers',
		display('flex'),
		overflowY('auto'),
		scrollbarWidth('none'),
		paddingInline(pageGutter),

		child('ui-header',
			paddingInline(pageGutter),
			paddingBlock(pageGutter.divide(2)),
			position('relative'),
			marginRight(borderSize.invert()),

			backgroundColor(pageBackgroundColor),
			border(borderSize, 'solid', 'currentColor'),
			cursor('pointer'),
			whiteSpace('nowrap')
		)
			.attribute('ui-active',
				borderBottomColor(pageBackgroundColor)
			)
	),

	child('ui-content',
		padding(pageGutter),
		marginTop(borderSize.invert()),

		backgroundColor(pageBackgroundColor),
		borderTop(borderSize, 'solid', pageTextColor),

		content
	)
);
