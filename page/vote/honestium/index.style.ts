import { backgroundColor, borderBottom, child, color, display, flexDirection, fontWeight, marginBottom, marginTop, padding, paddingBottom, px, rem, whiteSpace } from "@acryps/style";
import { billBackgroundColor, billTextColor } from "../../index.style";
import { fieldStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";

export const honestiumStyle = () => child('ui-open-honestium',
	display('flex'),
	flexDirection('column'),

	child('ui-bill',
		display('block'),
		padding(rem(2)),
		marginBottom(rem(1.5)),

		color(billTextColor),
		backgroundColor(billBackgroundColor),

		child('ui-tag',
			display('block'),
			marginBottom(rem(0.5))
		),

		child('ui-title',
			display('block'),
			marginBottom(rem(1)),

			fontWeight('bold')
		),

		child('ui-description',
			display('block'),
			whiteSpace('pre-wrap')
		),

		child('ui-answers',
			display('block'),
			marginTop(rem(0.5))
		)
	),

	child('ui-question',
		display('block'),
		marginBottom(rem(1.5)),

		fontWeight('bold')
	),

	child('textarea',
		fieldStyle(),

		marginBottom(rem(1))
	),

	child('ui-hint',
		display('block'),
		marginBottom(rem(1))
	),

	child('ui-actions',
		display('block'),

		child('ui-action',
			buttonStyle()
		)
	)
);
