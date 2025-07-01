import { ViewModel } from "vlserver";
import { Epoch } from "../../managed/database";

export class EpochTimelineModel extends ViewModel<Epoch> {
	id;

	start;
	end;

	offset;
	rate;
}

export class EpochViewModel extends EpochTimelineModel {
	name;
	description;
}
