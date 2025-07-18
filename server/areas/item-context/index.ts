import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { ItemContextTracker } from "../../context";
import { ItemContextBacklinkViewModel, ItemContextFragmentViewModel, ItemContextLinkViewModel, ItemContextViewModel } from "./context";
import { Annotator } from "../../annotate";

export class ItemContextService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getContext(id: string) {
		const item = await this.database.itemContext.first(context => context.itemId == id);

		// update / import in background
		ItemContextTracker.instance.find(id);

		if (item) {
			return new ItemContextViewModel(item);
		}
	}

	async annotateContext(id: string) {
		const item = await ItemContextTracker.instance.find(id);

		if (item) {
			return Annotator.annotate(item.context).pack();
		}
	}

	getFragments(id: string) {
		return ItemContextFragmentViewModel.from(
			this.database.itemContextFragment
				.where(fragment => fragment.itemId == id)
				.orderByAscending(fragment => fragment.orderIndex)
		)
	}

	getBacklinks(id: string) {
		return ItemContextBacklinkViewModel.from(
			this.database.itemContextLink
				.where(fragment => fragment.targetId == id)
				.orderByAscending(fragment => fragment.sourceId)
		)
	}
}
