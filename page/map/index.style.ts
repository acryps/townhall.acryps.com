import { alignItems, alignSelf, background, backgroundColor, border, borderBottom, borderRight, borderRightStyle, borderRightWidth, borderTop, bottom, boxShadow, child, color, cursor, display, flexDirection, flexGrow, flexShrink, flexWrap, fontSize, fontWeight, gap, height, Hex, hex, imageRendering, inset, insetInline, justifyContent, left, lineHeight, margin, marginBottom, marginInline, marginLeft, marginTop, maxHeight, maxWidth, Number, objectFit, opacity, overflow, overflowY, padding, paddingBlock, paddingBottom, paddingInline, paddingTop, pointerEvents, position, px, rem, right, select, style, textAlign, top, Variable, vh, width } from "@acryps/style";
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
			right(0),
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
				alignSelf('stretch'),
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
				alignSelf('stretch'),
				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor)
			),

			child('ui-edit-plot',
				alignSelf('stretch'),
				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor)
			),

			child('ui-plan-shape',
				alignSelf('stretch'),
				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),
				paddingBottom(pageGutter.divide(2)),

				backgroundColor(navigationBackgroundColor),

				child('ui-action',
					buttonStyle(),

					backgroundColor(pageBackgroundColor)
				)
					.attribute('ui-active',
						color(pageBackgroundColor),
						backgroundColor(pageTextColor)
					)
			),

			child('ui-insert-train-stop',
				alignSelf('stretch'),
				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor)
			),

			child('ui-quick-valueation',
				alignSelf('stretch'),
				display('flex'),
				gap(pageGutter),

				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),

				backgroundColor(navigationBackgroundColor),

				child('input',
					inputStyle(),
					flexGrow(1)
				)
			),

			child('ui-relocate-tenancy',
				alignSelf('stretch'),
				display('block'),

				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),
				paddingBottom(pageGutter.divide(2)),

				backgroundColor(navigationBackgroundColor),

				child('ui-title',
					display('block'),
					marginBottom(pageGutter.divide(4)),

					fontWeight('bold')
				),

				child('ui-subtitle',
					display('block'),
					marginBottom(pageGutter.divide(2)),

					opacity(0.7),
					fontSize(rem(0.85))
				),

				child('ui-tenants',
					display('block'),

					maxHeight(vh(18)),
					overflowY('auto'),

					border(px(1), 'solid', 'currentColor'),

					child('ui-tenant',
						display('flex'),
						alignItems('center'),
						gap(pageGutter.divide(2)),

						paddingBlock(rem(0.4)),
						paddingInline(rem(0.5)),

						cursor('pointer'),

						style(':not(:last-of-type)',
							borderBottom(px(1), 'dotted', 'currentColor')
						),

						child('img',
							height(rem(2.5)),
							width(rem(2.5)),

							objectFit('contain')
						),

						child('ui-detail',
							display('block'),

							child('ui-name',
								display('block'),
								fontWeight('bold')
							),

							child('ui-info',
								display('block'),
								fontSize(rem(0.8)),
								opacity(0.7)
							)
						)
					)
				)
			),

			child('ui-relocate-office',
				alignSelf('stretch'),
				display('block'),

				paddingTop(pageGutter.divide(2)),
				paddingInline(pageGutter),
				paddingBottom(pageGutter.divide(2)),

				backgroundColor(navigationBackgroundColor),

				child('ui-title',
					display('block'),
					marginBottom(pageGutter.divide(4)),

					fontWeight('bold')
				),

				child('ui-purpose',
					display('block'),

					fontSize(rem(0.85)),
					opacity(0.7)
				)
			)
		)
	)
]
