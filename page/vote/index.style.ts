import { backgroundColor, border, child, color, display, fontSize, fontWeight, marginBottom, marginTop, padding, px, rem } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { proposeBillStyle } from "./propose/index.style";
import { honestiumStyle } from "./honestium/index.style";
import { billStyle } from "./bill/index.style";
import { collection, collectionItem } from "../shared/collection.style";
import { billBackgroundColor, billTextColor, pageGutter } from "../index.style";
import { card } from "../shared/card.style";
import { buttonStyle } from "../shared/index.style";

export const voteStyle = () => child('ui-vote',
	boxed(),

	proposeBillStyle(),
	honestiumStyle(),
	billStyle(),

	child('ui-open-bills', billSectionStyle()),
	child('ui-certified-bills', billSectionStyle()),

	child('ui-actions',
		display('block'),

		child('ui-action',
			buttonStyle()
		)
	)
)

const billSectionStyle = () => [
	display('block'),
	marginBottom(pageGutter),

	child('ui-header',
		display('block'),
		fontWeight('bold'),
		marginBottom(rem(0.5))
	),

	child('ui-hint',
		display('block'),
		marginBottom(rem(1))
	),

	child('ui-bills',
		collection(rem(15), pageGutter),

		child('ui-bill',
			collectionItem(),
			padding(rem(1)),

			color(billTextColor),
			backgroundColor(billBackgroundColor),

			child('ui-tag',
				display('block'),
				marginBottom(rem(0.5)),

				fontSize(rem(0.8))
			),

			child('ui-title',
				display('block'),
				marginBottom(rem(0.25)),

				fontWeight('bold')
			),

			child('ui-scope',
				display('block')
			),

			child('ui-summary',
				display('block'),
				marginTop(rem(1))
			)
				.empty(display('none')),

			child('ui-result',
				display('block'),
				marginTop(rem(1)),

				child('ui-pro',
					display('block'),
					marginBottom(rem(0.25)),

					fontSize(rem(1.5))
				),

				child('ui-time',
					display('block'),

					fontSize(rem(0.8))
				)
			)
		)
	)
]
