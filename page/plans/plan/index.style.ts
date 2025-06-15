import { alignItems, border, borderBottom, child, columnGap, display, fontWeight, height, imageRendering, marginBlock, marginBottom, marginInline, marginLeft, marginTop, objectFit, objectPosition, padding, percentage, px, rem, vh, width } from "@acryps/style";
import { fieldStyle } from "../../shared/field.style";
import { pageGutter } from "../../index.style";
import { planShapeStyle } from "./shape/index.style";

export const planStyle = () => child('ui-plan',
	display('block'),

	planShapeStyle(),

	fieldStyle(),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-shapes',
		display('block'),
		marginBottom(rem(2)),
		marginTop(pageGutter),

		border(px(1), 'solid', 'currentColor'),

		child('ui-shape',
			display('flex'),
			padding(pageGutter),

			borderBottom(px(1), 'dotted', 'currentColor'),

			child('ui-name',
				display('block')
			),

			child('canvas',
				marginLeft('auto'),
				height(rem(5)),
				width(rem(8)),

				objectFit('contain'),
				objectPosition('right'),
				imageRendering('pixelated')
			)
		),

		child('ui-action',
			display('flex'),
			columnGap(pageGutter),
			alignItems('center'),

			padding(pageGutter)
		)
	)
);
