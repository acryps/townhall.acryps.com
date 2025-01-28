import { alignItems, alignSelf, backgroundColor, border, borderTop, bottom, boxShadow, child, color, display, flexDirection, fontSize, gap, height, hex, imageRendering, inset, insetInline, justifyContent, margin, marginInline, marginLeft, marginTop, maxWidth, Number, overflow, padding, percentage, pointerEvents, position, px, rem, select, textAlign, Variable, width } from "@acryps/style";
import { pageTextColor, navigationBackgroundColor, navigationBorderColor, pageGutter, pageBackgroundColor } from "../index.style";
import { buttonStyle } from "../shared/index.style";
import { PageComponent } from "../page";
import { createFeatureStyle } from "./create/index.style";
import { boxed } from "../shared/boxed.style";

const buttonPaddingSize = rem(0.8);

export const mapStyle = () => [
	child('ui-map-child',
		boxed(),

		createFeatureStyle()
	),

	child('ui-map',
		position('fixed'),
		inset(0),

		child('ui-map-container',
			position('fixed'),
			inset(rem(20)),

			overflow('visible')
		),

		child('ui-map-marker',
			position('fixed'),
			inset(rem(20)),

			border(px(3), 'dotted', 'currentColor'),
			pointerEvents('none')
		),

		child('ui-tools',
			position('fixed'),
			insetInline(0),
			bottom(0),

			display('flex'),
			flexDirection('column'),

			child('ui-action',
				buttonStyle(),

				maxWidth(rem(30)),
				margin(pageGutter),
				alignSelf('center'),

				backgroundColor(pageBackgroundColor),
				boxShadow(hex('0005'), 0, rem(0.5), pageGutter)
			),

			child('ui-drawer',
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
	)
]
