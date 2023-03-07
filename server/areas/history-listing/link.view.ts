import { ViewModel } from "vlserver";
import { PropertyHistoricListingModifier } from "../../managed/database";
import { HistoricListingModifierViewModel } from "./modifier.view";

export class PropertyHistoricListingModifierViewModel extends ViewModel<PropertyHistoricListingModifier> {
	id;

	historicListingModifier: HistoricListingModifierViewModel;
}