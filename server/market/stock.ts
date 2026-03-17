import { Commodity } from "../managed/database";

export class Stock {
	constructor(
		public commodity: Commodity,
		public quantity: number = 0
	) {}
}
