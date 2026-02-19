import { MarketIterationGenerator } from ".";
import { Commodity, DbContext } from "../../managed/database";
import { MarketTracker } from "../tracker";
import { MarketDemander } from "./demander";
import { MarketInnovator } from "./innovator";

export const advanceMarket = async (database: DbContext, tracker: MarketTracker) => {
	// first, generate some new demand
	for (let iteration = 0; iteration < 5; iteration++) {
		/// await new MarketDemander(database, tracker).generate();
	}

	// let the market respon to new signals
	const innovations: Commodity[] = [];

	for (let iteration = 0; iteration < 3; iteration++) {
		const innovation = await new MarketInnovator(database, tracker).generate();

		if (innovation) {
			innovations.push(innovation);
		}
	}

	// let the market respond to the new demands
	for (let iteration = 0; iteration < 2; iteration++) {
		await new MarketDemander(database, tracker).generate(innovations);
	}

	await tracker.update();
	tracker.dump();

	return;

	// let entities produce somethings
	/// await Produce
}
