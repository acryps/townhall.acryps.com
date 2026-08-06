import { Logger } from "@acryps/log";
import { DbContext, MarketCycle } from "../../managed/database";
import { MarketTracker } from "../tracker";
import { MarketCycleGeneratorStep } from "./step";
import { StockSeedRuleMarketCycleGeneratorStep } from "./step/1-stock-seed";

export class MarketCycleGenerator {
	steps = () => ({
		'stock seed rule': StockSeedRuleMarketCycleGeneratorStep
	});

	constructor(
		public database: DbContext,
		public tracker: MarketTracker
	) {}

	async advance() {
		const sponsor = await this.database.tokenSponsor.first();

		const cycle = new MarketCycle();
		cycle.sponsor = sponsor;
		cycle.opened = new Date();
		await cycle.create();

		const logger = new Logger('market cycle').child(cycle.id.split('-')[0]);

		const steps = this.steps();

		for (let name in steps) {
			const generator = new steps[name](
				this.database,
				this.tracker,
				cycle,

				sponsor,
				logger,
				name
			) as MarketCycleGeneratorStep;

			await generator.generate();
		}

		cycle.closed = new Date();
		await cycle.update();
	}
}
