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

	ask = new RangeComponent(this, 'ask');
	bid = new RangeComponent(this, 'bid');

	estimatedStockSize = document.createTextNode('?');

	constructor(
		public commodity: CommoditySummaryModel
	) {
		super();

		if (this.commodity.tradingUnit) {
			this.estimatedStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, 0);
		}
	}

	tick(ticker: LiveCommodityTickerResponseModel) {
		const updated = JSON.stringify(ticker);

		if (updated == this.last) {
			return;
		}

		this.ticker = ticker;

		if (this.rootNode) {
			this.ask.update();
			this.bid.update();

			if (this.commodity.tradingUnit) {
				this.estimatedStockSize.textContent = formatTradingUnit(this.commodity.tradingUnit, this.ticker.estimatedStockSize);
			}

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
					{this.estimatedStockSize} / {this.ask.capitalizationLabel} / {this.bid.capitalizationLabel}
				</ui-volume>
			</ui-detail>

			<ui-price>
				<ui-ask>
					<ui-median>
						{this.ask.priceLabel}
					</ui-median>

					<ui-spread>
						±{this.ask.spreadLabel}
					</ui-spread>
				</ui-ask>

				<ui-bid>
					<ui-median>
						{this.bid.priceLabel}
					</ui-median>

					<ui-spread>
						±{this.bid.spreadLabel}
					</ui-spread>
				</ui-bid>
			</ui-price>
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
