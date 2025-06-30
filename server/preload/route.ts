export type RouteParameterValue = string | number;

export class PreloadRoute<ItemType> {
	constructor(
		private link: string | ((...parameters: RouteParameterValue[]) => string),
		private source?: Promise<ItemType[]> | ItemType[] | (() => Promise<ItemType[]> | ItemType[]),
		private extract?: (item: ItemType) => Promise<RouteParameterValue[]> | RouteParameterValue[]
	) {}

	async list() {
		if (typeof this.link == 'string') {
			if (this.source) {
				throw new Error(`Cannot mix dynamic with static routes`);
			}

			return [this.link];
		}

		let items: ItemType[];

		if (typeof this.source == 'function') {
			items = await this.source();
		} else {
			items = await this.source;
		}

		const links: string[] = [];

		for (let item of items) {
			links.push(this.link(...await this.extract(item)));
		}

		return links;
	}
}
