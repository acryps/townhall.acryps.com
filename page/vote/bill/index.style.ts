import { child, display, padding, rem, marginBottom, color, backgroundColor, fontWeight, marginTop, whiteSpace, fontStyle, paddingInline, marginRight, marginLeft, paddingLeft, borderLeft, px, Variable, border, height, justifyContent, width, percentage, background, flexDirection, alignSelf, maxWidth, paddingBlock, fontSize, textTransform, alignItems, marginBlock, style, lineHeight, position, left, right, textAlign, flexBasis, flexGrow, gap } from "@acryps/style";
import { billTextColor, billBackgroundColor, negativeColor, positiveColor, pageBackgroundColor, pageTextColor, neutralColor } from "../../index.style";

export const tickerPending = new Variable('ticker-pending');
export const tickerPro = new Variable('ticker-pro');
export const tickerContra = new Variable('ticker-contra');

const tickerWidth = tickerPending.add(tickerPro).add(tickerContra);

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
			display('block'),
			height(rem(0.5)),
			marginBlock(rem(0.5)),
			position('relative'),

			backgroundColor(neutralColor),
			border(px(1), 'solid', 'currentColor'),

			child('ui-pro',
				position('absolute'),
				left(0),
				width(percentage(100).divide(tickerWidth).multiply(tickerPro)),
				height(percentage(100)),

				backgroundColor(positiveColor)
			),

			child('ui-contra',
				position('absolute'),
				right(0),
				width(percentage(100).divide(tickerWidth).multiply(tickerContra)),
				height(percentage(100)),

				backgroundColor(negativeColor)
			),

			style('~ ui-container',
				alignItems('flex-start')
			)
		),

		child('ui-count',
			display('block'),
			marginBlock(rem(0.25))
		)
			.attribute('ui-pro', textAlign('left'))
			.attribute('ui-contra', textAlign('right')),

		child('ui-reasons',
			display('flex'),
			gap(rem(1)),

			child('ui-reason',
				flexBasis(0),
				flexGrow(1),

				display('block'),
				paddingBlock(rem(0.5)),
				paddingInline(rem(0.75)),
				marginTop(rem(1)),

				whiteSpace('pre-wrap'),

				color(pageTextColor),
				backgroundColor(pageBackgroundColor)
			)
				.attribute('ui-type', 'pro', marginRight('auto'))
				.attribute('ui-type', 'contra', marginLeft('auto'))
		)
	)
);
