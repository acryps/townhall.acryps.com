import { alignItems, borderBottom, ch, child, columnGap, display, Dvi, fontSize, fontWeight, height, justifyContent, marginBottom, marginInline, marginRight, maxHeight, objectFit, objectPosition, percentage, px, Px, rem, textAlign, vh, whiteSpace, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { buttonStyle } from "../shared/index.style";
import { ChatPage } from "./chat";
import { chatStyle } from "./chat/index.style";
import { navigationBorderColor } from "../index.style";
import { relationsStyle } from "./relations/index.style";

export const residentStyle = () => child('ui-resident',
	boxed(),

	child('img',
		display('block'),
		width(percentage(50)),
		maxHeight(vh(20)),
		marginInline('auto'),
		marginBottom(rem(1.5)),

		objectFit('contain')
	),

	child('ui-name',
		display('block'),
		marginBottom(rem(1)),

		textAlign('center'),
		fontSize(rem(2)),

		child('ui-given-name',
			display('inline-block'),
			marginRight(ch(1))
		)
	),

	child('ui-age',
		display('block'),
		textAlign('center'),

		marginBottom(rem(0.25))
	),

	child('ui-home',
		display('block'),
		textAlign('center'),

		marginBottom(rem(2))
	),

	child('ui-actions',
		display('flex'),
		justifyContent('center'),
		columnGap(rem(1)),
		marginBottom(rem(2)),

		child('ui-action', buttonStyle())
	),

	child('ui-biography',
		display('block'),
		whiteSpace('pre-wrap')
	),

	chatStyle(),
	relationsStyle()
)
