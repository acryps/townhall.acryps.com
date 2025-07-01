import { alignItems, backdropFilter, backgroundColor, blur, borderBottom, boxShadow, brightness, child, color, ColorValue, contrast, cursor, display, dropShadow, em, filter, fontFamily, fontSize, grayscale, hex, margin, marginLeft, outline, padding, position, px, rem, root, textAlign, top, Variable, zIndex } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { boldFont, boldItalicFont, headlineFont, microFont, regularFont, regularItalicFont } from "./assets/font/index.style";
import { boroughStyle } from "./borough/index.style";
import { bannerStyle, createBannerStyle } from "./banner/index.style";
import { iconFont, icons } from "./assets/icons/managed";
import { newsStyle, publicationStyle } from "./news/index.style";
import { populationStyle } from "./population/index.style";
import { residentStyle } from "./resident/index.style";
import { mapStyle as mapPageStyle } from "./map/index.style";
import { navigationBackgroundColor, navigationBorderColor, pageBackgroundColor, pageGutter, pageTextColor } from "./index.style";
import { propertyStyle } from "./properties/property/index.style";
import { mapStyle } from "./shared/map/index.style";
import { voteStyle } from "./vote/index.style";
import { lawHouseStyle } from "./law-house/index.style";
import { residentBadgeListStyle } from "./shared/resident-badge-list/index.style";
import { companyOfficeStyle } from "./company-office/index.style";
import { propertiesStyle } from "./properties/index.style";
import { locationMarkerStyle } from "./shared/location/index.style";
import { registerBoroughStyle } from "./borough/register/index.style";
import { writeArticleStyle } from "./news/write/index.style";
import { annotatedTextStyle } from "./shared/annotaded-text/index.style";
import { streetStyle } from "./street/index.style";
import { legalEntitySelectorStyle } from "./shared/legal-entity/select/index.style";
import { articleStyle } from "./news/article/index.style";
import { valuationStyle } from "./trade/valuation/index.style";
import { mapStartStyle } from "./map/start/index.style";
import { assetsStyle } from "./trade/assets/index.style";
import { metricsStyle } from "./metrics/index.style";
import { trainStyle } from "./train/index.style";
import { trainRouteIconStyle } from "./shared/train-route/index.style";
import { plansStyle } from "./plans/index.style";
import { oracleStyle } from "./oracle/index.style";
import { timeStyle } from "./time/index.style";

export const pageStyle = () => root(
	boldFont,
	boldItalicFont,
	regularFont,
	regularItalicFont,

	iconFont,
	icons(),

	fontFamily(regularFont.name),

	bannerStyle(),
	mapStyle(),
	residentBadgeListStyle(),
	locationMarkerStyle(),
	annotatedTextStyle(),
	legalEntitySelectorStyle(),
	trainRouteIconStyle(),

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
				alignItems('center'),
				padding(pageGutter),

				backgroundColor(navigationBackgroundColor),
				borderBottom(px(2), 'solid', navigationBorderColor),

				child('ui-logo',
					fontSize(rem(1.5))
				),

				child('ui-timer',
					marginLeft('auto'),

					fontSize(rem(0.8)),
					textAlign('right'),

					cursor('pointer'),

					child('ui-date',
						display('block')
					),

					child('ui-time',
						display('block')
					)
				)
			),

			child('ui-content',
				display('block'),
				padding(pageGutter),

				homeStyle(),

				mapPageStyle(),
				mapStartStyle(),

				boroughStyle(),
				registerBoroughStyle(),

				propertyStyle(),
				propertiesStyle(),

				newsStyle(),
				publicationStyle(),
				articleStyle(),
				writeArticleStyle(),

				oracleStyle(),

				metricsStyle(),

				populationStyle(),
				residentStyle(),

				timeStyle(),

				streetStyle(),

				trainStyle(),

				voteStyle(),

				plansStyle(),

				valuationStyle(),
				assetsStyle(),

				lawHouseStyle(),

				companyOfficeStyle(),

				createBannerStyle(),
			)
		)
	)
)
