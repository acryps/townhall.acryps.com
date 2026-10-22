import { child, display, fontSize, gap, marginBottom, rem } from "@acryps/style";
import { boxed } from "../../../shared/boxed.style";

export const pendingDraftsStyle = () => child('ui-pending-drafts',
	boxed(),

	child('ui-guide',
		display('block'),
		marginBottom(rem(1.5))
	),

	child('ui-draft',
		display('block'),
		marginBottom(rem(1)),

		child('ui-title',
			display('block'),

			fontSize(rem(1.25))
		),

		child('ui-publication',
			display('block'),
			gap(rem(0.5)),

			fontSize(rem(0.8))
		)
	)
);
