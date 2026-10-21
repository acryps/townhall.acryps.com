import { Logger } from "@acryps/log";
import { RailGraph } from "./graph";
import { TrafficReport } from "./aggregate";

export function printTrafficReport(logger: Logger, graph: RailGraph, report: TrafficReport) {
	logger.log(`${report.totalMovements} weekly movements analyzed, ${report.unroutable} could not be routed`);
}
