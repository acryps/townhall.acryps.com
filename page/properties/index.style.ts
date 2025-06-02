import { alignContent, alignItems, alignSelf, aspectRatio, backgroundColor, ch, child, color, display, flexDirection, flexGrow, flexWrap, fontSize, fontWeight, gap, height, imageRendering, justifyContent, justifyItems, justifySelf, left, margin, marginBottom, marginInline, marginRight, marginTop, maxWidth, objectFit, objectPosition, overflow, padding, paddingBlock, paddingInline, percentage, position, ratio, rem, Rem, right, select, style, textAlign, top, width } from "@acryps/style";
import { card } from "../shared/card.style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageGutter } from "../index.style";
import { indexBackgroundColor, inputSpacingBlock, inputSpacingInline, inputStyle, inputTextColor } from "../shared/field.style";

export const propertiesStyle = () => child('ui-properties',
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
			backgroundColor(indexBackgroundColor),

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

	child('ui-properties',
		collection(rem(10), rem(1)),

		child('ui-property',
			collectionItem(),
			card(false),

			display('flex'),
			flexDirection('column'),
			overflow('hidden'),

			child('ui-map-container',
				width(percentage(100)),
				aspectRatio(ratio(4, 3))
			),

			child('ui-name',
				display('block'),
				margin(rem(1)),

				fontWeight('bold')
			),

			child('ui-tagline',
				flexGrow(1),

				display('flex'),
				justifyContent('space-between'),
				marginInline(rem(1))
			),

			child('ui-location-marker',
				margin(rem(1))
			)
		)
	)
);
