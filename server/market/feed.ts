import { formatTradingUnit } from "../../interface/trading-unit";
import { ManagedServer } from "../managed/server";
import { MarketManager } from "./manager";
import { MarketTracker } from "./tracker";

export class MarketFeedInterface {
	constructor(
		app: ManagedServer,
		tracker: MarketTracker
	) {
		app.app.get('/market/feed/ticker', async (request, response) => {
			let feed = [];

			for (let commodity of tracker.trackers) {
				if (commodity.commodity.symbol) {
					const direction = parseInt(commodity.commodity.id[0], 16) >= 8;

					feed.push(`${commodity.commodity.symbol} ${this.formatNumber(commodity.estimatedStockSize)}${direction ? '{' : '}'}`);
				}
			}

			console.log(feed);

			response.end(feed.join(' ').toUpperCase());
		});
	}

	private formatNumber(value: number) {
		const steps = ['', 'k', 'm', 'g', 't'];

		while (value > 1000 && steps.length > 1) {
			steps.shift();
			value /= 1000;
		}

		return `${Math.round(value)}${steps[0]}`;
	}
}
