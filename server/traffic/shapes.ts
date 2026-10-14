import { DbContext } from "../managed/database";
import { Point } from "../../interface/point";
import { Shape } from "../../interface/shape";
import { RailGraph } from "./graph";
import { TrafficReport } from "./aggregate";

const minStrokeWidth = 1;
const maxStrokeWidth = 5;

// builds the map layer shapes for the traffic analysis: every station as its boundary outline
// (labeled with its name, clickable through to its property), and every route's actual track
// between two consecutive stops, deduped per route+station pair across both directions, with the
// stroke width linearly scaled between the least and most ridden segment, clickable through to
// that train route.
export async function buildTrafficShapes(database: DbContext, graph: RailGraph, report: TrafficReport): Promise<Shape[]> {
	const shapes: Shape[] = [];

	const stations = await database.trainStation
		.where(station => station.property.deactivated == null)
		.include(station => station.property)
		.toArray();

	for (let station of stations) {
		const property = await station.property.fetch();

		if (!property?.activePlotBoundaryId) {
			continue;
		}

		const boundary = await property.activePlotBoundary.fetch();

		if (!boundary?.shape) {
			continue;
		}

		shapes.push({
			id: property.id,
			fill: '#fff',
			stroke: '#000',
			bounds: boundary.shape,
			name: station.name ?? property.name
		});
	}

	const segments = new Map<string, { routeId: string, path: Point[], weeklyTrips: number }>();

	for (let edges of graph.adjacency.values()) {
		for (let edge of edges) {
			if (edge.kind != 'ride' || !edge.path?.length) {
				continue;
			}

			const stationPair = [edge.fromStationId, edge.toStationId].sort();
			const key = `${edge.routeId}:${stationPair[0]}:${stationPair[1]}`;

			if (!segments.has(key)) {
				segments.set(key, {
					routeId: edge.routeId,
					path: edge.path,
					weeklyTrips: report.segments.get(key)?.weeklyTrips ?? 0
				});
			}
		}
	}

	const weeklyTrips = [...segments.values()].map(segment => segment.weeklyTrips);
	const minWeeklyTrips = Math.min(...weeklyTrips, 0);
	const maxWeeklyTrips = Math.max(...weeklyTrips, 0);
	const weeklyTripsRange = maxWeeklyTrips - minWeeklyTrips || 1;

	for (let segment of segments.values()) {
		const strokeWidth = Math.round(
			minStrokeWidth + (maxStrokeWidth - minStrokeWidth) * ((segment.weeklyTrips - minWeeklyTrips) / weeklyTripsRange)
		);

		shapes.push({
			id: segment.routeId,
			stroke: '#000',
			bounds: Point.pack(segment.path),
			open: true,
			strokeWidth
		});
	}

	return shapes;
}
