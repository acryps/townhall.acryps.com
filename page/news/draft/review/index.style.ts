import { alignItems, backgroundColor, border, child, cursor, display, flexDirection, flexGrow, flexShrink, fontSize, fontWeight, gap, hex, height, marginBottom, marginTop, opacity, px, rem, select, width } from "@acryps/style";
import { boxed } from "../../../shared/boxed.style";
import { inputStyle } from "../../../shared/field.style";
import { buttonStyle } from "../../../shared/index.style";

export const draftReviewStyle = () => child('ui-draft-review',
	boxed(),

	// matches both the top-level "interpreting" status and the "writing article" status nested under ui-questions
	select('ui-status',
		display('block')
	),

	child('ui-questions',
		display('block'),

		child('ui-question',
			display('block'),
			marginBottom(rem(2)),

			child('ui-prompt',
				display('block'),
				marginBottom(rem(0.25)),

				fontWeight('bold')
			),

			child('ui-detail',
				display('block'),
				marginBottom(rem(0.75)),

				fontSize(rem(0.85)),
				opacity(0.75)
			),

			child('ui-answers',
				display('flex'),
				flexDirection('column'),
				gap(rem(0.75)),

				child('ui-answer',
					display('flex'),
					alignItems('flex-start'),
					gap(rem(0.75)),

					child('ui-select',
						display('block'),
						flexShrink(0),

						width(rem(1.25)),
						height(rem(1.25)),
						marginTop(rem(0.15)),

						cursor('pointer'),
						border(px(1), 'solid', 'currentColor')
					),

					child('ui-selected',
						display('block'),
						flexShrink(0),

						width(rem(1.25)),
						height(rem(1.25)),
						marginTop(rem(0.15)),

						cursor('pointer'),
						border(px(1), 'solid', hex('000')),
						backgroundColor(hex('000'))
					),

					child('ui-text',
						display('block'),
						flexGrow(1),

						cursor('pointer')
					),

					child('textarea',
						flexGrow(1),

						inputStyle()
					)
				)
			)
		)
	),

	child('ui-actions',
		display('block'),

		child('ui-action',
			buttonStyle()
		)
	)
);
