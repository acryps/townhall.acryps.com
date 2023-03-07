import { ViewModel } from "vlserver";
import { HistoricListingModifier } from "../../managed/database";

export class HistoricListingModifierViewModel extends ViewModel<HistoricListingModifier> {
	id;

	shortName;
	name;
	description;
}