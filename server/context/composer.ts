import { run } from "node:test";
import { DbContext, ItemContextFragment, ItemContextLink, ItemContextLinkRank } from "../managed/database";
import { tap } from "node:test/reporters";

export type ItemContextComposeable = { id: string }
export type FoundItemContextLink = { distance: number, target: string, connection: string };

export abstract class ItemContextComposer<ItemType extends ItemContextComposeable> {
	abstract find(id: string): Promise<ItemType>;
	abstract title(item: ItemType): string;

	async compose(item: ItemType, depth: number) {
		const fetchers = await this.collect(item);
		const composers: ItemContextFragmentComposer<ItemType>[][] = [];

		for (let layer = 0; layer <= depth; layer++) {
			console.group(layer)

			const fetcher = fetchers[layer];

			if (fetcher) {
				composers.push(await fetcher());
			}

			console.groupEnd()
		}

		return composers;
	}

	async collect(item: ItemType): Promise<(() => Promise<ItemContextFragmentComposer<any>[]>)[]> { return []; }

	constructor(
		protected database: DbContext
	) {}
}

export abstract class ItemContextFragmentComposer<ItemType extends ItemContextComposeable> {
	database: DbContext;
	layer: number;

	abstract compose(item: ItemType): Promise<any>;

	fragments: ItemContextFragment[] = [];
	links: FoundItemContextLink[] = [];

	found(title: string, content: string) {
		const fragment = new ItemContextFragment();
		fragment.title = title;
		fragment.content = content;
		fragment.depth = this.layer;

		this.fragments.push(fragment);
	}

	link(distance: number, target: string, connection: string) {
		if (this.links.find(link => link.target == target)) {
			return;
		}

		this.links.push({ distance, target, connection });
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
			this.found('Description', this.description);
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
		this.found(`Metric: ${this.name}`, await this.value());
	}
}
