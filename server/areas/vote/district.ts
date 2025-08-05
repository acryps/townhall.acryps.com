import { ViewModel } from "vlserver";
import { District } from "../../managed/database";

export class DistrictSummaryModel extends ViewModel<District> {
	id;
	name;

	includeInMinimap;
}

export class DistrictViewModel extends DistrictSummaryModel {
	parentId: string;
}
