import { aspectRatio, child, display, flexDirection, flexGrow, fontSize, fontWeight, justifyContent, margin, marginBottom, marginInline, overflow, percentage, ratio, rem, textAlign, whiteSpace, width } from "@acryps/style";
import { card } from "../../shared/card.style";
import { collection, collectionItem } from "../../shared/collection.style";

export const companyStyle = () => child('ui-company',
	display('block'),

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
				margin(rem(1)),

				fontWeight('bold')
			),

			child('ui-capacity',
				display('block'),
				marginInline(rem(1)),
				marginBottom(rem(1))
			)
		)
	)
)
