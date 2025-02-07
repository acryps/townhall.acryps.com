import { border, boxShadow, child, display, fontSize, fontWeight, gap, hex, margin, marginBottom, padding, px, rem, whiteSpace } from "@acryps/style";

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

	child('ui-protocol',
		display('block'),

		border(px(1), 'solid', 'currentColor'),

		child('ui-item',
			display('block'),
			margin(rem(1)),

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
	)
);
