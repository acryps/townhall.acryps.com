import { alignItems, border, borderBottom, child, columnGap, display, flexGrow, fontSize, fontWeight, height, imageRendering, marginBlock, marginBottom, marginInline, marginLeft, marginTop, objectFit, opacity, padding, percentage, px, rem, vh, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";
import { fieldStyle } from "../shared/field.style";
import { buttonStyle } from "../shared/index.style";

export const streetStyle = () => child('ui-street',
	boxed(),

	child('ui-field',
		display('flex'),
		marginBottom(rem(0.5)),

		child('input',
			fieldStyle(),
			flexGrow(1)
		)
	),

	child('ui-plots',
		display('block'),

		child('ui-progress',
			display('block')
		),

		child('canvas',
			width(percentage(100)),
			imageRendering('pixelated')
		)
	),

	child('ui-content',
		child('ui-map-container',
			width(percentage(100).add(pageGutter.multiply(2))),
			height(vh(30)),

			marginInline(pageGutter.invert()),
			marginBlock(pageGutter)
		),

		child('ui-routes',
			display('block'),
			marginBottom(rem(2)),

			border(px(1), 'solid', 'currentColor'),

			child('ui-hint',
				display('block'),
				padding(pageGutter),

				fontSize(rem(0.8))
			),

			child('ui-field',
				display('flex'),
				padding(pageGutter),

				borderBottom(px(1), 'solid', 'currentColor'),

				child('label',
					flexGrow(1)
				),

				child('input',
					fieldStyle(),

					width(rem(4))
				)
			),

			child('ui-route',
				display('flex'),
				padding(pageGutter),

				borderBottom(px(1), 'dotted', 'currentColor'),
				opacity(0.5),

				child('ui-name',
					display('block'),
					marginBottom(rem(0.25))
				),

				child('canvas',
					marginLeft('auto'),
					height(rem(5)),
					width(rem(8)),
					objectFit('contain'),

					imageRendering('pixelated')
				)
			)
				.attribute('ui-active',
					opacity(1)
				),

			child('ui-action',
				display('flex'),
				columnGap(pageGutter),
				alignItems('center'),

				padding(pageGutter)
			)
		),

		child('ui-actions',
			child('ui-action',
				marginTop(rem(1)),

				buttonStyle()
			)
		)
	)
);
