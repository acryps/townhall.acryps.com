import { Logger } from "@acryps/log";
import { DbContext } from "./managed/database";
import { parentPort, Worker } from "worker_threads";
import { readFileSync } from "fs";
import { DbSet, Entity } from "vlquery";
import { randomBytes } from "crypto";

declare global {
	let workerDispatchTarget: string;
}

export class WorkerDispatch {
	static logger = new Logger('worker-dispatch');

	static applicationMain: string;
	static database: DbContext;

	static main(database: DbContext) {
		if (parentPort) {
			this.logger.log(`started as worker`);

			parentPort.on('message', async identifier => {
				let target: typeof WorkerHandle;

				for (let global in globalThis) {
					if (globalThis[global] instanceof Function && globalThis[global].name == workerDispatchTarget) {
						target = globalThis[global];
					}
				}

				const result = await target.dispatch(this.logger.task(identifier), database);
				parentPort.postMessage(this.serialize(result));
			});

			return true;
		} else {
			this.logger.log(`started as controller`);

			this.applicationMain = readFileSync(process.argv[1]).toString();
			this.database = database;

			return false;
		}
	}

	static dispatch<ResponseType>(handle: typeof WorkerHandle) {
		const identifier = Math.random().toString(36).substring(2);
		const logger = this.logger.task(`${handle.name} ${identifier}`);

		const start = Date.now();

		return new Promise<ResponseType>((done, fail) => {
			const startScript = [
				// set the target function / class
				`globalThis.workerDispatchTarget = ${JSON.stringify(handle.name)};`,

				// execute the rest of the main application
				// WorkerDispatch.main will stop the rest of the program from executing
				this.applicationMain,
			].join('\n');

			const worker = new Worker(startScript, {
				eval: true,
				stdout: true,
				stderr: true
			});

			worker.stdout.on('data', (chunk) => {
				process.stdout.write(`\x1b[2m${identifier} ${chunk}\x1b[0m`);
			});

			worker.stderr.on('data', (chunk) => {
				process.stderr.write(`${identifier} ${chunk}`);
			});

			worker.on('message', async result => {
				logger.finish(`completed in ${Date.now() - start}ms`);

				done(await this.deserialize(result, this.database));
			});

			worker.on('online', () => {
				worker.postMessage(identifier);
			});

			worker.on('error', error => {
				logger.error(`failed in ${Date.now() - start}ms`, error);

				fail(error);
			});
		});
	}

	static async deserialize(serialized: any, database: DbContext) {
		const references = new Map<string, Entity<any>>();

		for (let tableName in serialized.tables) {
			const table = serialized.tables[tableName];
			let sourceSet: DbSet<any, any>;

			for (let setName in this.database) {
				const set = this.database[setName];

				if (set instanceof DbSet && set.$$meta.source == tableName) {
					sourceSet = set;
				}
			}

			const identifiers = table.map(entity => entity.identifier);
			const items = await sourceSet.where(item => item.id.includedIn(identifiers)).toArray();

			for (let reference of table) {
				references.set(reference.key, items.find(item => item.id == reference.identifier));
			}
		}

		const recurse = source => {
			switch (typeof source) {
				case 'string': {
					if (references.has(source)) {
						return references.get(source);
					}

					return source;
				}

				case 'bigint':
				case 'boolean':
				case 'number':
				case 'undefined': {
					return source;
				}

				case 'object': {
					if (source === null) {
						return null;
					}

					if (Array.isArray(source)) {
						return source.map(item => recurse(item));
					}

					const converted = {};

					for (let key in source) {
						converted[key] = recurse(source[key]);
					}

					return converted;
				}
			}
		};

		return recurse(serialized.data);
	}

	static serialize(response: any) {
		const tables: Record<string, {
			key: string,
			identifier: string | number
		}[]> = {};

		const references = new Map<Entity<any>, string>();

		const recurse = source => {
			switch (typeof source) {
				case 'bigint':
				case 'boolean':
				case 'number':
				case 'string':
				case 'undefined': {
					return source;
				}

				case 'object': {
					if (source === null) {
						return null;
					}

					// replace entity
					if (source instanceof Entity) {
						if (references.has(source)) {
							return references.get(source);
						}

						const key = randomBytes(16).toString('base64');

						if (!(source.$$meta.source in tables)) {
							tables[source.$$meta.source] = [];
						}

						tables[source.$$meta.source].push({
							key,
							identifier: source.id
						});

						references.set(source, key);

						return key;
					}

					if (Array.isArray(source)) {
						return source.map(item => recurse(item));
					}

					const converted = {};

					for (let key in source) {
						converted[key] = recurse(source[key]);
					}

					return converted;
				}
			}
		};

		return {
			tables,
			data: recurse(response)
		};
	}
}

export class WorkerHandle {
	static async dispatch(logger: Logger, database: DbContext): Promise<any> {
		throw 'no handle implemented';
	}
}
