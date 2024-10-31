import { backgroundColor, child, display, fontSize, fontStyle, fontWeight, hex, Hex, marginBottom, marginTop, padding, rem, style } from "@acryps/style";
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
	)
)
