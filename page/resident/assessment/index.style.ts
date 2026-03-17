import { alignItems, alignSelf, backgroundColor, backgroundImage, border, borderBottom, ch, child, colorStop, cursor, display, flexGrow, flexShrink, fontSize, gap, height, insetInline, justifyContent, left, linearGradient, marginBottom, marginRight, padding, paddingTop, percentage, position, px, rem, textAlign, top, turn, width } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { pageGutter, negativeColor, neutralColor, positiveColor } from "../../index.style";
import { assessmentMarkerValue } from "../index.style";

export const residentAssessmentStyle = () => child('ui-assessment',
	display('block'),

	child('ui-title',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-description',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-section',
		display('block'),

		child('ui-title',
			display('block'),
			marginBottom(pageGutter.divide(2)),

			fontSize(rem(1.5))
		),

		child('ui-description',
			display('block'),
			marginBottom(pageGutter)
		),

		child('ui-assessments',
			display('block'),
			marginBottom(pageGutter),

			border(px(1), 'solid', 'currentColor'),

			child('ui-assessment',
				display('flex'),
				gap(pageGutter),
				justifyContent('space-between'),

				padding(pageGutter),

				borderBottom(px(1), 'dotted', 'currentColor'),

				child('ui-prompt',
					flexGrow(1),
				),

				child('ui-range',
					flexShrink(0),
					alignSelf('stretch'),

					display('flex'),
					justifyContent('space-between'),
					alignItems('flex-end'),
					gap(rem(0.5)),

					width(percentage(40)),
					position('relative'),
					paddingTop(rem(1)),

					fontSize(rem(0.6)),

					child('ui-marker',
						position('absolute'),
						top(0),
						left(percentage(100).multiply(assessmentMarkerValue).subtract(px(2))),

						width(px(4)),
						height(rem(0.8)),
						backgroundColor('currentColor')
					),

					child('ui-high',
						textAlign('right')
					)
				)
					.before('',
						position('absolute'),
						top(rem(0.125)),
						insetInline(0),
						height(rem(0.5).subtract(px(2))),

						border(px(1), 'solid', 'currentColor'),

						backgroundImage(linearGradient(turn(0.25),
							colorStop(percentage(0), negativeColor),
							colorStop(percentage(40), neutralColor),
							colorStop(percentage(60), neutralColor),
							colorStop(percentage(100), positiveColor)
						))
					)
			)
		),

		child('ui-matches',
			display('block'),
			marginBottom(pageGutter),

			border(px(1), 'solid', 'currentColor'),

			child('ui-match',
				display('flex'),
				gap(pageGutter),

				padding(pageGutter),

				borderBottom(px(1), 'dotted', 'currentColor'),

				child('ui-index',
					width(ch(4)),

					fontSize(rem(0.8)),
					textAlign('right')
				),

				child('ui-name',
					flexGrow(1),
					cursor('pointer'),

					child('ui-given',
						display('inline-block'),
						marginRight(ch(0.8))
					)
				),

				child('ui-distance',
					width(ch(6))
				),

				child('ui-parameters',
					width(ch(2)),

					fontSize(rem(0.8))
				)
			)
		)
	)
)
