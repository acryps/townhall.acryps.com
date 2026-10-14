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

// runs the whole rail traffic analysis on a worker thread (see WorkerDispatch in ../worker), prints
// the result to the console and builds the shapes served by TrafficTileServer as the "traffic" map
// layer. kicked off once on server launch from index.ts; the resolved shapes are cached on this
// class by the caller (see index.ts), since the worker thread's own copy of the class is discarded
// once it exits.
export class TrafficAnalysisWorkerHandle extends WorkerHandle {
	static shapes: Shape[] = [];

	static async dispatch(logger: Logger, database: DbContext): Promise<Shape[]> {
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
		return await buildTrafficShapes(database, graph, report);
	}
}
