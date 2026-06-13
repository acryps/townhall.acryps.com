import { border, child, display, fontSize, fontStyle, marginBottom, padding, paddingInline, px, rem, textTransform, whiteSpace } from "@acryps/style";
import { pageGutter } from "../../index.style";

export const loreQueryStyle = () => child('ui-query',
	display('block'),

	child('ui-question',
		display('block'),
		marginBottom(pageGutter),

		child('ui-header',
			display('block'),
			marginBottom(rem(0.25)),

			fontSize(rem(0.8)),
			textTransform('uppercase')
		)
	),

	child('ui-answering',
		display('block'),

		fontStyle('italic')
	),

	child('ui-answer',
		display('block'),

		child('ui-answer',
			display('block'),
			marginBottom(pageGutter),

			whiteSpace('pre-wrap'),

			child('ui-header',
				display('block'),
				marginBottom(rem(0.25)),

				fontSize(rem(0.8)),
				textTransform('uppercase')
			)
		),

		child('ui-sources',
			display('block'),

			child('ui-header',
				display('block'),
				marginBottom(rem(0.25)),

				fontSize(rem(0.8)),
				textTransform('uppercase')
			),

			child('ui-source',
				display('block'),
				marginBottom(pageGutter),

				child('ui-relation',
					display('block'),
					marginBottom(rem(0.25))
				),

				child('ui-lore',
					display('block'),
					padding(pageGutter),

					border(px(1), 'solid', 'currentColor'),

					child('ui-tagline',
						display('block'),
						marginBottom(rem(0.25)),

						fontSize(rem(0.8))
					)
				)
			)
		)
	)
);
