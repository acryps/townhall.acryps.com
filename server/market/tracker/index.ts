import { toASCII } from "node:punycode";
import { Commodity, DbContext } from "../../managed/database";
import { TradeService } from "../../areas/trade/service";
import { Time } from "../../../interface/time";
import { MarketPriceRange } from "./price-range";
import { CommodityPriceTracker } from "./tracker";
import { Logger } from "@acryps/log";

export class MarketTracker {
	trackers: CommodityPriceTracker[] = [];

	constructor(
		private logger: Logger,
		private database: DbContext
	) {}

	async update() {
		const tasks = [];

		for (let commodity of await this.database.commodity.toArray()) {
			tasks.push(this.updateCommodity(commodity));
		}

		this.logger.log(`update ${tasks.length} trackers`);

		await Promise.all(tasks);
	}

	// TODO fix when asks are present
	buyingPrice(commodity: Commodity) {
		const tracker = this.trackers.find(tracker => tracker.commodity.id == commodity.id);

		if (!tracker) {
			return NaN;
		}

		if (!tracker.ask.valid) {
			return NaN;
		}

		return tracker.bid.capitalization / tracker.bid.volume;
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
			.toArray();

		const askRange = new MarketPriceRange();

		for (let ask of asks) {
			askRange.push(ask.price, ask.quantity);
		}

		const bids = await this.database.tradeBid
			.where(bid => bid.commodityId == commodity.id)
			.where(bid => bid.expires == null || bid.expires.isBefore(now))
			.include(bid => bid.trades)
			.toArray();

		const bidRange = new MarketPriceRange();

		for (let bid of bids) {
			// only count unfulfilled asks
			let sold = 0;

			for (let trade of await bid.trades.toArray()) {
				sold += trade.quantity;
			}

			if (sold != bid.quantity) {
				bidRange.push(bid.price, bid.quantity);
			}
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
