import { aspectRatio, child, display, flexBasis, flexGrow, flexWrap, fontSize, fontWeight, gap, marginBottom, objectFit, padding, paddingBlock, paddingInline, percentage, ratio, rem, width } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { collection, collectionItem } from "../../shared/collection.style";
import { pageGutter } from "../../index.style";
import { card } from "../../shared/card.style";
import { buttonStyle } from "../../shared/index.style";

export const mapStartStyle = () => child('ui-map-start',
	boxed(),

	child('ui-actions',
		display('flex'),
		flexWrap('wrap'),
		gap(pageGutter),
		marginBottom(pageGutter),

		child('ui-action',
			buttonStyle()
		)
	),

	child('ui-cities',
		collection(rem(20), pageGutter),

		child('ui-city',
			collectionItem(),
			card(false),

			child('img',
				width(percentage(100)),
				aspectRatio(ratio(2, 1)),

				objectFit('cover')
			),

			child('ui-detail',
				display('block'),
				paddingInline(pageGutter),
				paddingBlock(pageGutter.divide(2)),

				child('ui-name',
					display('block'),
					marginBottom(rem(0.5)),

					fontWeight('bold')
				),

				child('ui-incorporation',
					display('block'),

					fontSize(rem(0.8))
				)
			)
		)
	)
);
