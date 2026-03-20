import { Logger } from "@acryps/log";
import { MarketIterationGenerator } from "./generator";
import { Commodity, DbContext, MarketCycle } from "../../managed/database";
import { MarketTracker } from "../tracker";
import { MarketDemander } from "./demander";
import { MarketInnovator } from "./innovator";
import { MarketSeedMatcher } from "./seed/matcher";
import { MarketSeedSourcers } from "./seed/sourcer";
import { MarketReporter } from "./report";
import { MarketCycleConfiguration } from "./configuration";

export const advanceMarket = async (database: DbContext, tracker: MarketTracker) => {
	const logger = new Logger('market').task('cycle');
	await tracker.update();

	const lastCycle = await database.marketCycle
		.orderByDescending(cycle => cycle.opened)
		.first();

	const marketCycle = new MarketCycle();
	marketCycle.opened = new Date();

	const configuration = MarketCycleConfiguration.load(lastCycle.configuration);
	marketCycle.configuration = MarketCycleConfiguration.save(configuration);

	await marketCycle.create();

	logger.log(`opened ${marketCycle.id.split('-')[0]}`);

	try {
		// people had stuff before they had a market tracking system
		// fill up their stocks with belongings from the past (stock seeding)
		// the items will later be matched to commodities, this just indexes their stock
		for (let iteration = 0; iteration < configuration.stockSeedingIterations; iteration++) {
			// list what they had, without matching to commodities
			const seedCount = await new MarketSeedSourcers(database, tracker, marketCycle).generate();

			// match the seeds to commodities, actually generating stock
			for (let iteration = 0; iteration < seedCount; iteration++) {
				await new MarketSeedMatcher(database, tracker, marketCycle).generate();
			}
		}

		// first, generate some new demand
		for (let iteration = 0; iteration < configuration.baseDemandIterations; iteration++) {
			await new MarketDemander(database, tracker, marketCycle).generate();
		}

		// let the market respond to new signals
		const innovations: Commodity[] = [];

		for (let iteration = 0; iteration < configuration.innovationIterations; iteration++) {
			const innovation = await new MarketInnovator(database, tracker, marketCycle).generate();

			if (innovation) {
				innovations.push(innovation);
			}
		}

		// some people might already have this
		// lets find some matches from open seeding calls
		for (let iteration = 0; iteration < innovations.length; iteration++) {
			await new MarketSeedMatcher(database, tracker, marketCycle).generate(innovations);
		}

		// let the market respond to the new demands
		for (let iteration = 0; iteration < configuration.innovatedDemandIterations; iteration++) {
			await new MarketDemander(database, tracker, marketCycle).generate(innovations);
		}

		// write articles about the shifts on the market
		const marketPublications = await database.publication
			.where(publication => publication.marketReportStandpoint != null)
			.toArray();

		const articles = [];

		for (let publication of marketPublications) {
			const article = await new MarketReporter(publication, innovations, database, tracker, marketCycle).generate();

			if (article) {
				articles.push(article);
			}
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
