import { ViewModel } from "vlserver";
import { Resident, ResidentRelationship } from "../../managed/database";

export class ResidentSummaryModel extends ViewModel<Resident> {
	id;

	givenName;
	familyName;
	birthday;
}

export class ResidentViewModel extends ViewModel<Resident> {
	id;

	givenName;
	familyName;
	birthday;

	biography;
}

export class ResidentRelationViewModel extends ViewModel<ResidentRelationship> {
	id;
	purpose;

	bonded;
	connection;

	ended;
	conflict;
}
