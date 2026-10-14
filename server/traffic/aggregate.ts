import { RailGraph } from "./graph";
import { RouteFinder } from "./route-finder";
import { Movement } from "./movements";
import { PropertyPointResolver } from "./property-point";

export interface SegmentStats {
	routeId: string;
	fromStationId: string;
	toStationId: string;
	weeklyTrips: number;
}

export interface StationStats {
	stationId: string;
	boarded: number;
	alighted: number;
	passed: number;
	transfers: number;
}

export interface TrafficReport {
	segments: Map<string, SegmentStats>;
	stations: Map<string, StationStats>;
	unroutable: number;
	totalMovements: number;
}

const ensureStation = (stations: Map<string, StationStats>, stationId: string): StationStats => {
	if (!stations.has(stationId)) {
		stations.set(stationId, { stationId, boarded: 0, alighted: 0, passed: 0, transfers: 0 });
	}

	return stations.get(stationId);
};

// runs every movement through A*, then walks the resulting path to tally, per station, how many
// weekly trips board, alight, pass through (stay on board while the train stops there) or transfer
// there, and per track segment (a route's two directions combined), how many weekly trips use it.
export async function aggregateMovements(
	graph: RailGraph,
	movements: Movement[],
	points: PropertyPointResolver
): Promise<TrafficReport> {
	const finder = new RouteFinder(graph);

	const segments = new Map<string, SegmentStats>();
	const stations = new Map<string, StationStats>();

	let unroutable = 0;

	for (let movement of movements) {
		const fromPoint = await points.resolve(movement.fromPropertyId);
		const toPoint = await points.resolve(movement.toPropertyId);

		if (!fromPoint || !toPoint) {
			unroutable++;
			continue;
		}

		const path = finder.findRoute(movement.fromPropertyId, fromPoint, movement.toPropertyId, toPoint);

		if (!path) {
			unroutable++;
			continue;
		}

		for (let index = 0; index < path.edges.length; index++) {
			const edge = path.edges[index];

			if (edge.kind == 'board') {
				ensureStation(stations, edge.stationId).boarded += movement.weeklyTrips;
			} else if (edge.kind == 'alight') {
				ensureStation(stations, edge.stationId).alighted += movement.weeklyTrips;
			} else if (edge.kind == 'transfer') {
				ensureStation(stations, edge.transferStationId).transfers += movement.weeklyTrips;
			} else if (edge.kind == 'ride') {
				const stationPair = [edge.fromStationId, edge.toStationId].sort();
				const segmentKey = `${edge.routeId}:${stationPair[0]}:${stationPair[1]}`;

				if (!segments.has(segmentKey)) {
					segments.set(segmentKey, {
						routeId: edge.routeId,
						fromStationId: stationPair[0],
						toStationId: stationPair[1],
						weeklyTrips: 0
					});
				}

				segments.get(segmentKey).weeklyTrips += movement.weeklyTrips;

				// still on the same service for the next edge too -> the train stops here, but this
				// rider neither boards nor alights, they just pass through
				const next = path.edges[index + 1];

				if (next?.kind == 'ride' && next.routeId == edge.routeId && next.direction == edge.direction) {
					ensureStation(stations, edge.toStationId).passed += movement.weeklyTrips;
				}
			}
		}
	}

	return { segments, stations, unroutable, totalMovements: movements.length };
}
