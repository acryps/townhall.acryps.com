import { backgroundColor, child, ColorValue, display, flexDirection, flexWrap, fontSize, fontStyle, fontWeight, gap, height, hex, Hex, justifyContent, marginBottom, marginTop, padding, rem, style, Variable } from "@acryps/style";
import { buttonStyle } from "../shared/index.style";

export const homeStyle = () => child('ui-home',
	display('block'),
	padding(rem(1)),
	marginTop(rem(5)),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(3))
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(1))
	),

	child('ui-online',
		display('block'),
		padding(rem(1)),
		marginBottom(rem(1)),

		backgroundColor(hex('eee')),

		child('ui-empty',
			display('block'),
			marginTop(rem(1)),

			fontStyle('italic')
		),

		child('ui-players',
			display('block'),

			child('ui-player',
				display('block'),
				marginTop(rem(1))
			)
		)
	),

	child('ui-connection',
		display('block'),
		padding(rem(1)),

		backgroundColor(hex('eee')),

		child('ui-host',
			fontWeight('bold')
		),

		child('ui-platform',
			fontWeight('bold')
		),

		child('ui-hint',
			display('block'),

			fontSize(rem(0.6))
		)
	),

	child('ui-actions',
		display('block'),

		child('ui-action', buttonStyle())
	),

	child('ui-boroughs',
		display('flex'),
		gap(rem(2)),
		flexWrap('wrap'),

		child('ui-borough',
			display('flex'),
			flexDirection('column'),
			justifyContent('center'),
			padding(rem(1)),

			backgroundColor(boroughColor),

			child('ui-banner',
				marginBottom(rem(1)),

				child('canvas',
					height(rem(5))
				)
			),

			child('ui-name',
				fontWeight('bold')
			)
		)
	)
)

export const boroughColor = new Variable<ColorValue>('borough-color');
