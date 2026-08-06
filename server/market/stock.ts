import { Commodity } from "../managed/database";

export class Stock {
	constructor(
		public commodity: Commodity,
		public quantity: number = 0,
		public quality: number = 0,

		public sources: string[] = []
	) {}
}
