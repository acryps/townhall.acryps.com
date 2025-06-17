import { alignItems, border, borderBottom, child, columnGap, display, flexWrap, fontWeight, height, imageRendering, marginBlock, marginBottom, marginInline, marginLeft, marginTop, objectFit, objectPosition, padding, percentage, px, rem, textDecorationLine, vh, width } from "@acryps/style";
import { fieldStyle } from "../../shared/field.style";
import { pageGutter } from "../../index.style";
import { planShapeStyle } from "./shape/index.style";
import { topicHeaderStyle } from "../../shared/topic-header.style";
import { buttonStyle } from "../../shared/index.style";

export const planStyle = () => child('ui-plan',
	display('block'),

	planShapeStyle(),

	topicHeaderStyle(),
	fieldStyle(),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-actions',
		display('flex'),
		flexWrap('wrap'),
		marginBottom(pageGutter),

		child('ui-action',
			buttonStyle()
		)
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
		)
			.attribute('ui-archived',
				child('ui-name',
					textDecorationLine('line-through')
				),

				child('canvas',
					height(rem(1.5))
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
