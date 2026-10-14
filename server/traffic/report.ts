import { Logger } from "@acryps/log";
import { RailGraph } from "./graph";
import { TrafficReport } from "./aggregate";

export function printTrafficReport(logger: Logger, graph: RailGraph, report: TrafficReport) {
	const stationName = (id: string) => graph.stationsById.get(id)?.name ?? id;
	const routeName = (id: string) => graph.routeNamesById.get(id) ?? id;

	logger.log(`${report.totalMovements} weekly movements analyzed, ${report.unroutable} could not be routed`);

	const routeTotals = new Map<string, number>();

	for (let segment of report.segments.values()) {
		routeTotals.set(segment.routeId, (routeTotals.get(segment.routeId) ?? 0) + segment.weeklyTrips);
	}

	console.log('\n== Rail routes by weekly ridership ==');

	console.table(
		[...routeTotals.entries()]
			.sort((a, b) => b[1] - a[1])
			.map(([routeId, weeklyTrips]) => ({ route: routeName(routeId), 'weekly trips': Math.round(weeklyTrips) }))
	);

	console.log('\n== Segments (between consecutive stops, both directions combined) ==');

	console.table(
		[...report.segments.values()]
			.sort((a, b) => b.weeklyTrips - a.weeklyTrips)
			.map(segment => ({
				route: routeName(segment.routeId),
				from: stationName(segment.fromStationId),
				to: stationName(segment.toStationId),
				'weekly trips': Math.round(segment.weeklyTrips)
			}))
	);

	console.log('\n== Stations ==');

	console.table(
		[...report.stations.values()]
			.sort((a, b) => (b.boarded + b.alighted + b.passed) - (a.boarded + a.alighted + a.passed))
			.map(station => ({
				station: stationName(station.stationId),
				boarded: Math.round(station.boarded),
				alighted: Math.round(station.alighted),
				'passed through': Math.round(station.passed),
				transfers: Math.round(station.transfers)
			}))
	);
}
