import { DbClient, DbSet, ForeignReference } from "vlquery";
import { DbContext, LegalEntity } from "../../managed/database";

export class LegalEntityReferenceCounter {
	static active: LegalEntityReferenceCounter;

	sources: ForeignReference<LegalEntity>[] = [];
	ranked: LegalEntity[] = [];

	constructor(
		private database: DbContext
	) {
		if (LegalEntityReferenceCounter.active) {
			throw 'Legal Entity Reference Counter already running';
		}

		LegalEntityReferenceCounter.active = this;

		for (let tableKey in database) {
			const table = database[tableKey];

			if (table instanceof DbSet) {
				const proxy = new table.modelConstructor();

				for (let propertyKey in proxy) {
					const property = proxy[propertyKey];

					if (property instanceof ForeignReference) {
						if (property.$relation == LegalEntity) {
							this.sources.push(property);
						}
					}
				}
			}
		}

		for (let source of this.sources) {
			console.log(`${source.$$item.$$meta.source} references a legal entity`);
		}
	}

	schedule() {
		this.update();

		setInterval(() => {
			this.update();
		}, 1000 * 60 * 60);
	}

	async update() {
		const referenceCounter = (await this.database.legalEntity.toArray()).map(entity => ({ entity, references: 0 }));

		for (let source of this.sources) {
			const references = await source.$$item.$$meta.set.includeTree({
				[source.$column]: true
			}).toArray();

			for (let reference of references) {
				const entity = referenceCounter.find(item => item.entity.id == reference[source.$column]);

				if (entity) {
					entity.references++;
				}
			}
		}

		referenceCounter.sort((a, b) => b.references - a.references);

		console.log(`reference count updated, most common item: ${referenceCounter[0].entity.id}`);

		this.ranked = referenceCounter.map(item => item.entity);
	}
}
