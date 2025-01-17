import { alignItems, aspectRatio, borderBottom, child, color, columnGap, display, flexBasis, flexGrow, flexShrink, fontSize, fontWeight, height, marginBottom, marginInline, marginTop, objectFit, objectPosition, overflow, padding, paddingBlock, percentage, px, ratio, rem, style, textAlign, textDecorationLine, textTransform, width } from "@acryps/style";
import { negativeColor, pageGutter, positiveColor } from "../../index.style";
import { boxed } from "../../shared/boxed.style";

export const relationsStyle = () => child('ui-relations',
	boxed(),

	child('ui-hint',
		display('block'),
		marginBottom(rem(2))
	),

	child('ui-relation',
		display('block'),
		paddingBlock(pageGutter),

		style(':not(:last-of-type)',
			borderBottom(px(1), 'solid', 'currentColor')
		),

		child('ui-link',
			display('flex'),
			columnGap(pageGutter),
			alignItems('center'),
			marginBottom(rem(0.5)),

			child('ui-resident',
				flexGrow(1),
				flexBasis(0),

				textAlign('center'),

				child('img',
					height(rem(3)),
					aspectRatio(ratio(1, 1)),

					objectFit('cover'),
					objectPosition('top')
				),

				child('ui-name',
					display('block'),

					fontWeight('bold')
				)
			)
				.attribute('ui-self',
					child('ui-name',
						textDecorationLine('underline')
					)
				),

			child('ui-icon',
				flexShrink(0)
			)
		),

		child('ui-purpose',
			display('block'),
			marginBottom(rem(2)),

			textAlign('center'),
			textTransform('uppercase')
		),

		child('ui-time',
			display('block'),

			fontSize(rem(0.75))
		),

		child('ui-connection',
			display('block'),
			marginTop(rem(1)),

			color(positiveColor)
		),

		child('ui-conflict',
			display('block'),
			marginTop(rem(1)),

			color(negativeColor)
		)
	)
);
