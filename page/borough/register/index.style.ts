import { alignItems, aspectRatio, backgroundColor, border, borderBottom, child, color, columnGap, display, flexDirection, flexWrap, fontSize, fontWeight, gap, height, lineHeight, marginBlock, marginBottom, marginInline, marginTop, Mm, objectFit, objectPosition, opacity, padding, percentage, px, ratio, rem, textAlign, textDecorationLine, vh, width } from "@acryps/style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { fieldStyle, inputStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";

export const registerBoroughStyle = () => child('ui-register-borough',
	display('block'),

	child('ui-map-container',
		width(percentage(100).add(pageGutter.multiply(2))),
		height(vh(30)),

		marginInline(pageGutter.invert()),
		marginBlock(pageGutter)
	),

	fieldStyle(),

	child('ui-actions',
		child('ui-action',
			marginTop(rem(1)),

			buttonStyle()
		)
	)
)
