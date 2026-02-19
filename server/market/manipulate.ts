import { Commodity, DbContext } from "../managed/database";

export class MarketManipulator {
	constructor(
		private database: DbContext
	) {}

	setPrice(commodity: Commodity, price: number, quantity: number) {

	}
}
