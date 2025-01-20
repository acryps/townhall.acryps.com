import { aspectRatio, ch, child, display, fontWeight, marginBottom, marginInline, marginRight, objectFit, objectPosition, percentage, ratio, rem, Rem, textAlign, width } from "@acryps/style";
import { card } from "../shared/card.style";
import { collection, collectionItem } from "../shared/collection.style";

export const populationStyle = () => child('ui-residents',
	child('ui-picks',
		collection(rem(10), rem(1)),

		child('ui-resident',
			collectionItem(),
			card(),

			child('img',
				width(percentage(50)),
				aspectRatio(ratio(1, 1.5)),
				marginInline(percentage(25)),
				marginBottom(rem(0.25)),

				objectFit('cover'),
				objectPosition('top')
			),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.25)),

				fontWeight('bold'),
				textAlign('center'),

				child('ui-given-name',
					display('inline-block'),
					marginRight(ch(1))
				)
			),

			child('ui-age',
				display('block'),

				textAlign('center')
			)
		)
	)
);
