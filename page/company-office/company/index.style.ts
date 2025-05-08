import { aspectRatio, backgroundColor, child, color, display, flexDirection, flexGrow, fontSize, fontWeight, justifyContent, margin, marginBottom, marginInline, overflow, padding, percentage, ratio, rem, textAlign, whiteSpace, width } from "@acryps/style";
import { card } from "../../shared/card.style";
import { collection, collectionItem } from "../../shared/collection.style";
import { infoColor, pageBackgroundColor, pageTextColor, positiveColor } from "../../index.style";
import { headerBannerStyle } from "../../banner/index.style";

export const companyStyle = () => child('ui-company',
	display('block'),

	child('ui-alert',
		display('block'),
		padding(rem(1)),
		marginBottom(rem(2)),

		backgroundColor(infoColor)
	),

	headerBannerStyle(),

	child('ui-name',
		display('block'),

		fontSize(rem(2)),
		fontWeight('bold'),
		textAlign('center')
	),

	child('ui-type',
		display('block'),
		marginBottom(rem(1)),

		fontWeight('bold'),
		textAlign('center')
	),

	child('ui-purpose',
		display('block'),
		marginBottom(rem(1)),

		textAlign('center')
	),

	child('ui-founding',
		display('block'),
		marginBottom(rem(2)),

		textAlign('center')
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(1)),

		whiteSpace('pre-wrap')
	),

	child('ui-offices',
		collection(rem(10), rem(1)),

		child('ui-office',
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
				margin(rem(1))
			)
		)
	)
)
