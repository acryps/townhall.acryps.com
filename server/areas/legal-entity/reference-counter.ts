import { DbClient, DbSet, ForeignReference } from "vlquery";
import { DbContext, LegalEntity } from "../../managed/database";
import { Logger } from "@acryps/log";

export class LegalEntityReferenceCounter {
	private logger = new Logger('legal entity rank');

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

		this.logger.log(`legal entity referenced in ${this.sources.map(source => source.$$item.$$meta.source).join(', ')}`);
	}

	schedule() {
		this.rerank();

		setInterval(() => {
			this.rerank();
		}, 1000 * 60 * 60);
	}

	async rerank() {
		const logger = this.logger.task('rerank');
		const referenceCounter = (await this.database.legalEntity.toArray()).map(entity => ({ entity, references: 0 }));

		for (let source of this.sources) {

			const references = await source.$$item.$$meta.set.includeTree({
				[source.$column]: true
			}).toArray();

			logger.log(`${source.$$item.$$meta.source} references to ${source.$column}: ${references.length}`);

			for (let reference of references) {
				const entity = referenceCounter.find(item => item.entity.id == reference[source.$column]);

				if (entity) {
					entity.references++;
				}
			}
		}

		referenceCounter.sort((a, b) => b.references - a.references);

		logger.log(`save rank on ${referenceCounter.length} items`);

		for (let item of referenceCounter) {
			if (item.entity.referenceCount != item.references) {
				item.entity.referenceCount = item.references;

				await item.entity.update();
			}
		}

		logger.finish('ranked');

		this.ranked = referenceCounter.map(item => item.entity);
	}
}
