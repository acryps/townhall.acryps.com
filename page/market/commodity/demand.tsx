import { Component } from "@acryps/page";
import { CommodityRatingViewModel, CommodityViewModel, MarketService } from "../../managed/services";
import { formatTradingUnit } from "../../../interface/trading-unit";

export class CommodityDemandTab extends Component {
	rating: CommodityRatingViewModel;

	constructor(
		public commodity: CommodityViewModel
	) {
		super();
	}

	async onload() {
		const ratings = await new MarketService().getRatings();

		this.rating = ratings.find(rating => rating.commodity.id == this.commodity.id);
	}

	render() {
		return <ui-demand>
			<ui-description>
				The demand lists how much residents and companies want to own a commodity, compared to how much is currently in stock.
				Values reflect the most recently closed market cycle. Demand may shift over time, because sometimes, consumer and company habits change.
			</ui-description>

			<ui-timeline>
				{this.rating ? [
					<ui-demand>
						<ui-activates>
							Retail
						</ui-activates>

						<ui-target>
							{formatTradingUnit(this.commodity.tradingUnit, this.rating.retailStockSize)} stocked / {formatTradingUnit(this.commodity.tradingUnit, this.rating.retailDemand)} demanded
						</ui-target>
					</ui-demand>,

					<ui-demand>
						<ui-activates>
							Commercial
						</ui-activates>

						<ui-target>
							{formatTradingUnit(this.commodity.tradingUnit, this.rating.commercialStockSize)} stocked / {formatTradingUnit(this.commodity.tradingUnit, this.rating.commercialDemand)} demanded
						</ui-target>
					</ui-demand>
				] : <ui-demand>
					<ui-activates>
						No rating recorded yet
					</ui-activates>
				</ui-demand>}
			</ui-timeline>
		</ui-demand>;
	}
}
