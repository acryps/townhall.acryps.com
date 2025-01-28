import { alignItems, aspectRatio, bottom, child, display, flexDirection, fontSize, fontWeight, height, margin, marginBlock, marginBottom, ratio, rem, textAlign } from "@acryps/style";
import { collection, collectionItem } from "../../shared/collection.style";
import { pageGutter } from "../../index.style";
import { card } from "../../shared/card.style";

export const createFeatureStyle = () => child('ui-create-feature',
	display('block'),

	child('ui-map-container',
		aspectRatio(ratio(4, 3)),

		margin(pageGutter.invert()),
		marginBottom(pageGutter)
	),

	child('ui-metrics',
		collection(rem(10), rem(1)),
		marginBottom(rem(2)),

		child('ui-metric',
			collectionItem(),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.5))
			),

			child('ui-value',
				display('block'),

				fontSize(rem(1.5))
			)
		)
	),

	child('ui-types',
		collection(rem(10), rem(1)),
		marginBottom(rem(2)),

		child('ui-type',
			collectionItem(),
			card(),

			display('flex'),
			flexDirection('column'),
			alignItems('center'),

			child('ui-icon',
				fontSize(rem(3))
			),

			child('ui-name',
				display('block'),
				marginBlock(rem(0.5)),

				textAlign('center')
			)
		)
	)
);
