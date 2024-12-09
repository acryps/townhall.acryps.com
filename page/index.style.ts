import { backgroundColor, boxShadow, child, ColorValue, display, dropShadow, em, filter, fontFamily, hex, margin, padding, position, px, rem, root, top, Variable, zIndex } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { bold, boldItalic, regular, regularItalic } from "./assets/font/index.style";
import { boroughStyle } from "./borough/index.style";
import { bannerStyle, createBannerStyle } from "./banner/index.style";
import { iconFont, icons } from "./assets/icons/managed";
import { articleStyle, newsStyle, publicationStyle } from "./news/index.style";
import { residentsStyle } from "./residents/index.style";
import { residentStyle } from "./resident/index.style";
import { mapStyle } from "./map/index.style";

export const pageStyle = () => root(
	bold,
	boldItalic,
	regular,
	regularItalic,

	iconFont,
	icons(),

	fontFamily(regular.name),

	bannerStyle(),

	child('body',
		padding(0),
		margin(0),

		child('ui-page',
			display('block'),

			child('ui-header',
				position('sticky'),
				top(0),
				zIndex(100),

				display('block'),
				padding(rem(1)),
				backgroundColor(hex('#fff9')),
			),

			child('ui-content',
				display('block'),
				padding(rem(1)),

				homeStyle(),

				mapStyle(),

				boroughStyle(),

				newsStyle(),
				publicationStyle(),
				articleStyle(),

				residentStyle(),
				residentsStyle(),

				createBannerStyle(),
			)
		)
	)
)
