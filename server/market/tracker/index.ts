import { toASCII } from "node:punycode";
import { Commodity, DbContext, ResidentAssessment, ResidentialDemand, ResidentialDemandRuleProperty, StockSeedRuleOperation, StockSeedRuleProperty, TradeAsk, TradeBid } from "../../managed/database";
import { TradeService } from "../../areas/trade/service";
import { Time } from "../../../interface/time";
import { MarketPriceRange } from "./price-range";
import { CommodityPriceTracker } from "./tracker";
import { Logger } from "@acryps/log";
import { Demand } from "./demand";
import { WorkerDispatch, WorkerHandle } from "../../worker";

export class MarketTracker extends WorkerHandle {
	trackers: CommodityPriceTracker[] = [];

	constructor(
		private logger: Logger,
		private database: DbContext
	) {
		super();
	}

	static async dispatch(logger: Logger, database: DbContext) {
		const tracker = new MarketTracker(logger, database);
		await tracker.update();

		return tracker.trackers;
	}

	schedule() {
		const next = async () => {
			const start = Date.now();
			this.trackers = await WorkerDispatch.dispatch<CommodityPriceTracker[]>(MarketTracker as any);

			setTimeout(next, 1000 * 10 + Date.now() - start);
		};

		next();
	}

	async update() {
		this.logger.log(`preparing tracker update`);

		const assessments = await this.database.residentAssessment
			.toArray();

		const commodities = await this.database.commodity
			.include(commodity => commodity.stockSeedRules)
			.include(commodity => commodity.residentialDemand)
			.toArray();

		const residentialDemand = await this.database.residentialDemand
			.include(ruleset => ruleset.rules)
			.toArray();

		this.logger.log(`updating ${commodities.length} trackers`);

		const start = Date.now();

		for (let commodity of commodities) {
			await this.updateCommodity(
				commodity,
				assessments,

				residentialDemand.filter(ask => ask.commodityId == commodity.id)
			);
		}

		const end = Date.now();
		console.log(end - start);

		this.logger.log(`updated ${commodities.length} trackers`);
	}

	find(commodity: Commodity | string) {
		return this.trackers.find(tracker => tracker.commodity.id == (typeof commodity == 'string' ? commodity : commodity.id));
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

	async updateCommodity(
		commodity: Commodity,

		assessments: ResidentAssessment[],
		residentialDemand: ResidentialDemand[]
	) {
		let tracker = this.trackers.find(tracker => tracker.commodity.id == commodity.id);

		if (!tracker) {
			tracker = new CommodityPriceTracker();
			tracker.commodity = commodity;

			this.trackers.push(tracker);
		}

		tracker.ask = new MarketPriceRange();
		tracker.bid = new MarketPriceRange();

		tracker.estimatedStockSize = await this.estimateStockSize(commodity, assessments);
		tracker.estimatedDemand = await this.estimateDemands(commodity, residentialDemand, assessments);
	}

	// estimate the stock size of the commodity across the entire population
	// tends to over-estimate
	//
	// uses 50% average on all rules
	// ignores multi-assigns (overestimate source)
	private async estimateStockSize(commodity: Commodity, assessments: ResidentAssessment[]) {
		const rules = await commodity.stockSeedRules.toArray();

		let volume = 0;

		for (let rule of rules) {
			if (rule.property == StockSeedRuleProperty.quantity) {
				const assessmentCount = assessments
					.filter(assessment => assessment.parameterId == rule.parameter)
					.filter(assessment => assessment.value >= rule.parameterMinimum && assessment.value < rule.parameterMaximum)
					.length;

				const size = assessmentCount * (rule.valueMaximum + rule.valueMinimum) / 2;

				switch (rule.operation) {
					case StockSeedRuleOperation.add:
					case StockSeedRuleOperation.apply: {
						volume += size;

						break;
					}

					case StockSeedRuleOperation.subtract: {
						volume -= size;

						break;
					}
				}
			}
		}

		// averages out over the residents
		volume *= commodity.residentialOwnershipLikeliness;

		return volume;
	}

	// calculate demands
	private async estimateDemands(commodity: Commodity, rulesets: ResidentialDemand[], assessments: ResidentAssessment[]) {
		const timeline: Demand[] = [];

		for (let ruleset of rulesets) {
			const rules = await ruleset.rules.toArray();

			const demand = new Demand();
			demand.activates = ruleset.activates;
			demand.active = commodity.activeResidentialDemandId == ruleset.id;
			demand.target = 0;

			timeline.push(demand);

			for (let rule of rules) {
				if (rule.property == ResidentialDemandRuleProperty.quantity) {
					const assessmentCount = assessments
						.filter(assessment => assessment.parameterId == rule.parameterId)
						.filter(assessment => assessment.value >= rule.parameterMinimum && assessment.value < rule.parameterMaximum)
						.length;

					const size = assessmentCount * (rule.valueMaximum + rule.valueMinimum) / 2;

					switch (rule.operation) {
						case StockSeedRuleOperation.add:
						case StockSeedRuleOperation.apply: {
							demand.target += size;

							break;
						}

						case StockSeedRuleOperation.subtract: {
							demand.target -= size;

							break;
						}
					}
				}
			}

			// averages out over the residents
			demand.target *= ruleset.likeliness;
		}

		return timeline;
	}
}
