import { Logger } from "@acryps/log";
import { DbContext } from "../managed/database";
import { WorkerHandle } from "../worker";
import { buildRailGraph } from "./graph";
import { buildMovements } from "./movements";
import { aggregateMovements } from "./aggregate";
import { printTrafficReport } from "./report";
import { PropertyPointResolver } from "./property-point";
import { TrafficConfiguration } from "./configuration";
import { buildTrafficShapes } from "./shapes";
import { Shape } from "../../interface/shape";
import { collectTrafficSamples } from "./sample";
import { TrafficAnalysisSampleModel } from "../areas/train/analysis.view";

export interface TrafficAnalysisResult {
	shapes: Shape[];
	samples: TrafficAnalysisSampleModel[];
}

// runs the whole rail traffic analysis on a worker thread (see WorkerDispatch in ../worker), prints
// the result to the console, builds the shapes served by TrafficTileServer as the "traffic" map
// layer, and picks a handful of example journeys for the /train/analyze page. kicked off once on
// server launch from index.ts; the result is cached on this class by the caller (see index.ts),
// since the worker thread's own copy of the class is discarded once it exits - this is also why the
// analyze page reads from here instead of calling collectTrafficSamples itself: everything it needs
// (the rail graph, resident/property resolution) was already built for the main report.
export class TrafficAnalysisWorkerHandle extends WorkerHandle {
	static shapes: Shape[] = [];
	static samples: TrafficAnalysisSampleModel[] = [];

	static async dispatch(logger: Logger, database: DbContext): Promise<TrafficAnalysisResult> {
		const points = new PropertyPointResolver(database);

		const classes = await database.trainRouteClass.toArray();
		TrafficConfiguration.heuristicTrainSpeedUnitsPerSecond = Math.max(
			TrafficConfiguration.walkingSpeedUnitsPerSecond,
			...classes.map(trainRouteClass => trainRouteClass.trainSpeedUnitsPerSecond ?? 0)
		);

		logger.log('building rail graph');
		const graph = await buildRailGraph(database, points);

		logger.log('collecting weekly movements');
		const movements = await buildMovements(database, points);

		logger.log(`routing ${movements.length} distinct movements`);
		const report = await aggregateMovements(graph, movements, points);

		printTrafficReport(logger, graph, report);

		logger.log('building traffic map layer shapes');
		const shapes = await buildTrafficShapes(database, graph, report);

		logger.log('collecting traffic analysis samples');
		const samples = await collectTrafficSamples(database, graph, points, 20);

		return { shapes, samples };
	}
}
