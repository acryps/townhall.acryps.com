import { ViewModel } from "vlserver";
import { Dwelling, Property, Tenancy } from "../managed/database";
import { BoroughSummaryModel } from "./borough.summary";
import { HistoricListingGradeViewModel } from "./history-listing/grade.view";
import { PropertyHistoricListingModifierViewModel } from "./history-listing/link.view";
import { PlayerViewModel } from "./player.view";
import { PropertyTypeViewModel } from "./property-type.view";
import { ResidentSummaryModel } from "./life/resident";
import { OfficeViewModel } from "./company.view";
import { BuildingSummaryModel } from "./property/building";
import { PlotBoundaryShapeModel, PlotBoundarySummaryModel } from "./property/plot";

export class PropertyOverviewModel extends ViewModel<Property> {
	id;

	name;
	activePlotBoundary: PlotBoundaryShapeModel;
	borough: BoroughSummaryModel;
	type: PropertyTypeViewModel;
}

export class PropertyViewModel extends ViewModel<Property> {
	id;

	name;
	code;
	deactivated;

	historicListingRegisteredAt;
	historicListingGrade: HistoricListingGradeViewModel;
	historicListingModifiers: PropertyHistoricListingModifierViewModel[];

	owner: PlayerViewModel;
	borough: BoroughSummaryModel;
	type: PropertyTypeViewModel;

	dwellings: PropertyDwellingViewModel[];
	offices: OfficeViewModel[];

	buildings: BuildingSummaryModel[];

	activePlotBoundaryId;
	plotBoundaries: PlotBoundarySummaryModel[];
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
