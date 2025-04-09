import { child, color, content, cursor, em, fontSize, fontWeight, hex, select, style, textDecorationLine } from "@acryps/style";

export const annotatedTextStyle = () => select('ui-annotated-text',
	child('ui-annotation',
		cursor('pointer'),

		fontWeight('bold')
	)
		.hover(
			textDecorationLine('underline')
		)
);
