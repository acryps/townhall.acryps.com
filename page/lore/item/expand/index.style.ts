import { border, child, display, fontStyle, fontWeight, marginBottom, padding, px, rem } from "@acryps/style";
import { pageGutter } from "../../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/index.style";

export const expandLoreStyle = () => child('ui-expand',
	display('block'),

	child('ui-expanding',
		display('block'),

		fontStyle('italic')
	),

	child('ui-proposals',
		display('block'),

		child('ui-proposal',
			display('block'),
			marginBottom(pageGutter),
			padding(pageGutter),

			border(px(1), 'solid', 'currentColor'),

			child('ui-title',
				display('block'),
				marginBottom(rem(0.5)),

				fontWeight('bold')
			),

			child('ui-context',
				display('block'),
				marginBottom(pageGutter)
			),

			child('ui-actions',
				buttonGroupStyle(),

				child('ui-action',
					buttonStyle()
				)
			)
		)
	)
);
