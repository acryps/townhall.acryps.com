import { ViewModel } from "vlserver";
import { LoreProposal } from "../managed/database";
import { LoreSummaryViewModel } from "./lore";

export class LoreProposalViewModel extends ViewModel<LoreProposal> {
	id;

	title;
	context;

	valid;
	validation;
}
