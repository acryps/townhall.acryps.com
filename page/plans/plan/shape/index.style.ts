import { backgroundColor, child, ColorValue, display, fontSize, gap, height, marginBlock, marginInline, marginTop, padding, paddingBlock, paddingInline, percentage, rem, Variable, vh, width } from "@acryps/style";
import { fieldStyle } from "../../../shared/field.style";
import { pageGutter } from "../../../index.style";
import { buttonStyle } from "../../../shared/index.style";

export const colorPresetColor = new Variable<ColorValue>('color-preset-value');

export const planShapeStyle = () => child('ui-shape',
	fieldStyle(
		child('ui-color-presets',
			display('flex'),
			gap(rem(0.5)),
			marginTop(rem(0.5)),

			child('ui-color-preset',
				paddingBlock(rem(0.2)),
				paddingInline(rem(0.6)),

				fontSize(rem(0.8)),
				backgroundColor(colorPresetColor),
			)
		)
	),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	child('ui-actions',
		child('ui-action',
			buttonStyle()
		)
	)
);
