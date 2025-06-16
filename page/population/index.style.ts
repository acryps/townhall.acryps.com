import { aspectRatio, backgroundColor, ch, child, color, display, flexWrap, fontSize, fontWeight, gap, left, marginBottom, marginInline, marginRight, marginTop, maxWidth, objectFit, objectPosition, paddingBlock, paddingInline, percentage, position, ratio, rem, Rem, right, select, style, textAlign, top, width } from "@acryps/style";
import { card } from "../shared/card.style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageGutter } from "../index.style";
import { inputBackgroundColor, inputSpacingBlock, inputSpacingInline, inputStyle, inputTextColor } from "../shared/field.style";
import { nameFrequencies } from "./names/index.style";
import { boxed } from "../shared/boxed.style";
import { buttonStyle } from "../shared/index.style";

export const populationStyle = () => child('ui-residents',
	boxed(),

	nameFrequencies(),

	child('ui-actions',
		display('block'),
		marginBottom(pageGutter),

		child('ui-action',
			buttonStyle()
		)
	),

	child('ui-search',
		display('block'),
		marginBottom(pageGutter),

		position('relative'),

		child('input',
			inputStyle(),

			width(percentage(100)),
			maxWidth(rem(30))
		),

		select('input:focus ~ ui-results',
			display('block'),
		),

		child('ui-results',
			display('none'),

			position('absolute'),
			top(percentage(100)),
			left(0),
			right(0),

			color(inputTextColor),
			backgroundColor(inputBackgroundColor),

			child('ui-result',
				display('block'),
				paddingBlock(inputSpacingBlock),
				paddingInline(inputSpacingInline),

				child('ui-name',
					display('block'),
				),

				child('ui-detail',
					display('flex'),
					gap(rem(1)),
					flexWrap('wrap'),

					fontSize(rem(0.8))
				)
			)
		)
			.hover(display('block'))
	),

	child('ui-ticker',
		display('block'),
		marginBottom(pageGutter),

		child('ui-header',
			display('block'),

			fontWeight('bold')
		),

		child('ui-event',
			display('block'),
			marginTop(rem(0.25)),

			child('ui-action',
				display('block')
			),

			child('ui-time',
				display('block'),
				fontSize(rem(0.65))
			)
		)
	),

	child('ui-picks',
		collection(rem(10), rem(1)),

		child('ui-resident',
			collectionItem(),
			card(),

			child('img',
				width(percentage(50)),
				aspectRatio(ratio(1, 1.5)),
				marginInline(percentage(25)),
				marginBottom(rem(0.25)),

				objectFit('cover'),
				objectPosition('top')
			),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.25)),

				fontWeight('bold'),
				textAlign('center'),

				child('ui-given-name',
					display('inline-block'),
					marginRight(ch(1))
				)
			),

			child('ui-age',
				display('block'),

				textAlign('center')
			)
		)
	)
);
