import { ViewModel } from "vlserver";
import { Building } from "../../managed/database";

export class BuildingShapeModel extends ViewModel<Building> {
	id;
	boundary;
}

export class BuildingSummaryModel extends BuildingShapeModel {
	created;
	archived;

	name;
}
