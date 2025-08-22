import { ViewModel } from "vlserver";
import { WaterBody, WaterBodyArea } from "../managed/database";

export class WaterBodyViewModel extends ViewModel<WaterBody> {
	id;
	tag;

	name;

	areas: WaterBodyAreaViewModel[];
}

export class WaterBodyAreaViewModel extends ViewModel<WaterBodyArea> {
	id;
	created;
	archived;

	shape;
}
