import { ViewModel } from "vlserver";
import { LoreQuery, LoreQuerySource } from "../managed/database";
import { LoreSummaryViewModel, LoreViewModel } from "./lore";

export class LoreQueryViewModel extends ViewModel<LoreQuery> {
	id;

	question;
	answer;

	sources: LoreQuerySourceViewModel[];
}

export class LoreQuerySourceViewModel extends ViewModel<LoreQuerySource> {
	id;

	relation;
	lore: LoreSummaryViewModel;
}
