import { Manager } from "vlserver";
import { Commodity, DbContext, LegalEntity } from "../managed/database";
import { convertToLegalCompanyName } from "../../interface/company";

type CommodityStockList = Map<Commodity, number>;

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
		const stock = new Map<Commodity, number>();

		// bought through trades
		const boughtTrades = await this.entity.trades
			.include(trade => trade.ask)
			.toArray();

		for (let trade of boughtTrades) {
			const ask = await trade.ask.fetch();
			const commodity = [...stock.keys()].find(commodity => commodity.id == ask.commodityId) ?? await ask.commodity.fetch();

			this.trackAsset(stock, commodity, trade.quantity);
		}

		// production output
		const productionOutputs = await this.database.productionOutput
			.where(output => output.production.producerId == this.entity.id)
			.include(output => output.commodity)
			.toArray();

		for (let production of productionOutputs) {
			const commodity = await production.commodity.fetch();

			this.trackAsset(stock, commodity, production.quantity);
		}

		// sold with trades
		/*
		const soldTrades = await this.database.trade
			.where(trade => trade.ask.askerId == this.entity.id)
			.include(trade => trade.ask)
			.toArray();

		for (let trade of soldTrades) {
			const ask = await trade.ask.fetch();
			const commodity = [...stock.keys()].find(commodity => commodity.id == ask.commodityId) ?? await ask.commodity.fetch();

			this.trackAsset(stock, commodity, -trade.quantity);
		}

		*/

		// used in production
		const productionInputs = await this.database.productionInput
			.where(output => output.production.producerId == this.entity.id)
			.include(output => output.commodity)
			.toArray();

		for (let production of productionInputs) {
			const commodity = await production.commodity.fetch();

			this.trackAsset(stock, commodity, -production.quantity);
		}

		return stock;
	}

	private trackAsset(stock: CommodityStockList, commodity: Commodity, quantity: number) {
		const existing = [...stock.keys()].find(existing => existing.id == commodity.id);

		if (existing) {
			const updated = stock.get(existing) + quantity;

			if (updated) {
				stock.set(existing, updated);
			} else {
				stock.delete(existing);
			}
		} else {
			stock.set(commodity, quantity);
		}
	}
}
