import { alignItems, backgroundColor, child, color, display, flexWrap, gap, height, lineHeight, marginInline, objectFit, objectPosition, padding, rem, select, width } from "@acryps/style";
import { pageBackgroundColor, pageTextColor } from "../../index.style";

export const residentBadgeListStyle = () => select('ui-resident-badge-list',
	display('flex'),
	flexWrap('wrap'),
	gap(rem(0.5)),

	child('ui-resident',
		display('flex'),
		alignItems('flex-end'),
		lineHeight(1),

		color(pageBackgroundColor),
		backgroundColor(pageTextColor),

		child('img',
			height(rem(1.25)),
			width(rem(1)),
			marginInline(rem(0.5)),

			objectFit('cover'),
			objectPosition('top')
		),

		child('ui-name',
			padding(rem(0.25))
		)
	)
)
