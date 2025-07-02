import { alignItems, border, borderBottom, child, columnGap, display, flexGrow, fontSize, fontWeight, height, imageRendering, marginBlock, marginBottom, marginInline, marginLeft, marginTop, objectFit, opacity, padding, percentage, px, rem, vh, width } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";
import { fieldStyle, inputStyle } from "../shared/field.style";
import { buttonStyle } from "../shared/index.style";

export const streetStyle = () => child('ui-street',
	boxed(),

	fieldStyle(),

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

			fieldStyle(
				marginInline(pageGutter)
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
					width(rem(8)),
					height(rem(2)),
					objectFit('contain'),

					imageRendering('pixelated')
				)
			)
				.attribute('ui-active',
					opacity(1),

					child('canvas',
						height(rem(5))
					)
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
