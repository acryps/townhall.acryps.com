import { alignItems, aspectRatio, backgroundColor, border, borderBottom, child, color, columnGap, display, flexDirection, flexWrap, fontSize, fontWeight, gap, height, lineHeight, marginBlock, marginBottom, marginInline, marginTop, Mm, objectFit, objectPosition, opacity, padding, percentage, px, ratio, rem, textAlign, textDecorationLine, vh, width } from "@acryps/style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { fieldStyle } from "../../shared/field.style";

export const propertyStyle = () => child('ui-property',
	display('block'),

	child('ui-name',
		display('block'),

		fontSize(rem(1.2)),
		fontWeight('bold')
	),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-field',
		display('flex'),
		flexDirection('column'),
		marginBottom(rem(1)),

		child('label',
			display('block'),
			marginBottom(rem(0.25))
		),

		child('input',
			fieldStyle()
		),

		child('select',
			fieldStyle()
		)
	),

	child('ui-dwellings',
		display('block'),
		marginBottom(rem(2)),

		border(px(1), 'solid', 'currentColor'),

		child('ui-dwelling',
			display('block'),
			padding(pageGutter),

			borderBottom(px(1), 'dotted', 'currentColor'),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.25))
			),

			child('ui-tenants',
				display('flex'),
				flexWrap('wrap'),
				gap(rem(0.5)),

				child('ui-tenant',
					display('flex'),
					alignItems('flex-end'),
					lineHeight(1),

					color(pageBackgroundColor),
					backgroundColor(pageTextColor),

					child('img',
						height(rem(1.25)),
						width(rem(1)),
						marginInline(rem(0.5)),

						objectFit('cover'),
						objectPosition('top')
					),

					child('ui-name',
						padding(rem(0.25))
					)
				)
					.attribute('ui-left',
						opacity(0.5)
					)
			),

			child('ui-vacant',
				display('block'),

				child('ui-header',
					display('block')
				),

				child('ui-hint',
					fontSize(rem(0.75))
				)
			)
		),

		child('ui-action',
			display('flex'),
			columnGap(pageGutter),
			alignItems('center'),

			padding(pageGutter)
		)
	),

	child('ui-historic-listing',
		display('block'),
		padding(pageGutter),

		border(px(1), 'solid', 'currentColor'),

		child('ui-header',
			display('block'),
			marginBottom(rem(1)),

			fontWeight('bold')
		),

		child('ui-date',
			display('block'),
			marginBottom(rem(1))
		),

		child('ui-field',
			display('flex'),
			flexDirection('column'),
			marginBottom(rem(1)),

			child('label',
				display('block'),
				marginBottom(rem(0.25))
			),

			child('select',
				fieldStyle()
			),

			child('ui-hint',
				display('block'),
				marginTop(rem(0.25)),
				fontSize(rem(0.75))
			)
		),

		child('ui-modifier',
			display('block'),
			marginBottom(rem(1)),

			child('ui-field',
				display('flex'),
				columnGap(rem(0.5))
			),

			child('ui-grade',
				display('block'),
				fontSize(rem(0.75))
			)
		)
	)
)
