import { Logger } from "@acryps/log";
import { DbContext, MarketCycle } from "../../managed/database";
import { MarketTracker } from "../tracker";
import { MarketCycleGeneratorStep } from "./step";
import { StockSeedRuleMarketCycleGeneratorStep } from "./step/1-stock-seed";
import { Time } from "../../../interface/time";
import { ResidentialDemandMarketCycleGeneratorStep } from "./step/2-residential-demand";

export class MarketCycleGenerator {
	steps = () => ({
		'residential demand': ResidentialDemandMarketCycleGeneratorStep,
		'stock seed rule': StockSeedRuleMarketCycleGeneratorStep,
	});

	situation: string[];

	constructor(
		public database: DbContext,
		public tracker: MarketTracker
	) {}

	async advance() {
		const sponsor = await this.database.tokenSponsor.first();

		const lastCycle = await this.database.marketCycle
			.where(cycle => cycle.closed != null)
			.orderByDescending(cycle => cycle.closed)
			.first();

		const cycle = new MarketCycle();
		cycle.sponsor = sponsor;
		cycle.opened = new Date();

		// prepare situation
		this.situation = [];

		cycle.outlook = lastCycle.outlook;
		this.convertSituationToText(cycle.outlook, 'pessimistic', 'optimistic');

		cycle.riskAppetite = lastCycle.riskAppetite;
		this.convertSituationToText(cycle.outlook, 'defensive', 'risk-seeking');

		cycle.confidence = lastCycle.confidence;
		this.convertSituationToText(cycle.outlook, 'unsure', 'certain');

		cycle.uncertainty = lastCycle.uncertainty;
		this.convertSituationToText(cycle.outlook, 'predictable', 'unpredictable');

		cycle.speculation = lastCycle.speculation;
		this.convertSituationToText(cycle.outlook, 'fundamental', 'speculative');

		await cycle.create();

		const logger = new Logger('market cycle').child(cycle.id.split('-')[0]);
		logger.log(`cycle opened ${new Time(cycle.opened).toString()}: ${this.situation.join(', ')}`);

		const steps = this.steps();

		for (let name in steps) {
			const generator = new steps[name](
				this.database,
				this.tracker,
				cycle,
				this.situation,

				sponsor,
				logger,
				name
			) as MarketCycleGeneratorStep;

			await generator.generate();
		}

		cycle.closed = new Date();
		await cycle.update();

		logger.log(`cycle closed`);
	}

	private convertSituationToText(value: number, start: string, end: string) {
		const expand = (label: string) => [
			`exceptionally ${label}`,
			`strongly ${label}`,
			label,
			`quite ${label}`,
			`slightly ${label}`
		];

		const labels = [
			...expand(start),
			...expand(end).reverse()
		];

		this.situation.push(labels[Math.floor(labels.length * value)]);
	}
}
