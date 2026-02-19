import { Component } from "@acryps/page";
import { CommoditySummaryModel, LiveCommodityTickerResponseModel, MarketService } from "../managed/services";
import { marketIcon } from "../assets/icons/managed";
import { CommodityTickerComponent } from "./ticker";

export class MarketPage extends Component {
	commodities: CommoditySummaryModel[];

	tickers: CommodityTickerComponent[];

	async onload() {
		this.commodities = await new MarketService().getCommodities();
	}

	async updateTicker() {
		const update = await new MarketService().getTickers();

		for (let ticker of update) {
			const component = this.tickers.find(component => component.commodity.id == ticker.commodityId);

			component?.tick(ticker);
		}

		if (document.contains(this.rootNode)) {
			setTimeout(() => this.updateTicker(), 5000);
		}
	}

	render() {
		requestAnimationFrame(() => this.updateTicker());

		return <ui-market>
			<ui-header ui-href='/law-house'>
				{marketIcon()} Market
			</ui-header>

			<ui-title>
				Market
			</ui-title>

			<ui-description>
				Watch how the market develops based on demand and supply, new innovations emerge and shifts in public perception shape markets.
			</ui-description>

			<ui-commodities>
				{this.tickers = this.commodities.map(commodity => new CommodityTickerComponent(commodity))}
			</ui-commodities>
		</ui-market>
	}
}
