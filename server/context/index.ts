import { composeItemContexts, writeItemContexts } from "..";
import { Interpreter, SystemMessage, ToolError, UserMessage } from "../life/interpreter";
import { Language } from "../life/language";
import { DbContext, ItemContext, ItemContextFragment, ItemContextLink, ItemContextLinkRank } from "../managed/database";
import { ItemContextComposeable, ItemContextComposer, FoundItemContextLink } from "./composer";
import { itemContextTypes } from "./types";

export class ItemContextTracker {
	static instance: ItemContextTracker;

	types = itemContextTypes(this.database);

	// require update after one week
	updateRate = 1000 * 60 * 60 * 24 * 7;

	constructor(
		private database: DbContext
	) {}

	async find(id: string, maxRank = ItemContextLinkRank.far, peers: ItemContextComposeable[] = []) {
		console.log(`[item context] find ${id}`);

		const maxAge = new Date(+new Date() - this.updateRate);

		const existing = await this.database.itemContext
			.where(context => context.updated.isAfter(maxAge))
			.where(context => context.context != null) // only completed content
			.first(context => context.itemId == id)

		if (existing) {
			return existing;
		}

		for (let type of this.types) {
			const item = await type.find(id);

			if (item) {
				return await this.update(item, type, maxRank, peers);
			}
		}
	}

	async update<ItemType extends ItemContextComposeable>(item: ItemType, type: ItemContextComposer<any>, maxRank: ItemContextLinkRank, peers: ItemContextComposeable[]) {
		if (!composeItemContexts) {
			return;
		}

		peers.push(item);

		const title = type.title(item);

		console.log(`#### ITEM: ${item.id} ${title}`, maxRank)

		let context = await this.database.itemContext.first(context => context.itemId == item.id);

		if (!context) {
			context = new ItemContext();
			context.itemId = item.id;
			context.name = title;

			await context.create();
		}

		const fragmentComposers = await type.compose(item, maxRank);
		const fragments: ItemContextFragment[] = [];
		const links: FoundItemContextLink[] = [];

		for (let composer of fragmentComposers) {
			composer.database = this.database;
			await composer.compose(item);

			fragments.push(...composer.fragments);
			links.push(...composer.links);
		}

		// remove links that are already being inspected
		// prevents circular dependencies
		const newLinks = links.filter(link => !peers.find(peer => peer.id == link.target));
		context.dependencyComplete = links.length == newLinks.length;

		console.log(fragments.map(fragment => `${fragment.title}: ${fragment.content.substring(0, 100)}`));
		console.log(links.length);

		console.group();

		const linkedItems = [];

		for (let link of newLinks) {
			const linked = await this.find(link.target, this.nextRank(maxRank), peers);

			if (linked) {
				linkedItems.push(linked);
			}
		}

		console.groupEnd();

		// replace fragments
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
				link.rank = reference.rank;
				link.target = target;
				link.connection = reference.connection;

				await link.create();
			}
		}

		await this.updateContext(context);
	}

	async updateContext(context: ItemContext) {
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

					switch (link.rank) {
						case ItemContextLinkRank.primary: { interpreter.remember([connection, new UserMessage(item.context)]); break; }
						case ItemContextLinkRank.near: { interpreter.remember([connection, new UserMessage(item.summary)]); break; }
						case ItemContextLinkRank.far: { interpreter.remember([connection, new UserMessage(item.tagline)]); break; }
					}
				}
			}

			interpreter.execute(new SystemMessage(`
				Combine the provided information into a text.
				Try to include every detail, do not invent new stuff.
				Do not make sections with headers, keep the whole content plain.

				Call the composed tool when completed.
			`));
		});

		context.summary = await new Promise<string>(done => {
			const interpreter = new Interpreter('smart');
			interpreter.addTool('summarized', [{ type: String, name: 'content' }], content => done(content));
			interpreter.remember([new UserMessage(`# ${context.name}`), new UserMessage(context.context)]);
			interpreter.execute(new SystemMessage(`
				Summarize the text into five sentences.
				Call the summarized tool when completed.
			`));
		});

		context.tagline = await new Promise<string>(done => {
			const interpreter = new Interpreter('smart');

			interpreter.addTool('summarized', [{ type: String, name: 'content' }], content => {
				if (content.split('. ').length > 2) {
					console.log(content);

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

	private nextRank(rank: ItemContextLinkRank) {
		switch (rank) {
			case ItemContextLinkRank.far: return ItemContextLinkRank.near;
			case ItemContextLinkRank.near: return ItemContextLinkRank.primary;
		}
	}

	rank(rank: ItemContextLinkRank) {
		switch (rank) {
			case ItemContextLinkRank.primary: return 1;
			case ItemContextLinkRank.far: return 2;
			case ItemContextLinkRank.near: return 3;
		}
	}
}
