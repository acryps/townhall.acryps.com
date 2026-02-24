import { Queryable } from "vlquery";
import { Article, Commodity, DbContext, Epoch, LegalEntity, LegalEntityQueryProxy } from "../../managed/database";
import { TradingEntity } from "../entity";
import { convertToLegalCompanyName } from "../../../interface/company";
import { Time } from "../../../interface/time";
import { MarketTracker } from "../tracker";

export abstract class MarketIterationGenerator {
	constructor(
		public database: DbContext,
		public tracker: MarketTracker
	) {}

	abstract generate(): Promise<any>;

	async randomEntity() {
		let query: () => Queryable<LegalEntity, LegalEntityQueryProxy>;

		if (Math.random() < 0.2) {
			// any item
			query = () => this.database.legalEntity
				.where(entity => entity.state == null);
		} else {
			// a company
			query = () => this.database.legalEntity
				.where(entity => entity.state == null)
				.where(entity => entity.companyId != null);
		}

		const entityCount = await query().count() - 1;
		const entity = await query()
			.skip(Math.floor(Math.random() * entityCount))
			.first();

		return await TradingEntity.from(entity, this.database);
	}

	async compileContext(trader: TradingEntity) {
		if (trader.entity.companyId) {
			const company = await trader.entity.company.fetch();

			const contracts = await this.database.workContract
				.where(contract => contract.canceled == null)
				.where(contract => contract.offer.office.companyId == company.id)
				.count();

			const offices = await company.offices.toArray();

			return [
				`# Company ${convertToLegalCompanyName(company)}`,
				`workforce: ${contracts} workers`,
				`about: ${company.description}`,
				...offices.map((office, index) => `office ${index + 1}: ${office.name}`)
			].join('\n');
		}

		if (trader.entity.boroughId) {
			const borough = await trader.entity.borough.fetch();

			return [
				`# Borough ${borough.name}`,
				borough.description
			].join('\n');
		}

		if (trader.entity.residentId) {
			const resident = await trader.entity.resident.fetch();

			return [
				`# Resident ${resident.givenName} ${resident.familyName}`,
				`age: ${new Time(resident.birthday).age()} years old`,
				`about: ${resident.biography}`
			].join('\n');
		}
	}

	async getNews() {
		const articles = await this.database.article
			.where(article => article.published != null)
			.orderByDescending(article => article.published)
			.toArray();

		const selection = [];
		let cursor = Math.floor(Math.random() * 3);

		while (articles[cursor]) {
			selection.push(articles[cursor]);

			// make spacing grow with each article
			cursor += Math.ceil(Math.random() * selection.length * 4);
		}

		return selection;
	}

	// only expands some articles, uses summary for most
	async compileNews(title: string, articles: Article[]) {
		return [
			`# ${title}`,

			articles.filter(article => article.generatedSummary).map(article => [
				`## ${article.title}`,
				`published ${new Time(article.published).toDateString()}`,
				article.generatedSummary ?? article.body.split(/\s+/g).join(' ')
			].join('\n')).join('\n\n')
		].join('\n');
	}

	async compileStock(title: string, trader: TradingEntity) {
		const stock = await trader.getStock();

		return [
			`# ${title}`,
			...this.pricePointers,

			[...stock.entries()].map(
				([commodity, count]) => `- ${commodity.name}: ${count} ${commodity.unit}, price ~${this.tracker.buyingPrice(commodity)}/${commodity.unit}`
			).join('\n')
		].join('\n');
	}

	async getCommodities() {
		const commodities = await this.database.commodity.toArray();

		while (commodities.length > 50) {
			commodities.splice(Math.floor(Math.random() * commodities.length), 1);
		}

		return commodities;
	}

	async compileCommoditiesList(title: string, commodities: Commodity[]) {
		const list = [];

		// only show descriptions for first 50 items
		for (let commodity of commodities.slice(0, 50)) {
			const price = this.tracker.buyingPrice(commodity);

			list.push(
				`id=${commodity.id.split('-')[0]} ${commodity.name} (unit: ${commodity.unit})`,
				`price: ${isNaN(price) ? 'not enough data' : `~${price}/${commodity.unit}`}`,
				`description: ${commodity.description}`,
				''
			);
		}

		for (let commodity of commodities.slice(50)) {
			const price = this.tracker.buyingPrice(commodity);

			list.push(
				`#${commodity.id.split('-')[0]} ${commodity.name} (unit: ${commodity.unit}, price: ${isNaN(price) ? 'not enough data' : `~${price}/${commodity.unit}`})`,
				''
			);
		}

		return [
			`# ${title}`,
			...this.pricePointers,

			...list
		].join('\n');
	}

	private readonly pricePointers = [
		'prices are all average asking prices.',
		'some commodities do not have enough data to show a average price yet',
		'they are just as valid of an option as any other commodity'
	];
}
