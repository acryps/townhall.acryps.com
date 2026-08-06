import { Commodity, DbContext, LegalEntity, Resident, StockSeed, StockSeedRule, StockSeedRuleOperation, StockSeedRuleProperty } from "../managed/database";
import { convertToLegalCompanyName } from "../../interface/company";
import { Stock } from "./stock";
import { HashRandom } from "./random";
import { formatTradingUnit } from "../../interface/trading-unit";

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

	async getCommunity() {
		const community: TradingEntity[] = [];

		if (this.entity.residentId) {
			const resident = await this.entity.resident.fetch();
			const mainTenancy = await resident.mainTenancy.fetch();

			if (mainTenancy) {
				const peers = await this.database.tenancy
					.where(tenancy => tenancy.id != mainTenancy.id)
					.where(tenancy => tenancy.dwellingId == mainTenancy.dwellingId)
					.include(tenancy => tenancy.inhabitant)
					.toArray();

				for (let tenancy of peers) {
					const resident = await tenancy.inhabitant.fetch();
					let legalEntity = await this.database.legalEntity.first(entity => entity.residentId == resident.id);

					if (!legalEntity) {
						legalEntity = new LegalEntity();
						legalEntity.residentId = resident.id;

						await legalEntity.create();
					}

					community.push(await TradingEntity.from(legalEntity, this.database));
				}
			}
		}

		return community;
	}

	async getIncome() {
		let balance = 0;

		/*
		const sales = await this.database.trade
			.where(trade => trade.ask.askerId == this.entity.id)
			.toArray();

		for (let trade of sales) {
			balance += trade.price * trade.quantity;
		}

		const transports = await this.database.commodityTransport
			.where(transport => transport.route.operatorId == this.entity.id)
			.toArray();

		for (let transport of transports) {
			balance += transport.price;
		}
		*/

		return balance;
	}

	async getExpenses() {
		let balance = 0;

		const buys = await this.entity.trades
			.toArray();

		for (let trade of buys) {
			balance += trade.price * trade.quantity;
		}

		const productions = await this.entity.productions
			.toArray();

		for (let production of productions) {
			balance += production.cost;
		}

		const transports = await this.entity.boughtTransports
			.toArray();

		for (let transport of transports) {
			balance += transport.price;
		}

		return balance;
	}

	async getTradeBalance() {
		const income = await this.getIncome();
		const expenses = await this.getExpenses();

		return income - expenses;
	}

	async getStock() {
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
			for (let entry of await this.generateResidentSeedStock(await this.entity.resident.fetch())) {
				this.trackAsset(stock, entry.commodity, entry.quantity, entry.quality, ...entry.sources);
			}
		}

		stock.sort((a, b) => a.commodity.name.localeCompare(b.commodity.name));

		return stock;
	}

	private async generateResidentSeedStock(resident: Resident) {
		const stock: Stock[] = [];

		const assessment = await resident.assessments
			.toArray();

		const parameters = await this.database.residentAssessmentParameter.toArray();

		const commodities = await this.database.commodity
			.include(commodity => commodity.tradingUnit)
			.toArray();

		const rules = await this.database.stockSeedRule
			.orderByAscending(rule => rule.id) // sort to have strict case for conflicts
			.toArray();

		const qualityRules: StockSeedRule[] = [];

		for (let rule of rules) {
			const assessedParameter = assessment.find(parameter => parameter.parameterId == rule.parameterId);

			if (assessedParameter && assessedParameter.value >= rule.parameterMinimum && assessedParameter.value <= rule.parameterMaximum) {
				switch (rule.property) {
					case StockSeedRuleProperty.quality: {
						qualityRules.push(rule);

						break;
					}

					case StockSeedRuleProperty.quantity: {
						const commodity = commodities.find(commodity => commodity.id == rule.commodityId);
						const unit = await commodity.tradingUnit.fetch();
						const parameter = parameters.find(parameter => parameter.id == assessedParameter.parameterId);

						const value = HashRandom.random([resident.id, rule.id], rule.valueMinimum, rule.valueMaximum);

						let entry = stock.find(entry => entry.commodity == commodity);

						if (!entry) {
							entry = new Stock(commodity);
							stock.push(entry);
						}

						const sourceText = `${formatTradingUnit(unit, value)} ${parameter.name} ${rule.parameterMinimum} < ${assessedParameter.value} < ${rule.parameterMaximum} (rule #${rule.id.split('-')[0]})`;

						switch (rule.operation) {
							case StockSeedRuleOperation.apply: {
								entry.sources = [`=${sourceText}`];
								entry.quantity = value;

								break;
							}

							case StockSeedRuleOperation.add: {
								entry.sources.push(`+${sourceText}`);
								entry.quantity += value;

								break;
							}

							case StockSeedRuleOperation.subtract: {
								entry.sources.push(`-${sourceText}`);
								entry.quantity -= value;

								break;
							}
						}

						break;
					}
				}
			}
		}

		// assign quality to given stock
		for (let qualityRule of qualityRules) {
			for (let entry of stock) {
				if (entry.commodity.id == qualityRule.commodityId) {
					const quality = HashRandom.random([resident.id, qualityRule.id], qualityRule.valueMinimum, qualityRule.valueMaximum);

					entry.quality = Math.round(quality);
				}
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
