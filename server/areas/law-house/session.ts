import { ViewModel } from "vlserver";
import { LawHouseSession, LawHouseSessionary, LawHouseSessionProtocol } from "../../managed/database";
import { ResidentSummaryModel } from "../life/resident";
import { DistrictViewModel } from "../vote/district";

export class LawHouseSessionSummaryModel extends ViewModel<LawHouseSession> {
	id;

	started;
	ended;

	scope: DistrictViewModel;
}

export class LawHouseSessionViewModel extends LawHouseSessionSummaryModel {
	protocol: LawHouseSessionProtocolViewModel[];
	sessionaries: LawHouseSessionaryViewModel[];
}

export class LawHouseSessionaryViewModel extends ViewModel<LawHouseSessionary> {
	id;

	resident: ResidentSummaryModel;
}

export class LawHouseSessionProtocolViewModel extends ViewModel<LawHouseSessionProtocol> {
	id;

	said;
	message;
	person: ResidentSummaryModel;
}
