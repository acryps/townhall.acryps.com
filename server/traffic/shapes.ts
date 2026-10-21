import { DbContext } from "../managed/database";
import { Point } from "../../interface/point";
import { Shape } from "../../interface/shape";
import { RailGraph } from "./graph";
import { TrafficReport } from "./aggregate";
import { MovementKind } from "./movements";

const minStrokeWidth = 1;
const maxStrokeWidth = 5;

const minWalkAlpha = 0.02;
const maxWalkAlpha = 1;

// builds the map layer shapes for the traffic analysis: every station as its boundary outline
// (labeled with its name, clickable through to its property), one faint walked line per distinct
// unrouted leg (origin to first station, last station to destination) - deduped by exact from/to,
// since many movements share the same walk (e.g. the same home walking to the same nearest
// station), with overlapping duplicates folded into a single line that gets more opaque the more
// movements share it, instead of stacking separate half-transparent lines on top of each other -
// and every route's actual track between two consecutive stops, deduped per route+station pair
// across both directions, with the stroke width linearly scaled between the least and most ridden
// segment, greyed out if unused, clickable through to that train route.
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
			stroke: '#666',
			bounds: boundary.shape,
			name: station.name ?? property.name
		});
	}

	const walks = new Map<string, { from: Point, to: Point, kind: MovementKind, count: number }>();

	for (let walk of report.walks) {
		// property/station centers can land on a fractional coordinate - every other shape in the
		// app lives on the integer pixel grid, which is what drawDanwinstonLine's Bresenham walker
		// assumes: it steps x/y by whole units and only stops once it lands exactly on the endpoint,
		// so a fractional endpoint can make it step straight past the target forever
		const from = walk.from.floor();
		const to = walk.to.floor();

		const key = `${from.pack()}:${to.pack()}:${walk.kind}`;
		const existing = walks.get(key);

		if (existing) {
			existing.count++;
		} else {
			walks.set(key, { from, to, kind: walk.kind, count: 1 });
		}
	}

	const walkCounts = [...walks.values()].map(walk => walk.count);
	const minWalkCount = Math.min(...walkCounts, 1);
	const maxWalkCount = Math.max(...walkCounts, 1);
	const walkCountRange = maxWalkCount - minWalkCount || 1;

	// red for a friend visit, blue for a work commute - the more movements share the exact same
	// walk, the more opaque it gets
	for (let walk of walks.values()) {
		const alpha = minWalkAlpha + (maxWalkAlpha - minWalkAlpha) * ((walk.count - minWalkCount) / walkCountRange);

		shapes.push({
			id: '',
			stroke: walk.kind == 'visit' ? `rgba(255, 0, 0, ${alpha})` : `rgba(0, 0, 255, ${alpha})`,
			bounds: Point.pack([walk.from, walk.to]),
			open: true
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
			stroke: segment.weeklyTrips > 0 ? '#000' : '#666',
			bounds: Point.pack(segment.path),
			open: true,
			strokeWidth
		});
	}

	return shapes;
}
