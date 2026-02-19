import { toASCII } from "node:punycode";
import { Commodity, DbContext } from "../../managed/database";
import { TradeService } from "../../areas/trade/service";
import { Time } from "../../../interface/time";
import { MarketPriceRange } from "./price-range";
import { CommodityPriceTracker } from "./tracker";

export class MarketTracker {
	trackers: CommodityPriceTracker[] = [];

	constructor(
		private database: DbContext
	) {}

	async update() {
		const tasks = [];

		for (let commodity of await this.database.commodity.toArray()) {
			tasks.push(this.updateCommodity(commodity));
		}

		await Promise.all(tasks);
	}

	buyingPrice(commodity: Commodity) {
		const tracker = this.trackers.find(tracker => tracker.commodity.id == commodity.id);

		if (!tracker) {
			return NaN;
		}

		if (!tracker.ask.valid) {
			return NaN;
		}

		return tracker.ask.median;
	}

	async dump() {
		console.group(`market info ${Time.now().toString()}`);

		for (let tracker of this.trackers) {
			console.log(`${tracker.ask.toString()} / ${tracker.bid.toString()}: ${tracker.commodity.name}, ${tracker.commodity.unit}`);
		}

		console.groupEnd();
	}

	async updateCommodity(commodity: Commodity) {
		const now = new Date();
		let tracker = this.trackers.find(tracker => tracker.commodity.id == commodity.id);

		const asks = await this.database.tradeAsk
			.where(ask => ask.commodityId == commodity.id)
			.where(ask => ask.expires == null || ask.expires.isBefore(now))
			.include(ask => ask.trades)
			.toArray();

		const askRange = new MarketPriceRange();

		for (let ask of asks) {
			// only count unfulfilled asks
			let sold = 0;

			for (let trade of await ask.trades.toArray()) {
				sold += trade.quantity;
			}

			if (sold != ask.quantity) {
				askRange.push(ask.price, ask.quantity);
			}
		}

		const bids = await this.database.tradeBid
			.where(ask => ask.commodityId == commodity.id)
			.where(ask => ask.expires == null || ask.expires.isBefore(now))
			.toArray();

		const bidRange = new MarketPriceRange();

		for (let bid of bids) {
			bidRange.push(bid.price, bid.quantity);
		}

		if (!tracker) {
			tracker = new CommodityPriceTracker();
			tracker.commodity = commodity;

			this.trackers.push(tracker);
		}

		tracker.ask = askRange;
		askRange.calculate();

		tracker.bid = bidRange;
		bidRange.calculate();
	}
}
