import { child, display, Dvi, fontSize, fontWeight, marginBottom, rem } from "@acryps/style";
import { collection, collectionItem } from "../../shared/collection.style";
import { card } from "../../shared/card.style";

export const workOfferStyle = () => child('ui-work-offer',
	display('block'),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(1.5))
	),

	child('ui-task',
		display('block'),
		marginBottom(rem(1.5)),
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(2))
	),

	child('ui-contracts',
		collection(rem(15), rem(1)),

		child('ui-contract',
			collectionItem(),
			card(),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.75)),

				fontWeight('bold')
			),

			child('ui-match',
				display('block'),
				marginBottom(rem(1))
			),

			child('ui-timespan',
				display('block')
			)
		)
	)
);
