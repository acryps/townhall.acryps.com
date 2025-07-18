import { ViewModel } from "vlserver";
import { ItemContext, ItemContextFragment, ItemContextLink } from "../../managed/database";
import { exit } from "process";

export class ItemContextSummaryModel extends ViewModel<ItemContext> {
	id;
	itemId;

	name;
	tagline;
}

export class ItemContextViewModel extends ItemContextSummaryModel {
	updated;
	summary;

	links: ItemContextLinkViewModel[];
}

export class ItemContextLinkViewModel extends ViewModel<ItemContextLink> {
	id;

	connection;
	target: ItemContextSummaryModel;
}

export class ItemContextBacklinkViewModel extends ItemContextLinkViewModel {
	source: ItemContextSummaryModel;
}

export class ItemContextFragmentViewModel extends ViewModel<ItemContextFragment> {
	id;

	title;
	content;

	rank;
}
