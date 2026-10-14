import { Logger } from "@acryps/log";
import { join } from "path";
import { DbContext } from "../managed/database";
import { WorkerHandle } from "../worker";
import { buildRailGraph } from "./graph";
import { buildMovements } from "./movements";
import { aggregateMovements } from "./aggregate";
import { printTrafficReport } from "./report";
import { PropertyPointResolver } from "./property-point";
import { writeTrafficGraphviz } from "./graphviz";
import { TrafficConfiguration } from "./configuration";

// runs the whole rail traffic analysis on a worker thread (see WorkerDispatch in ../worker),
// prints the result to the console and writes it out as a Graphviz traffic.dot. kicked off once
// on server launch from index.ts.
export class TrafficAnalysisWorkerHandle extends WorkerHandle {
	static async dispatch(logger: Logger, database: DbContext) {
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

		const path = join(process.cwd(), 'traffic.dot');
		writeTrafficGraphviz(path, graph, report);

		logger.log(`wrote ${path}`);
	}
}
