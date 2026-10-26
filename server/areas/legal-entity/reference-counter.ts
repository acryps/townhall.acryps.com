import { DbClient, DbSet, ForeignReference } from "vlquery";
import { DbContext, LegalEntity } from "../../managed/database";
import { Logger } from "@acryps/log";
import { Task } from "../../scheduler";
import { WorkerDispatch, WorkerHandle } from "../../worker";

export class LegalEntityReferenceCounter extends Task {
	private logger = new Logger('legal entity rank');

	static active: LegalEntityReferenceCounter;

	usesWorker = true;

	sources: ForeignReference<LegalEntity>[] = [];
	ranked: LegalEntity[] = [];

	constructor(
		private database: DbContext
	) {
		super();

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

	// the heavy DB loop below runs on a worker thread - see `LegalEntityReferenceCounterWorkerHandle`
	async run() {
		this.ranked = await WorkerDispatch.dispatch<LegalEntity[]>(LegalEntityReferenceCounterWorkerHandle);

		return 1000 * 60 * 60;
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

		this.ranked = referenceCounter.map(item => item.entity);
	}
}

export class LegalEntityReferenceCounterWorkerHandle extends WorkerHandle {
	static async dispatch(logger: Logger, database: DbContext) {
		const counter = new LegalEntityReferenceCounter(database);
		await counter.rerank();

		return counter.ranked;
	}
}
