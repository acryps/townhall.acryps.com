import { child, width, percentage, height, vh, marginInline, marginBlock, display, marginBottom, rem, border, px, padding, fontSize, borderBottom, opacity, marginLeft, objectFit, imageRendering, columnGap, alignItems, marginTop, objectPosition, flexDirection, justifyContent, borderTop } from "@acryps/style";
import { pageGutter } from "../../index.style";
import { boxed } from "../../shared/boxed.style";
import { fieldStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";


export const waterBodyStyle = () => child('ui-water-body',
	boxed(),

	fieldStyle(),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-areas',
		display('block'),
		marginBottom(rem(2)),

		border(px(1), 'solid', 'currentColor'),

		child('ui-hint',
			display('block'),
			padding(pageGutter),

			fontSize(rem(0.8))
		),

		child('ui-actions',
			display('flex'),
			marginInline(pageGutter),
			marginBottom(pageGutter),

			child('ui-action',
				buttonStyle()
			)
		),

		child('ui-area',
			display('flex'),
			padding(pageGutter),

			borderTop(px(1), 'dotted', 'currentColor'),

			child('ui-detail',
				display('flex'),
				flexDirection('column'),
				justifyContent('space-between'),

				child('ui-actions',
					child('ui-action',
						buttonStyle()
					)
				)
			),

			child('canvas',
				marginLeft('auto'),
				width(rem(8)),
				height(rem(5)),
				objectFit('contain'),
				objectPosition('right'),

				imageRendering('pixelated')
			)
		)
			.attribute('ui-archived',
				opacity(0.5),

				child('canvas',
					height(rem(3))
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
);
