import { Manager } from "vlserver";
import { DbContext } from "../managed/database";

export class MarketManager extends Manager {
	constructor(
		private database: DbContext
	) {
		super();
	}

	static depreciate(startPrice: number, depreciation: number, aquired: Date, now = Date.now()) {
		return startPrice * Math.pow(2, -(+aquired - now) / (depreciation * 1000 * 60 * 60 * 24));
	}
}
