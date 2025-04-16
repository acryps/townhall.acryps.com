import { backgroundColor, child, display, flexDirection, height, marginBlock, marginBottom, marginInline, marginTop, padding, percentage, rem, textAlign, vh, width } from "@acryps/style";
import { fieldStyle } from "../../../shared/field.style";
import { negativeColor, pageGutter } from "../../../index.style";
import { buttonStyle } from "../../../shared/index.style";

export const buildingStyle = () => child('ui-building',
	child('ui-identifier',
		display('block')
	),

	child('ui-deactivated',
		display('block'),
		padding(rem(1)),
		marginTop(rem(1)),

		backgroundColor(negativeColor),

		textAlign('center')
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

	child('ui-actions',
		child('ui-action',
			marginTop(rem(1)),

			buttonStyle()
		)
	)
);
