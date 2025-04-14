import { ViewModel } from "vlserver";
import { Street, StreetRoute } from "../managed/database";
import { BridgeViewModel } from "./bridge.view";

export class StreetViewModel extends ViewModel<Street> {
	id;

	name;
	shortName;

	size;

	activeRouteId;
	routes: StreetRouteSummaryModel[];
}

export class StreetRouteSummaryModel extends ViewModel<StreetRoute> {
	id;
	created;
	changeComment;

	path;
}
