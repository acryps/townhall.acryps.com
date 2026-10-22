import { Commodity, CommercialDemand, CompanyAssessment, CommodityRating, DbContext, MarketCycle, ResidentAssessment, ResidentialDemand } from "../../managed/database";
import { Logger } from "@acryps/log";
import { MarketRuleResolver } from "../rule";
import { CommodityMarketRating } from "./rating";

export class MarketTracker {
	ratings: CommodityMarketRating[] = [];

	// prices decided by the market segment step, keyed by commodity id
	// picked up by updateCommodity below, so commodity_rating stays the only place prices are written
	pendingPrices = new Map<string, number>();

	constructor(
		private logger: Logger,
		private database: DbContext
	) {}

	// loads the ratings of the last closed cycle, so the tracker has something to serve right after startup
	async load() {
		const lastCycle = await this.database.marketCycle
			.where(cycle => cycle.closed != null)
			.orderByDescending(cycle => cycle.closed)
			.first();

		if (!lastCycle) {
			return;
		}

		const ratings = await this.database.commodityRating
			.where(rating => rating.cycleId == lastCycle.id)
			.toArray();

		const commodities = await this.database.commodity.toArray();

		this.ratings = ratings.map(rating => new CommodityMarketRating(
			commodities.find(commodity => commodity.id == rating.commodityId),
			rating
		));

		this.logger.log(`loaded ${this.ratings.length} ratings from cycle #${lastCycle.id.split('-')[0]}`);
	}

	async update(cycle: MarketCycle) {
		this.logger.log(`preparing tracker update for #${cycle.id.split('-')[0]}`);

		const assessments = await this.database.residentAssessment.toArray();
		const companyAssessments = await this.database.companyAssessment.toArray();

		const commodities = await this.database.commodity
			.include(commodity => commodity.stockSeedRules)
			.toArray();

		const residentialDemand = await this.database.residentialDemand
			.where(ruleset => ruleset.activates != null)
			.include(ruleset => ruleset.rules)
			.toArray();

		const commercialDemand = await this.database.commercialDemand
			.where(ruleset => ruleset.activates != null)
			.include(ruleset => ruleset.rules)
			.toArray();

		this.logger.log(`updating ${commodities.length} ratings`);

		const ratings: CommodityMarketRating[] = [];

		for (let commodity of commodities) {
			const rating = await this.updateCommodity(
				cycle,
				commodity,

				assessments,
				companyAssessments,

				residentialDemand.find(ruleset => ruleset.id == commodity.activeResidentialDemandId),
				commercialDemand.find(ruleset => ruleset.id == commodity.activeCommercialDemandId)
			);

			ratings.push(new CommodityMarketRating(commodity, rating));
		}

		this.ratings = ratings;
		this.pendingPrices.clear();

		this.logger.log(`updated ${commodities.length} ratings`);
	}

	find(commodity: Commodity | string) {
		const commodityId = typeof commodity == 'string' ? commodity : commodity.id;

		return this.ratings.find(entry => entry.commodity.id == commodityId);
	}

	private async updateCommodity(
		cycle: MarketCycle,
		commodity: Commodity,

		assessments: ResidentAssessment[],
		companyAssessments: CompanyAssessment[],

		residentialDemand: ResidentialDemand,
		commercialDemand: CommercialDemand
	) {
		const rating = new CommodityRating();
		rating.cycle = cycle;
		rating.commodity = commodity;

		rating.retailStockSize = await this.retailStockSize(commodity, assessments);
		rating.commercialStockSize = await this.commercialStockSize(commodity);

		rating.retailDemand = residentialDemand
			? MarketRuleResolver.aggregate(await residentialDemand.rules.toArray(), assessments) * (residentialDemand.likeliness ?? 1)
			: 0;

		rating.commercialDemand = commercialDemand
			? MarketRuleResolver.aggregate(await commercialDemand.rules.toArray(), companyAssessments) * (commercialDemand.likeliness ?? 1)
			: 0;

		// carry the previous price forward if the segment step didn't touch this commodity this cycle
		rating.price = this.pendingPrices.get(commodity.id) ?? this.find(commodity)?.rating.price ?? null;

		await rating.create();

		return rating;
	}

	// estimate the stock size of the commodity across the entire population
	// tends to over-estimate
	//
	// uses 50% average on all rules
	// ignores multi-assigns (overestimate source)
	private async retailStockSize(commodity: Commodity, assessments: ResidentAssessment[]) {
		const rules = await commodity.stockSeedRules.toArray();

		// averages out over the residents
		return MarketRuleResolver.aggregate(rules, assessments) * commodity.residentialOwnershipLikeliness;
	}

	// no generated commercial ownership rules exist yet, so this is the actual stock companies have seeded
	private async commercialStockSize(commodity: Commodity) {
		const seeds = await this.database.stockSeed
			.where(seed => seed.commodityId == commodity.id)
			.where(seed => seed.owner.companyId != null)
			.toArray();

		return seeds.reduce((sum, seed) => sum + (seed.quantity ?? 0), 0);
	}
}
