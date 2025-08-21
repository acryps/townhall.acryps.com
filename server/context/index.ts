import { deepEqual } from "node:assert";
import { composeItemContexts, writeItemContexts } from "..";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../life/interpreter";
import { Language } from "../life/language";
import { Logger } from "../log";
import { DbContext, ItemContext, ItemContextFragment, ItemContextLink, ItemContextLinkRank } from "../managed/database";
import { ItemContextComposeable, ItemContextComposer, FoundItemContextLink } from "./composer";
import { itemContextTypes } from "./types";

export class ItemContextTracker {
	static instance: ItemContextTracker;

	logger = new Logger('context');
	types = itemContextTypes(this.database);

	// require update after one week
	updateRate = 1000 * 60 * 60 * 24 * 7;

	activeExpanders = new Map<string, Promise<void>>();

	constructor(
		private database: DbContext
	) {
		this.logger.accessory = () => `${this.activeExpanders.size}`;
	}

	async find(id: string, depth = 1, peers: string[] = []) {
		const maxAge = new Date(+new Date() - this.updateRate);

		const existing = await this.database.itemContext
			.where(context => context.updated.isAfter(maxAge))
			.where(context => context.context != null) // only completed content
			.first(context => context.itemId == id)

		if (existing) {
			return existing;
		}

		await this.expand(id, depth, peers);
	}

	expand(id: string, depth: number, peers: string[]) {
		if (this.activeExpanders.has(id)) {
			return this.activeExpanders.get(id);
		}

		const expander = new Promise<void>(async done => {
			for (let type of this.types) {
				const item = await type.find(id);

				if (item) {
					await this.update(item, type, depth, peers);

					done();
				}
			}

			// not composer found
			done();
		});

		this.activeExpanders.set(id, expander);

		return expander;
	}

	async update<ItemType extends ItemContextComposeable>(item: ItemType, type: ItemContextComposer<any>, depth: number, peers: string[]) {
		peers.push(item.id);

		const title = type.title(item);
		const logger = this.logger.task(title);
		logger.log(`update ${item.id} with ${type.constructor.name} depth ${depth}`);

		let context = await this.database.itemContext.first(context => context.itemId == item.id);

		if (!context) {
			context = new ItemContext();
			context.itemId = item.id;
			context.name = title;
			context.depth = depth;

			await context.create();
		}

		logger.log('collect composers');

		const fragmentComposers = await type.compose(item, depth);
		const fragments: ItemContextFragment[] = [];
		const links: FoundItemContextLink[] = [];

		for (let layer = 0; layer < fragmentComposers.length; layer++) {
			for (let composer of fragmentComposers[layer]) {
				composer.database = this.database;
				composer.layer = layer;

				await composer.compose(item);

				fragments.push(...composer.fragments);
				links.push(...composer.links);
			}
		}

		for (let fragment of fragments) {
			logger.log(`fragment ${fragment.depth} ${fragment.title}: ${fragment.content.substring(0, 100)}`);
		}

		logger.log('follow links');

		for (let link of links) {
			if (!peers.includes(link.target)) {
				const distance = depth - link.distance;

				if (distance >= 0) {
					logger.log(`link ${link.distance}/${distance} ${link.connection} → ${link.target}`);

					await this.find(link.target, depth - link.distance, peers);
				} else {
					logger.log(`skipped link ${link.distance} ${link.connection} → ${link.target}`);
				}
			}
		}

		// replace fragments
		logger.log('save findings');

		for (let fragment of await context.fragments.toArray()) {
			await fragment.delete();
		}

		for (let fragment of fragments) {
			fragment.orderIndex = fragments.indexOf(fragment);
			fragment.item = context;

			await fragment.create();
		}

		// replace links
		for (let link of await context.links.toArray()) {
			await link.delete();
		}

		for (let reference of links) {
			const target = await this.database.itemContext.first(context => context.itemId == reference.target);

			// some links reference items that cannot be composed, this keeps them away
			if (target) {
				const link = new ItemContextLink();
				link.source = context;
				link.distance = reference.distance;
				link.target = target;
				link.connection = reference.connection;

				await link.create();
			}
		}

		logger.log('write context');
		await this.writeContext(context);

		logger.finish();
	}

	async writeContext(context: ItemContext) {
		if (!writeItemContexts) {
			return;
		}

		const fragments = await context.fragments.toArray();

		const links = await context.links
			.where(link => link.target.context != null) // only use links where the context has been written
			.include(link => link.target)
			.toArray();

		context.context = await new Promise<string>(async done => {
			const interpreter = new Interpreter('smart');
			interpreter.addTool('composed', [{ type: String, name: 'content' }], content => done(content));

			// fragments of this item
			interpreter.remember([new UserMessage(`# ${context.name}`)]);
			interpreter.remember(fragments.map(fragment => new UserMessage(`## ${fragment.title}\n${fragment.content}`)));

			// linked context
			if (links.length) {
				interpreter.remember([new UserMessage(`## Other context information for ${context.name}`)]);

				for (let link of links) {
					const item = await link.target.fetch();
					const connection = new UserMessage(`### ${link.connection}`);

					switch (link.distance) {
						case 1: {
							interpreter.remember([connection, new UserMessage(item.context)]);

							break;
						}

						case 2:
						case 3: {
							interpreter.remember([connection, new UserMessage(item.summary)]);

							break;
						}

						default: {
							interpreter.remember([connection, new UserMessage(item.tagline)]);
						}
					}
				}
			}

			interpreter.execute(new SystemMessage(`
				Combine the provided information into a text.
				Try to include every detail, do not invent new stuff.
				Do not make sections with headers, keep the whole content plain.
				Make its writing style factual and consistent.

				Call the composed tool when completed.
			`));
		});

		context.summary = await new Promise<string>(done => {
			const interpreter = new Interpreter('smart');
			interpreter.addTool('summarized', [{ type: String, name: 'content' }], content => done(content));
			interpreter.remember([new UserMessage(`# ${context.name}`), new UserMessage(context.context)]);
			interpreter.execute(new SystemMessage(`
				What is '${context.name}' about?
				We have collected the following information from our database, help us write a short summary leaving out unnecessary detail.

				Call the summarized tool when completed.
			`));
		});

		context.tagline = await new Promise<string>(done => {
			const interpreter = new Interpreter('smart');

			interpreter.addTool('summarized', [{ type: String, name: 'content' }], content => {
				if (content.split('. ').length > 2) {
					throw new ToolError('Make sure the only write one sentence, remove information if required, but only write one sentence.');
				}

				done(content)
			});

			interpreter.remember([new UserMessage(`# ${context.name}`), new UserMessage(context.summary)]);
			interpreter.execute(new SystemMessage(`
				Summarize the text into a single sentence tagline.
				It can only be one sentence long.
				Call the summarized tool when completed.
			`));
		});

		context.updated = new Date();
		await context.update();
	}
}
