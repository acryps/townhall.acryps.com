import { run } from "node:test";
import { DbContext, ItemContextFragment, ItemContextLink, ItemContextLinkRank } from "../managed/database";
import { tap } from "node:test/reporters";

export type ItemContextComposeable = { id: string }
export type FoundItemContextLink = { rank: ItemContextLinkRank, target: string, connection: string };

export abstract class ItemContextComposer<ItemType extends ItemContextComposeable> {
	abstract find(id: string): Promise<ItemType>;
	abstract title(item: ItemType): string;

	async compose(item: ItemType, rank: ItemContextLinkRank) {
		switch (rank) {
			case ItemContextLinkRank.far: return [...await this.primary(item), ...await this.near(item), ...await this.far(item)]
			case ItemContextLinkRank.near: return [...await this.primary(item), ...await this.near(item)]
			case ItemContextLinkRank.primary: return [...await this.primary(item)]
		}
	}

	async primary(item: ItemType): Promise<ItemContextFragmentComposer<any>[]> { return []; }
	async near(item: ItemType): Promise<ItemContextFragmentComposer<any>[]> { return []; }
	async far(item: ItemType): Promise<ItemContextFragmentComposer<any>[]> { return []; }

	constructor(
		protected database: DbContext
	) {}
}

export abstract class ItemContextFragmentComposer<ItemType extends ItemContextComposeable> {
	database: DbContext;

	abstract compose(item: ItemType): Promise<any>;

	fragments: ItemContextFragment[] = [];
	links: FoundItemContextLink[] = [];

	found(rank: ItemContextLinkRank, title: string, content: string) {
		const fragment = new ItemContextFragment();
		fragment.rank = rank;
		fragment.title = title;
		fragment.content = content;

		this.fragments.push(fragment);
	}

	link(rank: ItemContextLinkRank, target: string, connection: string) {
		if (this.links.find(link => link.target == target)) {
			return;
		}

		this.links.push({ rank, target, connection });
	}
}

export class DescriptionFragment<ItemType extends ItemContextComposeable> extends ItemContextFragmentComposer<ItemType> {
	constructor(
		private description: string
	) {
		super();
	}

	async compose(item: ItemType) {
		if (this.description) {
			this.found(ItemContextLinkRank.primary, 'Description', this.description);
		}
	}
}

export class MetricFragment<ItemType extends ItemContextComposeable> extends ItemContextFragmentComposer<ItemType> {
	constructor(
		private name: string,
		private value: () => Promise<string> | string
	) {
		super();
	}

	async compose(item: ItemType) {
		this.found(ItemContextLinkRank.primary, `Metric: ${this.name}`, await this.value());
	}
}
