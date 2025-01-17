import { alignItems, alignSelf, background, backgroundColor, border, borderBottom, borderRadius, borderTop, borderTopWidth, bottom, ch, child, color, columnGap, display, flexDirection, flexGrow, flexShrink, fontFamily, fontSize, height, insetInline, justifySelf, marginBottom, marginInline, marginRight, maxHeight, maxWidth, objectFit, opacity, outline, overflow, padding, paddingBlock, paddingBottom, paddingInline, percentage, position, Px, px, rem, resize, svh, textAlign, top, transform, translateY, Variable, vh, whiteSpace, width } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { navigationBackgroundColor, navigationBorderColor, pageBackgroundColor, pageGutter, pageTextColor } from "../../index.style";
import { fieldStyle } from "../../shared/field.style";

export const pusher = new Variable<Px>('pusher');

export const chatStyle = () => child('ui-chat',
	boxed(),

	pusher,

	child('ui-resident',
		display('block'),
		marginBottom(rem(2)),

		child('img',
			display('block'),
			width(percentage(50)),
			maxHeight(vh(20)),
			marginInline('auto'),
			marginBottom(rem(1.5)),

			objectFit('contain')
		),

		child('ui-name',
			display('block'),
			marginBottom(rem(1)),

			textAlign('center'),
			fontSize(rem(2)),

			child('ui-given-name',
				display('inline-block'),
				marginRight(ch(1))
			)
		),

		child('ui-age',
			display('block'),
			textAlign('center'),
			marginBottom(rem(1))
		),

		child('ui-legal',
			display('block'),
			textAlign('center'),

			fontSize(rem(0.65))
		)
	),

	child('ui-interactions',
		display('block'),
		marginBottom(pusher.add(pageGutter)),

		child('ui-interaction',
			display('flex'),
			flexDirection('column'),

			child('ui-message',
				display('block'),
				maxWidth(percentage(80)),
				marginBottom(rem(1)),
				paddingBlock(rem(0.5)),
				paddingInline(rem(0.75)),

				color(pageBackgroundColor),
				backgroundColor(pageTextColor),
				whiteSpace('pre-wrap')
			)
				.attribute('ui-user', alignSelf('flex-end'))
				.attribute('ui-resident', alignSelf('flex-start')),

			child('ui-information-request',
				display('block'),
				maxWidth(percentage(80)),
				marginBottom(rem(0.5)),

				fontSize(rem(0.75))
			),

			child('ui-thinking',
				display('block'),
				width(rem(4)),
				height(rem(1)),

				color(pageBackgroundColor),
				backgroundColor(pageTextColor),

				opacity(0.5)
			)
		)
	),

	child('ui-input',
		position('fixed'),
		insetInline(0),
		bottom(0),

		display('block'),
		padding(pageGutter),

		color(pageTextColor),
		backgroundColor(navigationBackgroundColor),

		borderTop(px(1), 'solid', navigationBorderColor),

		child('ui-container',
			boxed(),

			display('flex'),
			alignItems('flex-end'),
			columnGap(pageGutter),

			child('textarea',
				flexGrow(1),

				fieldStyle()
			),

			child('ui-action',
				flexShrink(0),
				marginRight(pageGutter)
			)
		)
	)
);
