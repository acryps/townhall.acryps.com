import { Commodity, DbContext, LegalEntity, Resident, StockSeedRule } from "../managed/database";
import { convertToLegalCompanyName } from "../../interface/company";
import { Stock } from "./stock";
import { HashRandom } from "./random";
import { formatTradingUnit } from "../../interface/trading-unit";
import { MarketRule, MarketRuleResolver } from "./rule";
import { MarketAssessment } from "./rule/assessment";

export class TradingEntity {
	constructor(
		public name: string,
		public entity: LegalEntity,
		public database: DbContext
	) {}

	static async from(entity: LegalEntity, database: DbContext) {
		if (entity.companyId) {
			const company = await entity.company.fetch();

			return new TradingEntity(
				`Company '${convertToLegalCompanyName(company)}'`,
				entity,
				database
			);
		}

		if (entity.boroughId) {
			const borough = await entity.borough.fetch();

			return new TradingEntity(
				`Borough '${borough.name}' Council`,
				entity,
				database
			);
		}

		const resident = await entity.resident.fetch();

		return new TradingEntity(
			`Private Resident '${resident.givenName} ${resident.familyName}'`,
			entity,
			database
		);
	}

	// stock this entity currently owns
	async getStock(assessments?: MarketAssessment[]) {
		const stock: Stock[] = [];

		// stock owned before tracking (seeding)
		const seeds = await this.entity.stockSeeds
			.where(seed => seed.commodityId != null && seed.quantity != null)
			.include(seed => seed.commodity)
			.toArray();

		for (let seed of seeds) {
			const commodity = await seed.commodity.fetch();
			const unit = await commodity.tradingUnit.fetch();

			this.trackAsset(stock, commodity, seed.quantity, seed.quality, `+${formatTradingUnit(unit, seed.quantity)} ${seed.matchReason} (seed #${seed.id.split('-')[0]})`);
		}

		// generate stock for residents
		// it would be insanely wasteful to generate full stock lists for all residents all the time
		if (this.entity.residentId) {
			for (let entry of await this.generateResidentStock(await this.entity.resident.fetch(), assessments)) {
				this.trackAsset(stock, entry.commodity, entry.quantity, entry.quality, ...entry.sources);
			}
		}

		stock.sort((a, b) => a.commodity.name.localeCompare(b.commodity.name));

		return stock;
	}

	// what this entity currently wants, allow injecting a pre-fetched assessment list to save db hits when running in batches (eg the tracker)
	async getDemand(assessments?: MarketAssessment[]): Promise<Stock[]> {
		if (this.entity.residentId) {
			const resident = await this.entity.resident.fetch();

			return this.resolveDemand(
				resident.id,
				assessments ?? await resident.assessments.toArray(),

				commodity => commodity.activeResidentialDemandId,
				this.database.commodity.where(commodity => commodity.activeResidentialDemandId != null),

				await this.database.residentialDemand
					.where(ruleset => ruleset.activates != null)
					.include(ruleset => ruleset.rules)
					.toArray()
			);
		}

		if (this.entity.companyId) {
			const company = await this.entity.company.fetch();

			return this.resolveDemand(
				company.id,
				assessments ?? await company.assessments.toArray(),

				commodity => commodity.activeCommercialDemandId,
				this.database.commodity.where(commodity => commodity.activeCommercialDemandId != null),

				await this.database.commercialDemand
					.where(ruleset => ruleset.activates != null)
					.include(ruleset => ruleset.rules)
					.toArray()
			);
		}

		if (this.entity.boroughId) {
			const borough = await this.entity.borough.fetch();

			return this.resolveDemand(
				borough.id,
				assessments ?? await borough.assessments.toArray(),

				commodity => commodity.activeBoroughDemandId,
				this.database.commodity.where(commodity => commodity.activeBoroughDemandId != null),

				await this.database.boroughDemand
					.where(ruleset => ruleset.activates != null)
					.include(ruleset => ruleset.rules)
					.toArray()
			);
		}

		return [];
	}

	// shared by getDemand()'s resident / company / borough branches: resolve the active demand ruleset per commodity for this subject
	private async resolveDemand(
		subjectId: string,
		values: MarketAssessment[],

		activeDemandId: (commodity: Commodity) => string,
		commodities: { toArray(): Promise<Commodity[]> },
		rulesets: { id: string, likeliness: number, rules: { toArray(): Promise<MarketRule[]> } }[]
	) {
		const stock: Stock[] = [];

		for (let commodity of await commodities.toArray()) {
			const ruleset = rulesets.find(ruleset => ruleset.id == activeDemandId(commodity));

			if (!ruleset) {
				continue;
			}

			if (HashRandom.random([subjectId, commodity.id]) >= (ruleset.likeliness ?? 0)) {
				continue;
			}

			const resolution = MarketRuleResolver.generate(await ruleset.rules.toArray(), values, [subjectId, commodity.id]);

			if (resolution.quantity <= 0) {
				continue;
			}

			stock.push(new Stock(commodity, resolution.quantity, resolution.quality, resolution.sources));
		}

		return stock;
	}

	private async generateResidentStock(resident: Resident, assessments?: MarketAssessment[]) {
		const stock: Stock[] = [];

		const values = assessments ?? await resident.assessments.toArray();

		const commodities = await this.database.commodity
			.include(commodity => commodity.tradingUnit)
			.toArray();

		const rules = await this.database.stockSeedRule
			.orderByAscending(rule => rule.id) // sort to have strict case for conflicts
			.toArray();

		const rulesByCommodity = new Map<string, StockSeedRule[]>();

		for (let rule of rules) {
			if (!rulesByCommodity.has(rule.commodityId)) {
				rulesByCommodity.set(rule.commodityId, []);
			}

			rulesByCommodity.get(rule.commodityId).push(rule);
		}

		for (let [commodityId, commodityRules] of rulesByCommodity) {
			const commodity = commodities.find(commodity => commodity.id == commodityId);

			if (!commodity) {
				continue;
			}

			const resolution = MarketRuleResolver.generate(commodityRules, values, [resident.id, commodity.id]);

			if (resolution.quantity > 0) {
				stock.push(new Stock(commodity, resolution.quantity, resolution.quality, resolution.sources));
			}
		}

		// filter ownership likeliness
		for (let entry of [...stock]) {
			if (HashRandom.random([resident.id, entry.commodity.id]) < entry.commodity.residentialOwnershipLikeliness) {
				stock.splice(stock.indexOf(entry), 1);
			}
		}

		// round whole items
		for (let item of stock) {
			const unit = await item.commodity.tradingUnit.fetch();

			if (unit.whole) {
				item.quantity = Math.round(item.quantity);
			}
		}

		return stock.filter(stock => stock.quantity > 0);
	}

	private trackAsset(stock: Stock[], commodity: Commodity, quantity: number, quality: number, ...sources: string[]) {
		let item = stock.find(item => item.commodity.id == commodity.id && item.quality == quality);

		if (!item) {
			item = new Stock(commodity, 0, quality);
			stock.push(item);
		}

		item.quantity += quantity;
		item.sources.push(...sources);

		if (item.quantity <= 0) {
			stock.splice(stock.indexOf(item), 1);
		}
	}
}
