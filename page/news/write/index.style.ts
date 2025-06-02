import { alignItems, border, child, display, flexDirection, flexGrow, flexShrink, gap, height, marginBottom, objectFit, px, rem, Rem, width } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { inputStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";
import { Shape } from "../../../interface/shape";

export const writeArticleStyle = () => child('ui-write-article',
	boxed(),

	display('flex'),
	flexDirection('column'),

	child('ui-guide',
		display('block'),
		marginBottom(rem(1))
	),

	child('input',
		display('block'),
		marginBottom(rem(1)),

		inputStyle()
	),

	child('textarea',
		marginBottom(rem(1)),

		inputStyle()
	),

	child('ui-media',
		display('block'),
		marginBottom(rem(2)),

		child('ui-image',
			display('flex'),
			alignItems('center'),
			gap(rem(1)),

			marginBottom(rem(0.75)),

			child('img',
				height(rem(5)),
				width(rem(10)),

				objectFit('contain'),
				border(px(1), 'dashed', 'currentColor')
			),

			child('input',
				flexGrow(1),

				inputStyle()
			),

			child('ui-action',
				flexShrink(0)
			)
		),

		child('ui-action',
			buttonStyle()
		)
	),

	child('ui-actions',
		display('block'),

		child('ui-action',
			buttonStyle()
		)
	)
);
