import { child, display, fontSize, fontStyle, marginBottom, rem, whiteSpace } from "@acryps/style";
import { pageGutter } from "../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../shared/index.style";
import { expandLoreStyle } from "./expand/index.style";

export const loreItemStyle = () => child('ui-lore',
	display('block'),

	expandLoreStyle(),

	child('ui-timeline',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-title',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-actions',
		buttonGroupStyle(),
		marginBottom(pageGutter),

		child('ui-action',
			buttonStyle()
		)
	),

	child('ui-context',
		display('block'),
		marginBottom(pageGutter),

		fontStyle('italic'),
		whiteSpace('pre-wrap')
	),

	child('ui-context',
		display('block'),

		whiteSpace('pre-wrap')
	),
);
