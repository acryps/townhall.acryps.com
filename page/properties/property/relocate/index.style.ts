import { aspectRatio, backgroundColor, child, cursor, display, flexDirection, fontSize, fontWeight, gap, hex, justifyContent, marginBottom, opacity, overflow, padding, percentage, ratio, rem, width } from "@acryps/style";
import { card } from "../../../shared/card.style";
import { collection, collectionItem } from "../../../shared/collection.style";
import { pageGutter } from "../../../index.style";
import { buttonStyle } from "../../../shared/index.style";

export const relocateDwellingStyle = () => child('ui-relocate-dwelling',
	display('block'),

	child('ui-guide',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-candidates',
		collection(rem(12), rem(1)),
		marginBottom(pageGutter),

		child('ui-candidate',
			collectionItem(),
			card(false),

			display('flex'),
			flexDirection('column'),
			overflow('hidden'),

			cursor('pointer'),

			child('ui-map-container',
				width(percentage(100)),
				aspectRatio(ratio(4, 3))
			),

			child('ui-details',
				display('block'),
				padding(pageGutter),

				child('ui-name',
					display('block'),
					marginBottom(rem(0.25)),

					fontWeight('bold')
				),

				child('ui-tagline',
					display('flex'),
					justifyContent('space-between'),
					marginBottom(rem(0.25)),

					fontSize(rem(0.85))
				),

				child('ui-distance',
					display('block'),
					marginBottom(rem(0.5)),

					opacity(0.7),
					fontSize(rem(0.85))
				),

				child('ui-owners',
					display('flex'),
					flexDirection('column'),
					gap(rem(0.25))
				)
			)
		)
			.hover(
				backgroundColor(hex('ddd'))
			)
			.attribute('ui-disabled',
				opacity(0.5),
				cursor('default')
			)
	),

	child('ui-action',
		buttonStyle()
	)
);
