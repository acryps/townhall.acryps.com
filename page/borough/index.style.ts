import { alignItems, alignSelf, aspectRatio, backgroundColor, border, borderBottom, boxSizing, child, display, flexBasis, flexGrow, flexShrink, fontSize, fontWeight, fr, gap, gridTemplateColumns, height, hex, imageRendering, justifyContent, marginBottom, marginInline, marginLeft, marginTop, maxHeight, maxWidth, min, minMax, minWidth, objectFit, objectPosition, opacity, overflow, overflowWrap, padding, paddingInline, paddingRight, percentage, px, ratio, rem, tabSize, textAlign, vh, whiteSpace, width, wordBreak } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { bannerBorder, bannerStyle, headerBannerStyle } from "../banner/index.style";
import { collection, collectionItem } from "../shared/collection.style";
import { pageGutter } from "../index.style";
import { buttonGroupStyle, buttonStyle } from "../shared/index.style";
import { microFont } from "../assets/font/index.style";
import { tabsStyle } from "../shared/tabs/index.style";
import { Banner } from "../../interface/banner";
import { mapStyle } from "../shared/map/index.style";

const minimapSize = rem(10);

export const boroughStyle = () => child('ui-borough',
	boxed(),

	child('ui-header',
		display('grid'),
		gridTemplateColumns('auto', minMax(0, fr(1))),
		alignItems('stretch'),
		gap(pageGutter),
		marginBottom(pageGutter),

		child('ui-banner',
			overflow('hidden'),
			height(percentage(100)),
			aspectRatio(ratio(Banner.width, Banner.height)),
			maxHeight(rem(7)),

			bannerStyle(),

			child('img',
				display('block'),
				width(percentage(100)),
				boxSizing('border-box'),

				bannerBorder()
			)
		),

		child('ui-detail',
			minWidth(0),

			child('ui-name',
				display('block'),
				marginBottom(rem(0.5)),

				fontSize(rem(2))
			),

			child('ui-incorporation',
				display('block'),
				marginBottom(rem(0.25))
			),

			child('ui-district',
				display('block')
			)
		)
	),

	tabsStyle(
		child('ui-about',
			display('block'),

			child('ui-actions',
				buttonGroupStyle(),
				marginBottom(rem(1)),

				child('ui-action',
					buttonStyle()
				)
			),

			child('ui-description',
				display('block'),
				marginBottom(rem(2)),

				whiteSpace('pre-wrap')
			),

			child('ui-metrics',
				collection(rem(10), pageGutter),

				child('ui-metric',
					collectionItem(),

					child('ui-name',
						display('block'),
						marginBottom(rem(0.25))
					),

					child('ui-value',
						display('block'),

						fontSize(rem(1.5))
					)
				)
			)
		),

		child('ui-boundary',
			display('block'),

			child('ui-map-container',
				width(percentage(100)),
				aspectRatio(ratio(1, 1)),
				marginBottom(pageGutter)
			)
		),

		child('ui-properties',
			display('block'),

			border(px(1), 'solid', 'currentColor'),

			child('ui-property',
				display('flex'),
				padding(pageGutter),

				borderBottom(px(1), 'dotted', 'currentColor'),

				child('ui-detail',
					child('ui-name',
						display('block'),
						marginBottom(rem(0.25)),

						fontWeight('bold')
					),

					child('ui-size',
						display('block')
					),

					child('ui-historic-listing',
						display('block'),
						marginTop(rem(0.5))
					)
				),

				child('canvas',
					marginLeft('auto'),
					height(rem(5)),
					width(rem(8)),

					objectFit('contain'),
					objectPosition('right'),
					imageRendering('pixelated')
				)
			)
				.attribute('ui-deactivated',
					opacity(0.4)
				)
		),

		child('ui-offices',
			child('ui-office',
				display('flex'),
				marginBottom(pageGutter),

				border(px(1), 'solid', 'currentColor'),

				child('ui-detail',
					flexGrow(1),
					padding(pageGutter),

					child('ui-office',
						display('block')
					),

					child('ui-company',
						display('block'),

						fontWeight('bold')
					),

					child('ui-purpose',
						display('block'),
						marginTop(rem(0.25))
					),

					child('ui-offers',
						flexGrow(1),

						display('table'),
						marginTop(pageGutter),

						child('ui-offer',
							display('table-row'),
							marginBottom(rem(0.25)),

							child('ui-count',
								display('table-cell'),
								paddingRight(rem(0.5)),

								textAlign('right')
							),

							child('ui-title',
								display('table-cell'),

								wordBreak('break-word')
							)
						)
					),

					child('ui-more',
						display('block'),
						marginTop(rem(0.25)),

						fontSize(rem(0.8))
					)
				),

				child('ui-map',
					flexShrink(0),

					display('flex'),
					width(minimapSize),

					child('ui-map-container',
						width(percentage(100)),
						aspectRatio(ratio(1, 1))
					)
				)
			)
		)
	)
)
