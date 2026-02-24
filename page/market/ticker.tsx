import { Component } from "@acryps/page";
import { MarketPage } from ".";
import { CommoditySummaryModel, LiveCommodityTickerResponseModel } from "../managed/services";
import { ContentAppendable } from "@acryps/style";
import { convertToCurrency } from "../../interface/currency";

export class CommodityTickerComponent extends Component {
	declare rootNode: HTMLElement;

	last: string;

	ticker: LiveCommodityTickerResponseModel;

	ask = new RangeComponent(this, 'ask');
	bid = new RangeComponent(this, 'bid');

	constructor(
		public commodity: CommoditySummaryModel
	) {
		super();
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
		return <ui-commodity ui-href={`commodity/${this.commodity.tag}`}>
			<ui-detail>
				<ui-header>
					<ui-name>
						{this.commodity.name}
					</ui-name>

					<ui-unit>
						{this.commodity.unit}
					</ui-unit>
				</ui-header>

				<ui-volume>
					{this.ask.volumeLabel} / {this.bid.volumeLabel}
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
	volumeLabel = document.createTextNode('0');

	constructor(
		private parent: CommodityTickerComponent,
		private propertyPrefix: string
	) {}

	update() {
		if (!this.parent.ticker || !this.parent.ticker[`${this.propertyPrefix}Median`]) {
			return;
		}

		const volume = this.parent.ticker[`${this.propertyPrefix}Volume`] as number;
		const capitalization = this.parent.ticker[`${this.propertyPrefix}Capitalization`] as number;

		this.priceLabel.textContent = convertToCurrency(price);

		const low = this.parent.ticker[`${this.propertyPrefix}Low`] as number;
		const high = this.parent.ticker[`${this.propertyPrefix}High`] as number;

		this.spreadLabel.textContent = convertToCurrency(high - low);

		const volume = this.parent.ticker[`${this.propertyPrefix}Volume`] as number;
		this.volumeLabel.textContent = convertToCurrency(volume);
	}
}
