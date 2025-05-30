import { alignItems, alignSelf, background, backgroundColor, border, borderRight, borderRightStyle, borderRightWidth, borderTop, bottom, boxShadow, child, color, display, flexDirection, flexGrow, flexWrap, fontSize, gap, height, Hex, hex, imageRendering, inset, insetInline, justifyContent, margin, marginInline, marginLeft, marginTop, maxWidth, Number, opacity, overflow, padding, paddingBlock, paddingInline, paddingTop, percentage, pointerEvents, position, px, rem, select, style, textAlign, Variable, width } from "@acryps/style";
import { pageTextColor, navigationBackgroundColor, navigationBorderColor, pageGutter, pageBackgroundColor, neutralColor } from "../index.style";
import { buttonStyle } from "../shared/index.style";
import { PageComponent } from "../page";
import { createFeatureStyle } from "./create/index.style";
import { boxed } from "../shared/boxed.style";
import { fieldStyle } from "../shared/field.style";

const buttonPaddingSize = rem(0.8);

export const activeBoroughColor = new Variable<Hex>('active-borough-color', pageTextColor);
export const activeBoroughContrast = new Variable<Hex>('active-borough-contrast', pageBackgroundColor);

export const mapStyle = () => [
	child('ui-map-child',
		boxed(),

		createFeatureStyle()
	),

	child('ui-map',
		position('fixed'),
		inset(0),

		activeBoroughColor,
		activeBoroughContrast,

		child('ui-map-container',
			position('fixed'),
			inset(rem(0)),

			overflow('visible')
		),

		child('ui-tools',
			position('fixed'),
			insetInline(0),
			bottom(0),

			display('flex'),
			flexDirection('column'),

			child('ui-actions',
				display('flex'),
				flexWrap('wrap'),
				margin(pageGutter),
				gap(pageGutter.divide(2)),

				justifyContent('center'),

				child('ui-group',
					display('flex'),

					backgroundColor(pageBackgroundColor),
					boxShadow(hex('0005'), 0, rem(0.5), pageGutter),

					child('ui-action',
						buttonStyle(),

						style(':not(:last-of-type)',
							borderRightStyle('none')
						)
					)
				),

				child('ui-action',
					buttonStyle(),

					maxWidth(rem(30)),
					alignSelf('center'),

					backgroundColor(pageBackgroundColor),
					boxShadow(hex('0005'), 0, rem(0.5), pageGutter)
				)
					.attribute('ui-disabled',
						opacity(0.5),
						pointerEvents('none')
					)
			),

			child('ui-location',
				display('flex'),
				justifyContent('space-between'),

				paddingInline(pageGutter),
				paddingBlock(rem(0.25)),

				fontSize(rem(0.75)),
				color(activeBoroughContrast),
				backgroundColor(activeBoroughColor),
			),

			child('ui-create-building',
				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor)
			),

			child('ui-edit-plot',
				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor)
			),

			child('ui-insert-train-stop',
				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor)
			),

			child('ui-quick-valueation',
				display('flex'),
				gap(pageGutter),

				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor),

				child('input',
					fieldStyle(),
					flexGrow(1)
				)
			),

			child('ui-drawer',
				display('flex'),
				flexWrap('wrap'),
				justifyContent('space-between'),
				padding(pageGutter.subtract(buttonPaddingSize)),

				color(pageTextColor),
				backgroundColor(navigationBackgroundColor),

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
