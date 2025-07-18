import { child, display, fontSize, fontWeight, marginBottom, marginTop, rem, Rem, textAlign, whiteSpace } from "@acryps/style";
import { pageGutter } from "../../index.style";
import { headerBannerStyle } from "../../banner/index.style";

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

	child('ui-hierarchy',
		display('block'),
		marginTop(pageGutter)
	)
);
