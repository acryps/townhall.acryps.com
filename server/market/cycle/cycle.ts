import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from ".";
import { Commodity, DbContext, MarketCycle } from "../../managed/database";
import { MarketTracker } from "../tracker";
import { MarketDemander } from "./demander";
import { MarketInnovator } from "./innovator";
import { MarketSeedMatcher } from "./seed/matcher";
import { MarketSeedSourcers } from "./seed/sourcer";

export const advanceMarket = async (database: DbContext, tracker: MarketTracker) => {
	const logger = new Logger('market').task('cycle');

	const lastCycle = await database.marketCycle
		.orderByDescending(cycle => cycle.opened)
		.first();

	const marketCycle = new MarketCycle();
	marketCycle.opened = new Date();

	// copy market settings
	marketCycle.baseDemandIterations = lastCycle.baseDemandIterations;
	marketCycle.innovationIterations = lastCycle.innovationIterations;
	marketCycle.innovatedDemandIterations = lastCycle.innovatedDemandIterations;
	marketCycle.sockSeedingIterations = lastCycle.sockSeedingIterations;
	marketCycle.consumptionIterations = lastCycle.consumptionIterations;
	marketCycle.liqudationIterations = lastCycle.liqudationIterations;

	await marketCycle.create();

	logger.log(`opened ${marketCycle.id.split('-')[0]}`);

	try {
		// people had stuff before they had a market tracking system
		// fill up their stocks with belongings from the past (stock seeding)
		// the items will later be matched to commodities, this just indexes their stock
		for (let iteration = 0; iteration < marketCycle.sockSeedingIterations; iteration++) {
			// list what they had, without matching to commodities
			const seedCount = await new MarketSeedSourcers(database, tracker).generate();

			// match the seeds to commodities, actually generating stock
			for (let iteration = 0; iteration < seedCount; iteration++) {
				await new MarketSeedMatcher(database, tracker).generate();
			}
		}

		// first, generate some new demand
		for (let iteration = 0; iteration < marketCycle.baseDemandIterations; iteration++) {
			await new MarketDemander(database, tracker).generate();
		}

		// let the market respond to new signals
		const innovations: Commodity[] = [];

		for (let iteration = 0; iteration < marketCycle.innovationIterations; iteration++) {
			const innovation = await new MarketInnovator(database, tracker).generate();

			if (innovation) {
				innovations.push(innovation);
			}
		}

		// some people might already have this
		// lets find some matches from open seeding calls
		for (let iteration = 0; iteration < innovations.length; iteration++) {
			await new MarketSeedMatcher(database, tracker).generate(innovations);
		}

		// let the market respond to the new demands
		for (let iteration = 0; iteration < marketCycle.innovatedDemandIterations; iteration++) {
			await new MarketDemander(database, tracker).generate(innovations);
		}

		// let the market buy stuff
		// plan new productions
		// work on productions
		// sell stock
	} catch (error) {
		logger.error(`failed ${marketCycle.id.split('-')[0]}: ${error}`);
	}

	await tracker.update();
	tracker.dump();

	marketCycle.closed = new Date();
	await marketCycle.update();

	logger.log(`closed ${marketCycle.id.split('-')[0]}`);

	return;

	// let entities produce somethings
	/// await Produce
}
