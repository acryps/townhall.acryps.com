import { aspectRatio, child, display, flexDirection, fontSize, fontWeight, margin, marginBottom, marginTop, overflow, percentage, ratio, rem, Rem, textAlign, whiteSpace, width } from "@acryps/style";
import { pageGutter } from "../../index.style";
import { headerBannerStyle } from "../../banner/index.style";
import { collection, collectionItem } from "../../shared/collection.style";
import { card } from "../../shared/card.style";

export const unitStyle = () => child('ui-unit',
	display('block'),

	child('ui-army',
		display('block'),
		marginBottom(pageGutter)
	),

	headerBannerStyle('flex-start'),

	child('ui-code',
		display('block'),
		marginBottom(rem(0.25)),

		fontSize(rem(1.5)),
		fontWeight('bold')
	),

	child('ui-name',
		display('block'),
		marginBottom(pageGutter),

		fontSize(rem(2))
	),

	child('ui-description',
		display('block'),
		marginBottom(pageGutter),

		whiteSpace('pre-wrap')
	),

	child('ui-date',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-facilities',
		collection(rem(10), rem(1)),
		marginBottom(pageGutter),

		child('ui-facility',
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
			)
		)
	),

	child('ui-hierarchy',
		display('block'),
		marginTop(pageGutter)
	)
);
