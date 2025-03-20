import { backdropFilter, backgroundColor, blur, borderBottom, boxShadow, brightness, child, color, ColorValue, contrast, display, dropShadow, em, filter, fontFamily, fontSize, grayscale, hex, margin, outline, padding, position, px, rem, root, top, Variable, zIndex } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { bold, boldItalic, regular, regularItalic } from "./assets/font/index.style";
import { boroughStyle } from "./borough/index.style";
import { bannerStyle, createBannerStyle } from "./banner/index.style";
import { iconFont, icons } from "./assets/icons/managed";
import { articleStyle, newsStyle, publicationStyle } from "./news/index.style";
import { populationStyle } from "./population/index.style";
import { residentStyle } from "./resident/index.style";
import { mapStyle as mapPageStyle } from "./map/index.style";
import { navigationBackgroundColor, navigationBorderColor, pageBackgroundColor, pageGutter, pageTextColor } from "./index.style";
import { propertyStyle } from "./properties/property/index.style";
import { mapStyle } from "./shared/map/index.style";
import { chatStyle } from "./resident/chat/index.style";
import { voteStyle } from "./vote/index.style";
import { lawHouseStyle } from "./law-house/index.style";
import { residentBadgeListStyle } from "./shared/resident-badge-list/index.style";
import { companyOfficeStyle } from "./company-office/index.style";
import { propertiesStyle } from "./properties/index.style";
import { locationMarkerStyle } from "./shared/location/index.style";

export const pageStyle = () => root(
	bold,
	boldItalic,
	regular,
	regularItalic,

	iconFont,
	icons(),

	fontFamily(regular.name),

	bannerStyle(),
	mapStyle(),
	residentBadgeListStyle(),
	locationMarkerStyle(),

	child('body',
		padding(0),
		margin(0),

		color(pageTextColor),
		backgroundColor(navigationBackgroundColor),

		child('ui-page',
			display('block'),

			backgroundColor(pageBackgroundColor),

			child('ui-navigation',
				position('sticky'),
				top(0),
				zIndex(100),

				display('flex'),
				padding(pageGutter),

				backgroundColor(navigationBackgroundColor),
				borderBottom(px(2), 'solid', navigationBorderColor),

				child('ui-logo',
					fontSize(rem(1.5))
				)
			),

			child('ui-content',
				display('block'),
				padding(pageGutter),

				homeStyle(),

				mapPageStyle(),

				boroughStyle(),

				propertyStyle(),
				propertiesStyle(),

				newsStyle(),
				publicationStyle(),
				articleStyle(),

				populationStyle(),
				residentStyle(),

				voteStyle(),

				lawHouseStyle(),

				companyOfficeStyle(),

				createBannerStyle(),
			)
		)
	)
)
