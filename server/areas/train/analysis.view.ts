import { ViewModel } from "vlserver";

export class TrafficAnalysisSampleModel {
	id: string; // resident id

	tag: string;
	givenName: string;
	familyName: string;

	purpose: string;

	// packed points of the whole trip, walk and ride legs alike, in travel order
	path: string;
}

export class TrafficAnalysisSampleViewModel extends ViewModel<TrafficAnalysisSampleModel> {
	id;

	tag;
	givenName;
	familyName;

	purpose;
	path;
}
