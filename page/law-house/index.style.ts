import { borderTop, child, cursor, display, fontSize, fontWeight, height, margin, marginBottom, marginInline, marginTop, maxHeight, minWidth, objectFit, percentage, pointerEvents, rem, textDecoration, textDecorationLine, vh, width } from "@acryps/style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageGutter } from "../index.style";
import { card } from "../shared/card.style";
import { sessionStyle } from "./session/index.style";
import { topicHeaderStyle } from "../shared/topic-header.style";
import { boxed } from "../shared/boxed.style";

export const lawHouseStyle = () => child('ui-law-house',
	display('block'),
	boxed(),

	sessionStyle(),

	topicHeaderStyle(),

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

		child('ui-calendar',
			display('block'),

			child('ui-day',
				display('block'),
				marginBottom(pageGutter),

				child('ui-date',
					display('block'),
					marginBottom(rem(0.5))
				),

				child('ui-districts',
					collection(rem(10), pageGutter),

					child('ui-district',
						collectionItem(),
						card(),

						child('ui-name',
							display('block'),
							marginBottom(rem(0.5))
						),

						child('ui-sessions',
							display('block'),

							child('ui-session',
								display('block'),
								marginTop(rem(0.2)),

								cursor('pointer'),
								textDecorationLine('underline')
							)
						)
					)
				)
			)
		)
	)
);
