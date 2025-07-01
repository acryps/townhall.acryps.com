import { child, display, em, fontSize, fontStyle, fontWeight, justifyContent, marginBlock, marginBottom, marginTop, Mm, padding, rem, textAlign } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";

export const timeStyle = () => child('ui-time',
	boxed(),

	child('ui-clock',
		display('block'),
		marginBottom(em(1)),

		textAlign('center'),
		fontSize(rem(3)),

		child('ui-date',
			display('block')
		),

		child('ui-time',
			display('block'),
			marginBottom(rem(1))
		),

		child('ui-rate',
			display('block'),

			fontSize(rem(1))
		),

		child('ui-pause',
			display('block'),

			fontSize(rem(1.5)),
			fontStyle('italic')
		)
	),

	child('ui-timeline',
		display('block'),

		child('ui-epoch',
			display('block'),
			marginBlock(pageGutter),

			child('ui-time',
				display('flex'),
				justifyContent('space-between'),
				marginBottom(rem(0.125)),

				fontSize(rem(0.8))
			),

			child('ui-now',
				display('block'),
				marginBottom(rem(0.125)),

				fontSize(rem(0.8))
			),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.25)),

				fontWeight('bold')
			),

			child('ui-description',
				display('block')
			),

			child('ui-pause',
				display('block'),
				marginTop(pageGutter),
				padding(pageGutter),

				textAlign('center'),
				fontStyle('italic')
			)
		)
	)
);
