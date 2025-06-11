import { alignItems, backgroundColor, child, display, flexDirection, flexGrow, flexShrink, justifyContent, margin, marginInline, marginLeft, overflow, percentage, rem, style, textAlign, width } from "@acryps/style";

export const nameFrequencies = () => child('ui-name-frequencies',
	display('flex'),

	child('ui-frequencies',
		display('block'),
		width(percentage(50)),

		overflow('hidden'),

		style(':first-child',
			textAlign('right'),
		),

		style(':last-child',
			child('ui-frequency',
				flexDirection('row-reverse')
			)
		),

		child('ui-frequency',
			display('flex'),
			justifyContent('flex-end'),

			child('ui-count',
				marginInline(rem(0.5))
			)
		)
	)
);
