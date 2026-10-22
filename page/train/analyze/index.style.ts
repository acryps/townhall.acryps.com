import { alignItems, backgroundColor, child, color, display, fontSize, fontWeight, gap, height, marginBottom, objectFit, objectPosition, rem, width } from "@acryps/style";
import { card } from "../../shared/card.style";
import { collection } from "../../shared/collection.style";
import { pageGutter, pageTextColor } from "../../index.style";

export const analyzeTrainTrafficStyle = () => child('ui-analyze',
	display('block'),

	child('ui-header',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-samples',
		collection(rem(16), pageGutter),

		child('ui-sample',
			card(),

			child('ui-map-container',
				height(rem(10)),
				marginBottom(rem(1))
			),

			child('ui-resident',
				display('flex'),
				alignItems('center'),
				gap(rem(0.5)),
				marginBottom(rem(0.5)),

				child('img',
					height(rem(2)),
					width(rem(1.6)),

					objectFit('cover'),
					objectPosition('top'),

					backgroundColor(pageTextColor)
				),

				child('ui-name',
					fontWeight('bold'),
					color(pageTextColor)
				)
			),

			child('ui-purpose',
				display('block'),
				color(pageTextColor)
			)
		)
	)
);
