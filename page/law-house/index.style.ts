import { child, display, fontSize, fontWeight, height, margin, marginBottom, marginInline, marginTop, maxHeight, objectFit, percentage, rem, vh, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageGutter } from "../index.style";
import { card } from "../shared/card.style";
import { sessionStyle } from "./session/index.style";

export const lawHouseStyle = () => child('ui-law-house',
	display('block'),

	sessionStyle(),

	child('img',
		width(percentage(100).add(pageGutter).add(pageGutter)),
		maxHeight(vh(50)),
		margin(pageGutter.invert()),
		marginBottom(rem(1)),

		objectFit('cover')
	),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2))
	),

	child('ui-description',
		display('block'),
		marginBottom(rem(1)),
	),

	child('ui-sessions',
		display('block'),
		marginTop(pageGutter),

		child('ui-title',
			display('block'),
			marginBottom(rem(0.5)),

			fontWeight('bold')
		),

		child('ui-sessions',
			collection(rem(10), pageGutter),

			child('ui-session',
				collectionItem(),
				card(),

				child('ui-time',
					display('block'),
					marginBottom(rem(0.5))
				)
			)
		)
	)
);
