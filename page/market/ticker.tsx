import { Component } from "@acryps/page";
import { MarketPage } from ".";
import { CommoditySummaryModel, CommodityRatingViewModel } from "../managed/services";
import { formatTradingUnit } from "../../interface/trading-unit";
import { commercialIcon, homeIcon, retailIcon } from "../assets/icons/managed";
import { convertToCurrency } from "../../interface/currency";

export class CommodityTickerComponent extends Component {
	declare rootNode: HTMLElement;

	last: string;

	rating: CommodityRatingViewModel;

	price: HTMLElement = <ui-price />;

	retailStockSize = document.createTextNode('?');
	retailDemand = document.createTextNode('?');
	commercialStockSize = document.createTextNode('?');
	commercialDemand = document.createTextNode('?');

	constructor(
		public commodity: CommoditySummaryModel
	) {
		super();

		this.retailStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, 0);
		this.retailDemand.textContent = formatTradingUnit(this.commodity.tradingUnit, 0);
		this.commercialStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, 0);
		this.commercialDemand.textContent = formatTradingUnit(this.commodity.tradingUnit, 0);
	}

	tick(rating: CommodityRatingViewModel) {
		const updated = JSON.stringify(rating);

		if (updated == this.last) {
			return;
		}

		this.rating = rating;

		if (this.rootNode) {
			this.price.textContent = convertToCurrency(this.rating.price);

			this.retailStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, this.rating.retailStockSize);
			this.retailDemand.textContent = formatTradingUnit(this.commodity.tradingUnit, this.rating.retailDemand);
			this.commercialStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, this.rating.commercialStockSize);
			this.commercialDemand.textContent = formatTradingUnit(this.commodity.tradingUnit, this.rating.commercialDemand);

			this.last = updated;

			this.rootNode.removeAttribute('ui-changed');
			requestAnimationFrame(() => this.rootNode.setAttribute('ui-changed', ''));
		}
	}

	show() {
		this.rootNode.removeAttribute('ui-hidden');
	}

	hide() {
		this.rootNode.setAttribute('ui-hidden', '');
	}

	render() {
		return <ui-commodity ui-href={`commodity/${this.commodity.tag}`} ui-highlight={!!this.commodity.symbol}>
			<img src={`/commodity/icon/${this.commodity.iconId}`} />

			<ui-detail>
				<ui-header>
					<ui-commodity>
						<ui-name>
							{this.commodity.name}
						</ui-name>

						<ui-unit>
							{this.commodity.tradingUnit.baseUnit}
						</ui-unit>
					</ui-commodity>

					{this.price}
				</ui-header>

				<ui-volume>
					{retailIcon()} S={this.retailStockSize} D={this.retailDemand}
				</ui-volume>

				<ui-volume>
					{commercialIcon()} S={this.commercialStockSize} D={this.commercialDemand}
				</ui-volume>
			</ui-detail>
		</ui-commodity>;
	}
}

export const ratingStockSize = (rating: CommodityRatingViewModel) => rating ? rating.retailStockSize + rating.commercialStockSize : 0;
export const ratingDemand = (rating: CommodityRatingViewModel) => rating ? rating.retailDemand + rating.commercialDemand : 0;

// quantities alone favor cheap, per-piece goods (eg. nails) over commodities that trade in far smaller,
// but much more valuable quantities - weighing by price gives a sense of the money actually moving
export const ratingStockValue = (rating: CommodityRatingViewModel) => rating?.price ? ratingStockSize(rating) * rating.price : 0;
export const ratingDemandValue = (rating: CommodityRatingViewModel) => rating?.price ? ratingDemand(rating) * rating.price : 0;
