import { Component } from "@acryps/page";
import { MarketPage } from ".";
import { CommoditySummaryModel, LiveCommodityTickerResponseModel } from "../managed/services";
import { ContentAppendable } from "@acryps/style";
import { convertToCurrency } from "../../interface/currency";
import { formatTradingUnit } from "../../interface/trading-unit";

export class CommodityTickerComponent extends Component {
	declare rootNode: HTMLElement;

	last: string;

	ticker: LiveCommodityTickerResponseModel;

	estimatedStockSize = document.createTextNode('?');
	estimatedDemandTarget = document.createTextNode('?');

	constructor(
		public commodity: CommoditySummaryModel
	) {
		super();

		this.estimatedStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, 0);
		this.estimatedDemandTarget.textContent = formatTradingUnit(this.commodity.tradingUnit, 0);
	}

	tick(ticker: LiveCommodityTickerResponseModel) {
		const updated = JSON.stringify(ticker);

		if (updated == this.last) {
			return;
		}

		this.ticker = ticker;

		if (this.rootNode) {
			this.estimatedStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, this.ticker.estimatedStockSize);
			this.estimatedDemandTarget.textContent = formatTradingUnit(this.commodity.tradingUnit, this.ticker.estimatedDemandTarget);

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
					<ui-name>
						{this.commodity.name}
					</ui-name>

					<ui-unit>
						{this.commodity.tradingUnit.baseUnit}
					</ui-unit>
				</ui-header>

				<ui-volume>
					SS={this.estimatedStockSize} / DT={this.estimatedDemandTarget}
				</ui-volume>
			</ui-detail>
		</ui-commodity>;
	}
}

class RangeComponent {
	priceLabel = document.createTextNode('**');
	spreadLabel = document.createTextNode('**');
	capitalizationLabel = document.createTextNode('0');

	constructor(
		private parent: CommodityTickerComponent,
		private propertyPrefix: string
	) {}

	update() {
		if (!this.parent.ticker || !this.parent.ticker[`${this.propertyPrefix}Median`]) {
			return;
		}

		const capitalization = this.parent.ticker[`${this.propertyPrefix}Capitalization`] as number;
		this.capitalizationLabel.textContent = convertToCurrency(capitalization);

		const volume = this.parent.ticker[`${this.propertyPrefix}Volume`] as number;
		const price = capitalization / volume;
		this.priceLabel.textContent = convertToCurrency(price);

		const low = this.parent.ticker[`${this.propertyPrefix}Low`] as number;
		const high = this.parent.ticker[`${this.propertyPrefix}High`] as number;

		this.spreadLabel.textContent = convertToCurrency(high - low);
	}
}
