import { ViewModel } from "vlserver";
import { District } from "../../managed/database";

export class DistrictViewModel extends ViewModel<District> {
	id;

	name;

	parentId: string;
}
