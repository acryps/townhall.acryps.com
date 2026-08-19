import { alignItems, alignSelf, background, backgroundColor, border, borderRight, borderRightStyle, borderRightWidth, borderTop, bottom, boxShadow, child, color, display, flexDirection, flexGrow, flexShrink, flexWrap, fontSize, gap, height, Hex, hex, imageRendering, inset, insetInline, justifyContent, left, lineHeight, margin, marginBottom, marginInline, marginLeft, marginTop, maxWidth, Number, opacity, overflow, padding, paddingBlock, paddingInline, paddingTop, percentage, pointerEvents, position, px, rem, right, select, style, textAlign, top, Variable, width } from "@acryps/style";
import { pageTextColor, navigationBackgroundColor, navigationBorderColor, pageGutter, pageBackgroundColor, neutralColor } from "../index.style";
import { buttonStyle } from "../shared/index.style";
import { PageComponent } from "../page";
import { createFeatureStyle } from "./create/index.style";
import { boxed } from "../shared/boxed.style";
import { fieldStyle, inputStyle } from "../shared/field.style";
import { navigationHeight } from "../page.style";

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
			left(0),
			bottom(0),

			display('flex'),
			flexDirection('column'),
			alignItems('flex-start'),

			pointerEvents('none'),
			child('*', pointerEvents('all')),

			child('ui-location',
				position('fixed'),
				top(pageGutter.add(navigationHeight)),
				right(pageGutter),

				paddingInline(rem(0.5)),
				paddingBlock(rem(0.25)),
				lineHeight(1),

				fontSize(rem(0.75)),
				color(activeBoroughContrast),
				backgroundColor(activeBoroughColor),
				textAlign('right'),

				child('ui-coordinates',
					display('block')
				),

				child('ui-borough',
					display('block')
				)
			),

			child('ui-drawer',
				display('flex'),
				flexDirection('column'),
				flexWrap('wrap'),
				justifyContent('space-between'),
				gap(pageGutter.divide(2)),

				padding(pageGutter),

				select('ui-layer',
					display('flex'),

					paddingBlock(buttonPaddingSize.multiply(0.6)),
					paddingInline(buttonPaddingSize),

					fontSize(rem(1.25)),

					color(pageTextColor),
					backgroundColor(navigationBackgroundColor),

					border(px(1), 'solid', 'currentColor'),
					marginBottom(px(-1))
				),

				child('ui-layers',
					display('flex'),
					flexDirection('column')
				),

				child('ui-actions',
					display('flex'),
					flexDirection('column'),

					color(pageTextColor),
					backgroundColor(navigationBackgroundColor),

					child('ui-action',
						display('flex'),
						paddingBlock(buttonPaddingSize.multiply(0.6)),
						paddingInline(buttonPaddingSize),

						border(px(1), 'solid', 'currentColor'),
						marginBottom(px(-1)),

						fontSize(rem(1.25))
					)
				)
			),

			child('ui-actions',
				display('flex'),
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

			child('ui-time-machine',
				display('flex'),
				padding(pageGutter),

				child('ui-action',
					flexShrink(0),

					buttonStyle(),
					padding(rem(0.5)),
					marginInline(px(1).divide(2).invert()),

					color(pageTextColor),
					backgroundColor(pageBackgroundColor)
				),

				child('input',
					flexGrow(1),

					inputStyle()
				)
			),

			child('ui-plans',
				display('flex'),
				gap(pageGutter.divide(2)),
				flexWrap('wrap'),

				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor),

				child('ui-plan',
					display('block'),

					child('select',
						inputStyle(),

						width(rem(10))
					)
				),

				child('ui-add',
					display('block'),

					child('select',
						inputStyle(),

						width(rem(10))
					)
				)
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
					inputStyle(),
					flexGrow(1)
				)
			)
		)
	)
]
