import { DbContext } from "../managed/database";
import { Point } from "../../interface/point";
import { TrafficConfiguration } from "./configuration";
import { orderRouteStops } from "./route-stops";
import { PropertyPointResolver } from "./property-point";

export type RailEdgeKind = 'board' | 'alight' | 'ride' | 'transfer' | 'walk';

export interface RailEdge {
	to: string;
	cost: number;
	kind: RailEdgeKind;

	// only present on 'ride' edges
	routeId?: string;
	direction?: string;
	fromStopId?: string;
	toStopId?: string;
	fromStationId?: string;
	toStationId?: string;

	// the route's actual (curved) track between fromStationId and toStationId, in travel order -
	// only present on 'ride' edges
	path?: Point[];

	// present on 'board' | 'alight' edges
	stationId?: string;

	// present on 'transfer' edges
	transferStationId?: string;
}

export interface StationNode {
	id: string;
	name: string;
	position: Point;
}

export interface RailGraph {
	adjacency: Map<string, RailEdge[]>;
	stationsById: Map<string, StationNode>;
	routeNamesById: Map<string, string>;
}

export const entryNode = (stationId: string) => `entry:${stationId}`;
export const exitNode = (stationId: string) => `exit:${stationId}`;
export const platformNode = (stationId: string, routeId: string, direction: string) => `platform:${stationId}:${routeId}:${direction}`;

export const stationIdOfNode = (node: string): string | null => {
	if (node.startsWith('entry:')) return node.slice('entry:'.length);
	if (node.startsWith('exit:')) return node.slice('exit:'.length);
	if (node.startsWith('platform:')) return node.split(':')[1];

	return null;
};

// builds the whole rail network once, shared across every movement that gets routed through it.
//
// topology, per station: an `entry` node (walked in from outside) fans out for free into every
// platform serving that station; every platform alights for free into an `exit` node (walked out
// to a destination); switching between two different platforms at the same station only happens
// through a dedicated 'transfer' edge, which is the only way to pay (or avoid paying) the transfer
// penalty - there is no free path between platforms, since that would let a rider dodge the penalty
// by stepping out to the entry/exit node and back in.
export async function buildRailGraph(database: DbContext, points: PropertyPointResolver): Promise<RailGraph> {
	const adjacency = new Map<string, RailEdge[]>();

	const addEdge = (from: string, edge: RailEdge) => {
		if (!adjacency.has(from)) {
			adjacency.set(from, []);
		}

		adjacency.get(from).push(edge);
	};

	const stations = await database.trainStation.toArray();
	const stationsById = new Map<string, StationNode>();

	for (let station of stations) {
		const position = await points.resolve(station.propertyId);

		if (!position) {
			continue;
		}

		const property = await database.property.find(station.propertyId);
		const name = station.name || property?.name || station.id;

		stationsById.set(station.id, { id: station.id, name, position });
	}

	const platformsByStation = new Map<string, Set<string>>();

	const registerPlatform = (stationId: string, platformId: string) => {
		if (!platformsByStation.has(stationId)) {
			platformsByStation.set(stationId, new Set());
		}

		platformsByStation.get(stationId).add(platformId);
	};

	const routes = await database.trainRoute.where(route => route.closed == null && route.classId != null).toArray();
	const routeNamesById = new Map<string, string>();

	for (let route of routes) {
		const routeClass = await route.class.fetch();

		routeNamesById.set(route.id, route.name ?? route.code);

		const activePath = await route.activePath.fetch();

		if (!activePath?.path) {
			continue;
		}

		const pathPoints = Point.unpack(activePath.path);

		if (pathPoints.length < 2) {
			continue;
		}

		const stops = (await route.stops.where(stop => stop.closed == null).toArray())
			.filter(stop => stationsById.has(stop.stationId));

		if (stops.length < 2) {
			continue;
		}

		const { ordered, totalLength, pixels, pixelPositions } = await orderRouteStops(database, route, pathPoints, stops);

		// distance travelled along the track between two stops, by their position in `ordered`
		const segmentDistance = (fromIndex: number, toIndex: number) => {
			if (toIndex > fromIndex) {
				return ordered[toIndex].position - ordered[fromIndex].position;
			}

			// wrap-around segment on a looping route
			return (totalLength - ordered[fromIndex].position) + ordered[toIndex].position;
		};

		// the actual track pixels between two stops, by their position in `ordered` - mirrors
		// segmentDistance's wrap-around handling for the one segment that closes a looping route
		const segmentPoints = (fromIndex: number, toIndex: number) => {
			const fromPosition = ordered[fromIndex].position;
			const toPosition = ordered[toIndex].position;

			if (toIndex > fromIndex) {
				return pixels.filter((_, pixelIndex) => pixelPositions[pixelIndex] >= fromPosition && pixelPositions[pixelIndex] <= toPosition);
			}

			// wrap-around segment on a looping route: tail of the track, then the head
			return [
				...pixels.filter((_, pixelIndex) => pixelPositions[pixelIndex] >= fromPosition),
				...pixels.filter((_, pixelIndex) => pixelPositions[pixelIndex] <= toPosition)
			];
		};

		// a looping route runs in a single direction; any other route is ridden both ways
		const directions = route.looping
			? [{ name: 'loop', sequence: ordered.map((_, index) => index) }]
			: [
				{ name: 'forward', sequence: ordered.map((_, index) => index) },
				{ name: 'backward', sequence: ordered.map((_, index) => index).reverse() }
			];

		for (let direction of directions) {
			for (let position = 0; position < direction.sequence.length; position++) {
				const index = direction.sequence[position];
				const stop = ordered[index].stop;
				const platformId = platformNode(stop.stationId, route.id, direction.name);

				registerPlatform(stop.stationId, platformId);

				addEdge(entryNode(stop.stationId), { to: platformId, cost: 0, kind: 'board', stationId: stop.stationId, routeId: route.id, direction: direction.name });
				addEdge(platformId, { to: exitNode(stop.stationId), cost: 0, kind: 'alight', stationId: stop.stationId, routeId: route.id, direction: direction.name });

				const isLast = position == direction.sequence.length - 1;

				if (isLast && direction.name != 'loop') {
					continue;
				}

				const nextIndex = direction.sequence[(position + 1) % direction.sequence.length];
				const nextStop = ordered[nextIndex].stop;
				const nextPlatformId = platformNode(nextStop.stationId, route.id, direction.name);

				const distance = direction.name == 'backward'
					? segmentDistance(nextIndex, index)
					: segmentDistance(index, nextIndex);

				const path = direction.name == 'backward'
					? segmentPoints(nextIndex, index)
					: segmentPoints(index, nextIndex);

				const cost = distance / routeClass.trainSpeedUnitsPerSecond + routeClass.stopDwellTimeSeconds;

				addEdge(platformId, {
					to: nextPlatformId,
					cost,
					kind: 'ride',
					routeId: route.id,
					direction: direction.name,
					fromStopId: stop.id,
					toStopId: nextStop.id,
					fromStationId: stop.stationId,
					toStationId: nextStop.stationId,
					path
				});
			}
		}
	}

	for (let [stationId, platforms] of platformsByStation) {
		for (let from of platforms) {
			for (let to of platforms) {
				if (from == to) {
					continue;
				}

				addEdge(from, { to, cost: TrafficConfiguration.transferTimeSeconds, kind: 'transfer', transferStationId: stationId });
			}
		}
	}

	return { adjacency, stationsById, routeNamesById };
}
