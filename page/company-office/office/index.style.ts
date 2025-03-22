import { alignItems, alignSelf, child, display, flexDirection, fontSize, fontWeight, justifyContent, marginBottom, marginLeft, overflow, rem, whiteSpace, wordBreak } from "@acryps/style";
import { buttonStyle } from "../../shared/index.style";
import { collection, collectionItem } from "../../shared/collection.style";
import { card } from "../../shared/card.style";

export const officeStyle = () => child('ui-office',
	display('block'),

	child('ui-company',
		display('block'),
		marginBottom(rem(0.5))
	),

	child('ui-name',
		display('block'),
		marginBottom(rem(0.5)),

		fontWeight('bold'),
		fontSize(rem(1.5))
	),

	child('ui-location',
		display('block'),
		marginBottom(rem(1.5))
	),

	child('ui-capacity',
		display('flex'),
		alignItems('center'),
		marginBottom(rem(1.5)),

		child('ui-metrics',
			display('flex'),
			flexDirection('column'),
			justifyContent('center')
		),

		child('ui-action',
			marginLeft('auto'),
			buttonStyle()
		)
	),

	child('ui-work-offers',
		collection(rem(15), rem(1)),

		child('ui-offer',
			collectionItem(),
			card(),

			display('flex'),

			child('ui-role',
				fontWeight('bold'),
				overflow('hidden')
			),

			child('ui-count',
				marginLeft('auto')
			)
		)
	)
);
