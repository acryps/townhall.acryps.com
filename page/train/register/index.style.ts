import { child, display, flexDirection, fontSize, height, marginBottom, marginInline, marginLeft, rem, vh } from "@acryps/style";
import { fieldStyle } from "../../shared/field.style";
import { pageGutter } from "../../index.style";
import { buttonStyle } from "../../shared/index.style";

export const registerTrainRouteStyle = () => child('ui-register-train-route',
	display('block'),

	child('ui-map-container',
		height(vh(30)),
		marginInline(pageGutter.invert()),
		marginBottom(pageGutter)
	),

	child('ui-field',
		display('flex'),
		flexDirection('column'),
		marginBottom(rem(1)),

		child('label',
			display('block'),
			marginBottom(rem(0.25))
		),

		child('ui-used',
			display('block'),
			marginBottom(rem(0.5)),

			fontSize(rem(0.75)),

			child('ui-train-route-icon',
				marginLeft(rem(0.25))
			)
		),

		child('input',
			fieldStyle()
		),

		child('textarea',
			fieldStyle()
		)
	),

	child('ui-preview',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(3))
	),

	child('ui-actions',
		child('ui-action',
			buttonStyle()
		)
	)
);
