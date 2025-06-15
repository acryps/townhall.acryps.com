import { caretColor, child, display, fontSize, fontWeight, marginBottom, rem } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageGutter } from "../index.style";
import { buttonStyle } from "../shared/index.style";
import { collection, collectionItem } from "../shared/collection.style";
import { card } from "../shared/card.style";
import { planStyle } from "./plan/index.style";
import { createPlanStyle } from "./create/index.style";

export const plansStyle = () => child('ui-plans',
	boxed(),

	createPlanStyle(),
	planStyle(),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2))
	),

	child('ui-hint',
		display('block'),
		marginBottom(pageGutter)
	),

	child('ui-actions',
		display('block'),
		marginBottom(pageGutter),

		child('ui-action',
			buttonStyle()
		)
	),

	child('ui-list',
		collection(rem(15), pageGutter),

		child('ui-plan',
			collectionItem(),
			card(),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.5)),

				fontWeight('bold')
			)
		)
	)
);
