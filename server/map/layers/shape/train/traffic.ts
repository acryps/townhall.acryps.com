import { ShapeTileServer } from "..";
import { ManagedServer } from "../../../../managed/server";
import { TrafficAnalysisWorkerHandle } from "../../../../traffic";

// serves the shapes built once by TrafficAnalysisWorkerHandle (station boundaries + ridership-
// weighted track segments) - see server/index.ts for where that cache gets populated
export class TrafficTileServer extends ShapeTileServer {
	constructor(
		app: ManagedServer
	) {
		super(
			app,
			'traffic',

			async () => TrafficAnalysisWorkerHandle.shapes
		);
	}
}
