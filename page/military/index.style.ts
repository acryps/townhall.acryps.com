import { alignItems, border, child, color, display, fontSize, fontWeight, gap, height, hex, lineHeight, marginBottom, marginLeft, marginTop, opacity, px, rem, select, textDecoration, textDecorationLine } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { topicHeaderStyle } from "../shared/topic-header.style";
import { pageGutter } from "../index.style";
import { bannerStyle } from "../banner/index.style";
import { unitStyle } from "./unit/index.style";

export const militaryStyle = () => child('ui-military',
	boxed(),

	unitStyle(),

	topicHeaderStyle(),

	child('ui-title',
		display('block'),
		marginBottom(rem(1)),

		fontSize(rem(2)),
		fontWeight('bold')
	),

	child('ui-guide',
		display('block'),
		marginBottom(rem(1))
	),

	child('ui-army',
		display('block'),
		marginTop(pageGutter)
	),

	select('ui-unit-hierarchy',
		display('block'),

		child('ui-header',
			display('flex'),
			alignItems('center'),
			gap(rem(0.5)),
			marginBottom(rem(0.25)),

			bannerStyle(),

			child('ui-banner',
				fontSize(0),
				border(px(1), 'solid', 'currentColor'),

				child('img',
					height(rem(1.75))
				)
			),

			child('ui-code',
				fontWeight('bold')
			)
		),

		child('ui-subunits',
			display('block'),
			marginLeft(rem(2)),
			marginBottom(rem(0.5))
		)
	)
		.attribute('ui-disbanded',
			color(hex('666')),

			select('ui-name',
				textDecorationLine('line-through')
			)
		)
		.attribute('ui-highlight',
			child('ui-header',
				fontWeight('bold')
			)
		)
);
