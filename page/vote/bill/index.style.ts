import { child, display, padding, rem, marginBottom, color, backgroundColor, fontWeight, marginTop, whiteSpace, fontStyle, paddingInline, marginRight, marginLeft, paddingLeft, borderLeft, px, Variable, border, height, justifyContent, width, percentage, background, flexDirection, alignSelf, maxWidth, paddingBlock, fontSize, textTransform, alignItems, marginBlock, style, lineHeight } from "@acryps/style";
import { billTextColor, billBackgroundColor, negativeColor, positiveColor, pageBackgroundColor, pageTextColor } from "../../index.style";

export const tickerPro = new Variable('ticker-pro');
export const tickerContra = new Variable('ticker-contra');

export const billStyle = () => child('ui-bill',
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

	child('ui-honestium',
		display('block'),
		marginTop(rem(1.5)),

		child('ui-question',
			display('block'),
			marginBottom(rem(0.5)),

			child('ui-type',
				display('inline-block'),
				paddingInline(rem(0.25)),

				color(billBackgroundColor),
				backgroundColor(billTextColor),
			)
		),

		child('ui-answer',
			display('block'),
			paddingLeft(rem(1)),
			borderLeft(px(1), 'solid', 'currentColor')
		)
	),

	child('ui-certification',
		display('block'),
		marginTop(rem(3)),
		lineHeight(1),

		child('ui-date',
			display('block')
		),

		child('ui-result',
			display('block'),

			fontSize(rem(2)),
			textTransform('uppercase')
		)
	),

	child('ui-ticker',
		display('block'),
		marginTop(rem(2)),

		child('ui-bar',
			display('flex'),
			height(rem(0.5)),
			marginBlock(rem(0.5)),

			backgroundColor(negativeColor),
			border(px(1), 'solid', 'currentColor'),

			child('ui-pro',
				width(percentage(100).divide(tickerPro.add(tickerContra)).multiply(tickerPro)),

				backgroundColor(positiveColor)
			),

			style('~ ui-container',
				alignItems('flex-start')
			)
		),

		child('ui-container',
			display('flex'),
			alignItems('flex-end'),
			justifyContent('space-between'),

			child('ui-impression',
				display('block'),
				maxWidth(percentage(80)),
				paddingBlock(rem(0.5)),
				paddingInline(rem(0.75)),

				whiteSpace('pre-wrap'),

				color(pageTextColor),
				backgroundColor(pageBackgroundColor)
			)
				.attribute('ui-type', 'pro', alignSelf('flex-start'))
				.attribute('ui-type', 'contra', alignSelf('flex-end'))
		)
	)
);
