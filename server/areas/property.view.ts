import { ViewModel } from "vlserver";
import { Dwelling, Property, Tenancy } from "../managed/database";
import { BoroughSummaryModel } from "./borough.summary";
import { HistoricListingGradeViewModel } from "./history-listing/grade.view";
import { PropertyHistoricListingModifierViewModel } from "./history-listing/link.view";
import { PlayerViewModel } from "./player.view";
import { PropertyTypeViewModel } from "./property-type.view";
import { ResidentSummaryModel } from "./life/resident";

export class PropertyViewModel extends ViewModel<Property> {
	id;

	name;
	code;

	bounds;

	historicListingRegisteredAt;
	historicListingGrade: HistoricListingGradeViewModel;
	historicListingModifiers: PropertyHistoricListingModifierViewModel[];

	owner: PlayerViewModel;
	borough: BoroughSummaryModel;
	type: PropertyTypeViewModel;

	dwellings: PropertyDwellingViewModel[];
}

export class PropertyDwellingViewModel extends ViewModel<Dwelling> {
	id;

	tenants: TenantViewModel[];
}

export class TenantViewModel extends ViewModel<Tenancy> {
	id;

	start;
	end;

	inhabitant: ResidentSummaryModel;
}
