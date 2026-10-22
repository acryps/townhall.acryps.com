import { Component } from "@acryps/page";
import { AskViewModel, BidViewModel, CommodityRatingChartModel, CommodityRatingViewModel, CommodityViewModel, MarketService } from "../../managed/services";
import { Time } from "../../../interface/time";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { positionIntensity } from "./index.style";
import { percentage } from "@acryps/style";
import { convertToCurrency } from "../../../interface/currency";
import { formatTradingUnit } from "../../../interface/trading-unit";
import { Tabs } from "../../shared/tabs";
import { CommodityPositionsTab } from "./positions";
import { CommodityDemandTab } from "./demand";
import { CommodityStockingTab } from "./stocking";
import { CommodityRatingsTab } from "./rating";

export class CommodityPage extends Component {
	declare parameters: { tag };

	commodity: CommodityViewModel;
	rating: CommodityRatingViewModel;

	async onload() {
		this.commodity = await new MarketService().getCommodity(this.parameters.tag);
		this.rating = await new MarketService().getRating(this.commodity.id);
	}

	render() {
		return <ui-commodity>
			<ui-title>
				<ui-name>
					{this.commodity.name}
				</ui-name>

				{this.rating?.price != null && <ui-price>
					{convertToCurrency(this.rating.price)}
				</ui-price>}
			</ui-title>

			{this.commodity.category && <ui-category>
				Categorized as {this.commodity.category.name}
			</ui-category>}

			<ui-description>
				{this.commodity.name} is tracked since {this.commodity.innovated ? `${new Time(this.commodity.innovated).age()} years` : 'the markets opened'}.
				The commodity is traded in {this.commodity.tradingUnitCommercialBaseline == this.commodity.tradingUnitRetailBaseline ? `${formatTradingUnit(this.commodity.tradingUnit, 10 ** this.commodity.tradingUnitCommercialBaseline)}.` : `${formatTradingUnit(this.commodity.tradingUnit, 10 ** this.commodity.tradingUnitCommercialBaseline)} commercially, ${formatTradingUnit(this.commodity.tradingUnit, 10 ** this.commodity.tradingUnitRetailBaseline)} in retail.`}
			</ui-description>

			{this.commodity.description && <ui-description>
				{this.commodity.description}
			</ui-description>}

			{new Tabs()
				.addTab('Ratings', () => new CommodityRatingsTab(this.commodity))
				.addTab('Demand', () => new CommodityDemandTab(this.commodity))
				.addTab('Stocking', () => new CommodityStockingTab(this.commodity))
				.addTab('Asks', () => new CommodityPositionsTab(
					this.commodity,
					'asks',
					(a, b) => a.price - b.price,
					'Asks',
					'Currently offered on the market (supply).'
				))
				.addTab('Bids', () => new CommodityPositionsTab(
					this.commodity,
					'bids',
					(a, b) => b.price - a.price,
					'Bids',
					'Requested items from the market (demand).'
				))
			}
		</ui-commodity>
	}
}
