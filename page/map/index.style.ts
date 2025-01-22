import { alignItems, backgroundColor, borderTop, bottom, child, color, display, fontSize, gap, height, imageRendering, inset, insetInline, justifyContent, marginLeft, marginTop, Number, padding, percentage, position, px, rem, select, textAlign, Variable, width } from "@acryps/style";
import { pageTextColor, navigationBackgroundColor, navigationBorderColor, pageGutter } from "../index.style";

const buttonPaddingSize = rem(0.8);

export const mapStyle = () => child('ui-map',
	position('fixed'),
	inset(0),

	child('ui-map-container',
		position('fixed'),
		inset(0)
	),

	child('ui-tools',
		position('fixed'),
		insetInline(0),
		bottom(0),

		display('flex'),
		justifyContent('space-between'),
		padding(pageGutter.subtract(buttonPaddingSize)),

		color(pageTextColor),
		backgroundColor(navigationBackgroundColor),
		borderTop(px(1), 'solid', navigationBorderColor),

		select('ui-layer',
			padding(buttonPaddingSize),

			fontSize(rem(1.5))
		),

		child('ui-layers',
			display('flex')
		),

		child('ui-actions',
			display('flex'),

			child('ui-action',
				padding(buttonPaddingSize),

				fontSize(rem(1.5))
			)
		)
	)
)
