import { Component } from "@acryps/page";
import { MarketPage } from ".";
import { CommoditySummaryModel, LiveCommodityTickerResponseModel } from "../managed/services";

export class CommodityTickerComponent extends Component {
	declare rootNode: HTMLElement;

	last: string;

	ticker: LiveCommodityTickerResponseModel;

	ask = new RangeComponent('ask');
	bid = new RangeComponent('bid');

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

		this.ask.update();
		this.bid.update();

		this.last = updated;

		this.rootNode.removeAttribute('ui-changed');
		requestAnimationFrame(() => this.rootNode.setAttribute('ui-changed', ''));

		this.rootNode.removeAttribute('ui-stale');
	}

	render() {
		return <ui-commodity ui-stale>
			<ui-name>
				{this.commodity.name}
			</ui-name>

			<ui-price>
				<ui-ask>
					{this.ask}
				</ui-ask>

				<ui-bid>
					{this.bid}
				</ui-bid>
			</ui-price>
		</ui-commodity>;
	}
}

class RangeComponent extends Component {
	declare parent: CommodityTickerComponent;

	constructor(
		private propertyPrefix: string
	) {
		super();
	}

	render() {
		if (!this.parent.ticker || !this.parent.ticker[`${this.propertyPrefix}Median`]) {
			return <ui-range>
				**
			</ui-range>
		}

		let volume = this.parent.ticker[`${this.propertyPrefix}Volume`];

		return <ui-range>
			<ui-median>
				{this.parent.ticker[`${this.propertyPrefix}Median`].toFixed(2)}
			</ui-median>

			<ui-spread>
				<ui-low>
					{this.parent.ticker[`${this.propertyPrefix}Low`].toFixed(2)}
				</ui-low>

				<ui-high>
					{this.parent.ticker[`${this.propertyPrefix}High`].toFixed(2)}
				</ui-high>
			</ui-spread>

			<ui-volume>
				{volume}
			</ui-volume>
		</ui-range>
	}
}
