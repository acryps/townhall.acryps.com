import { Queryable } from "vlquery";
import { Article, Borough, Commodity, DbContext, Epoch, LegalEntity, LegalEntityQueryProxy, StockSeed, TradeBid } from "../../managed/database";
import { TradingEntity } from "../entity";
import { convertToLegalCompanyName } from "../../../interface/company";
import { Time } from "../../../interface/time";
import { MarketTracker } from "../tracker";
import { time } from "node:console";

export abstract class MarketIterationGenerator {
	constructor(
		public database: DbContext,
		public tracker: MarketTracker
	) {}

	abstract generate(): Promise<any>;

	async randomEntity(tradeVolumeAdjusted = true) {
		let query: () => Queryable<LegalEntity, LegalEntityQueryProxy>;

		if (tradeVolumeAdjusted) {
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
		} else {
			query = () => this.database.legalEntity
				.where(entity => entity.state == null);
		}

		const entityCount = await query().count() - 1;
		const entity = await query()
			.skip(Math.floor(Math.random() * entityCount))
			.first();

		return await TradingEntity.from(entity, this.database);
	}

	async compileContext(trader: TradingEntity) {
		const lines: string[] = [];

		if (trader.entity.companyId) {
			const company = await trader.entity.company.fetch();

			const offices = await company.offices
				.where(office => office.closed == null)
				.include(office => office.property)
				.include(office => office.workOffers)
				.toArray();

			lines.push(
				`# Company ${company.name}`,
				`legally operating under the name '${convertToLegalCompanyName(company)}'`,
				`founded ${new Time(company.created).age()} years ago`,
				`about: ${company.description}`
			);

			const contracts = await this.database.workContract
				.where(contract => contract.offer.office.companyId == company.id)
				.where(contract => contract.canceled == null)
				.include(contract => contract.worker)
				.toArray();

			for (let office of offices) {
				const propery = await office.property.fetch();
				const borough = await propery.borough.fetch();

				lines.push(
					'',
					`## Office '${office.name}' located in ${borough.name}`,
					`opened ${new Time(office.opened).age()} years ago`,
					'',
					`jobs & workers working for ${company.name} at ${office.name}:`
				);

				for (let offer of await office.workOffers.toArray()) {
					const signedContracts = contracts.filter(contract => contract.offerId == offer.id);

					if (signedContracts.length) {
						const workers = [];

						for (let contract of signedContracts) {
							const worker = await contract.worker.fetch();

							workers.push(`${worker.givenName} ${worker.familyName}`);
						}

						lines.push(
							`${offer.title}: ${workers.join(', ')}`
						);
					}
				}
			}
		}

		if (trader.entity.boroughId) {
			const borough = await trader.entity.borough.fetch();

			lines.push(
				`# Borough ${borough.name}`,
				borough.description
			);
		}

		if (trader.entity.residentId) {
			const resident = await trader.entity.resident.fetch();

			const relatedBoroughs = new Map<Borough, string>();

			lines.push(
				`# Resident ${resident.givenName} ${resident.familyName}`,
				`age: ${new Time(resident.birthday).age()} years old`
			);

			lines.push(
				`## Biography of ${resident.givenName}`,
				 resident.biography
			);

			const home = await resident.mainTenancy.fetch();

			if (home) {
				const dwelling = await home.dwelling.fetch();
				const property = await dwelling.property.fetch();
				const borough = await property.borough.fetch();

				relatedBoroughs.set(borough, 'lives');

				lines.push(
					'',
					'## Home',
					`lives in ${borough.name} since ${new Time(home.start).age()} years`
				);

				const peers = await dwelling.tenants
					.where(tenant => tenant.id != home.id)
					.include(tenant => tenant.inhabitant)
					.toArray();

				if (peers.length) {
					for (let peer of peers) {
						const inhabitant = await peer.inhabitant.fetch();

						lines.push(`lives with ${inhabitant.givenName} ${inhabitant.familyName}, aged ${new Time(inhabitant.birthday).age()}`);
					}
				} else {
					lines.push('lives alone');
				}
			}

			const currentJob = await resident.workContracts
				.where(contract => contract.canceled == null)
				.orderByDescending(contract => contract.signed)
				.first();

			if (currentJob) {
				const offer = await currentJob.offer.fetch();

				const office = await offer.office.fetch();
				const property = await office.property.fetch();
				const borough = await property.borough.fetch();
				relatedBoroughs.set(borough, 'works');

				const company = await office.company.fetch();

				lines.push(
					'',
					'## Work',
					`working as ${offer.title} for ${company.name} at ${office.name} in ${borough.name} since ${new Time(currentJob.signed).age()} years`,
					'',
					`about ${convertToLegalCompanyName(company)}:`,
					company.description
				);
			}

			const relations = await this.database.residentRelationship
				.where(relation => relation.initiatorId == resident.id || relation.peerId == resident.id)
				.where(relation => relation.conflict == null)
				.include(relation => relation.initiator)
				.include(relation => relation.peer)
				.toArray();

			if (relations.length) {
				lines.push('', '## Relations to other people');

				for (let relation of relations) {
					const peer = relation.initiatorId == resident.id ? await relation.peer.fetch() : await relation.initiator.fetch();

					lines.push(`${resident.givenName} is connected to ${peer.givenName} ${peer.familyName} (${relation.purpose})`);

					if (relation.summary) {
						lines.push(`connection: ${relation.summary}`);
					}

					lines.push('');
				}
			}

			if (relatedBoroughs.size) {
				lines.push('', '## Regional Context');

				const elaboratedBoroughs: string[] = [];

				for (let [borough, relation] of relatedBoroughs) {
					if (!elaboratedBoroughs.includes(borough.id)) {
						lines.push(`about ${borough.name}, where ${resident.givenName} ${relation}:`);
						lines.push(borough.description);

						elaboratedBoroughs.push(borough.id);
					}
				}
			}
		}

		return lines.join('\n');
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

	async getOpenSeedStock(trader: TradingEntity) {
		return await trader.entity.stockSeeds
			.where(seed => seed.commodityId == null) // already listed in stock if fulfilled
			.toArray();
	}

	async getOpenCommunitySeedStock(trader: TradingEntity) {
		const traders = [trader, ...(await trader.getCommunity())];
		const stock: StockSeed[] = [];

		for (let trader of traders) {
			stock.push(...(await this.getOpenSeedStock(trader)));
		}

		return stock;
	}

	async compileSeedStock(title: string, seeds: StockSeed[]) {
		return [
			`# ${title}`,

			...seeds.map(seed => `- id=${seed.id.split('-')[0]} ${seed.sourceName}: ${seed.sourceQuantity}`)
		].join('\n');
	}

	async getRandomCommodities(count = 50) {
		const commodities = await this.database.commodity.toArray();

		while (commodities.length > count) {
			commodities.splice(Math.floor(Math.random() * commodities.length), 1);
		}

		return commodities;
	}

	async compileCompactCommoditiesList(title: string, commodities: Commodity[]) {
		return await this.compileCommoditiesList(title, commodities, 0);
	}

	async compileCommoditiesList(title: string, commodities: Commodity[], expandedCount = 50) {
		const list = [];

		// only show descriptions for first 50 items
		for (let commodity of commodities.slice(0, expandedCount)) {
			const price = this.tracker.buyingPrice(commodity);

			list.push(
				`id=${commodity.id.split('-')[0]} ${commodity.name} (unit: ${commodity.unit})`,
				`price: ${isNaN(price) ? 'not enough data' : `~${price}/${commodity.unit}`}`,
				`description: ${commodity.description}`,
				''
			);
		}

		for (let commodity of commodities.slice(expandedCount)) {
			const price = this.tracker.buyingPrice(commodity);

			list.push(
				`id=${commodity.id.split('-')[0]} ${commodity.name} (unit: ${commodity.unit}, price: ${isNaN(price) ? 'not enough data' : `~${price}/${commodity.unit}`})`,
			);
		}

		return [
			`# ${title}`,
			...this.pricePointers,

			...list
		].join('\n');
	}

	async getDemand() {
		const bids = await this.database.tradeBid
			.where(bid => bid.fulfilled == null)
			.include(bid => bid.commodity)
			.toArray();

		while (bids.length > 50) {
			bids.splice(Math.floor(Math.random() * bids.length), 1);
		}

		return bids;
	}

	async getOpenDemand(trader: TradingEntity) {
		const bids = await trader.entity.bids
			.where(bid => bid.fulfilled == null)
			.include(bid => bid.commodity)
			.include(bid => bid)
			.toArray();

		while (bids.length > 50) {
			bids.splice(Math.floor(Math.random() * bids.length), 1);
		}

		return bids;
	}

	async compileDemand(title: string, demand: TradeBid[]) {
		const list = [];

		for (let bid of demand) {
			const commodity = await bid.commodity.fetch();

			list.push(
				`#${bid.id.split('-')[0]} ${commodity.name} (unit: ${commodity.unit})`, /// TODO COMPLETE
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
