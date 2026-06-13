import { child, color, display, fontSize, marginBottom, rem, textAlign, whiteSpace } from "@acryps/style";
import { negativeColor, pageGutter, positiveColor } from "../../../index.style";
import { buttonGroupStyle, buttonStyle } from "../../../shared/index.style";

export const loreProposalReview = () => child('ui-proposal',
	display('block'),

	child('ui-context',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-validation',
		display('block'),

		child('ui-valid',
			display('block'),
			marginBottom(pageGutter),

			color(positiveColor),
			fontSize(rem(2))
		),

		child('ui-invalid',
			display('block'),
			marginBottom(pageGutter),

			color(negativeColor),
			fontSize(rem(2))
		),

		child('ui-reason',
			display('block'),
			marginBottom(pageGutter),

			whiteSpace('pre-wrap')
		),

		child('ui-actions',
			buttonGroupStyle(),

			child('ui-action',
				buttonStyle()
			)
		)
	)
)
