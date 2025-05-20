import { Manager } from "vlserver";
import { DbContext, LegalEntity, LegalEntityQueryProxy } from "../../managed/database";
import { DbSet, Entity, Queryable } from "vlquery";
import { LegalEntityViewModel } from ".";
import { LegalEntityReferenceCounter } from "./reference-counter";

export class LegalEntityManager extends Manager {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async findBorough(id: string) {
		let entity = await this.database.legalEntity.first(entity => entity.boroughId == id);

		if (entity) {
			return;
		}

		entity = new LegalEntity();
		entity.boroughId = id;

		await entity.create();

		return entity;
	}

	async find(search: string) {
		search = search.trim().toLowerCase();

		const results = await Promise.all([
			this.referenceItem(
				this.database.borough, search,
				(query, term) => query.where(borough => borough.name.lowercase().startsWith(term)),
				id => this.database.legalEntity.first(entity => entity.boroughId == id),
				'borough'
			),

			this.referenceItem(
				this.database.company, search,
				(query, term) => query.where(company => company.name.lowercase().startsWith(term)),
				id => this.database.legalEntity.first(entity => entity.companyId == id),
				'company'
			),

			this.referenceItem(
				this.database.resident, search,
				(query, term) => query.where(resident => resident.givenName.lowercase().startsWith(term) || resident.familyName.lowercase().startsWith(term)),
				id => this.database.legalEntity.first(entity => entity.residentId == id),
				'resident'
			),
		]);

		if ('state'.startsWith(search)) {
			results.push([
				await this.database.legalEntity.first(entity => entity.state == true)
			]);
		}

		const entities = results.flat();
		entities.sort((a, b) => this.rank(b) - this.rank(a));

		return entities;
	}

	async referenceItem<SourceType extends Entity<any>>(
		set: DbSet<SourceType, any>,
		search: string,
		filter: (query: Queryable<SourceType, any>, term: string) => Queryable<SourceType, any>,
		resolve: (id: string) => Promise<LegalEntity>,
		assign: keyof LegalEntity
	) {
		let query = set.limit(5);

		for (let term of search.split(/\s+/)) {
			query = filter(query, term);
		}

		const results = await query.toArray();
		const entities: LegalEntity[] = [];

		for (let item of results) {
			let entity = await resolve(item.id as string);

			if (!entity) {
				entity = new LegalEntity();
				(entity as any)[assign] = item;

				await entity.create();
			}

			entities.push(entity);
		}

		return entities;
	}

	private rank(item: LegalEntity) {
		const index = LegalEntityReferenceCounter.active.ranked.indexOf(item);

		if (index == -1) {
			return Infinity;
		}

		return index;
	}
}
