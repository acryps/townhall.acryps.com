import { ch, child, display, fontSize, fontWeight, marginBottom, marginInline, marginRight, maxHeight, objectFit, percentage, rem, textAlign, vh, whiteSpace, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";

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

		marginBottom(rem(2))
	),

	child('ui-biography',
		display('block'),
		whiteSpace('pre-wrap')
	)
)
