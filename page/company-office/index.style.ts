import { alignItems, backgroundColor, child, color, columnGap, display, fontSize, fontWeight, margin, marginBottom, padding, rem } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { pageBackgroundColor, pageGutter, pageTextColor } from "../index.style";
import { registerCompanyStyle } from "./register/index.style";
import { companyStyle } from "./company/index.style";

export const companyOfficeStyle = () => child('ui-company-office',
	boxed(),

	registerCompanyStyle(),
	companyStyle(),

	child('ui-header',
		display('flex'),
		alignItems('center'),
		columnGap(rem(1)),

		padding(pageGutter),
		margin(pageGutter.invert()),
		marginBottom(pageGutter),

		color(pageBackgroundColor),
		backgroundColor(pageTextColor)
	),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2)),
		fontWeight('bold')
	),

	child('ui-guide',
		display('block'),
		marginBottom(rem(1))
	)
)
