import { ViewModel } from "vlserver";
import { Lore } from "../managed/database";

export class LoreSummaryViewModel extends ViewModel<Lore> {
	id;

	timestamp;
	source;

	title;
	facts;
}

export class LoreViewModel extends LoreSummaryViewModel {
	context;
}
