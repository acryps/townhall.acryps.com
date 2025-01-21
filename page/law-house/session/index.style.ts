import { border, boxShadow, child, display, fontWeight, hex, marginBottom, padding, px, rem, whiteSpace } from "@acryps/style";

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
		padding(rem(1)),

		whiteSpace('pre-wrap'),
		border(px(1), 'solid', 'currentColor')
	)
);
