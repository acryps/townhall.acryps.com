import { Point } from "../../interface/point";
import { TrafficConfiguration } from "./configuration";
import { findPath, PathResult } from "./astar";
import { RailEdge, RailGraph, entryNode, exitNode, stationIdOfNode } from "./graph";

// wraps the static rail graph with the two walking edges every journey needs - origin to station,
// station to destination (plus the direct walk, in case that's just faster) - and caches results
// per property pair, since many residents share the same home or workplace.
export class RouteFinder {
	private cache = new Map<string, PathResult<RailEdge> | null>();

	constructor(
		private graph: RailGraph
	) {}

	findRoute(fromId: string, fromPoint: Point, toId: string, toPoint: Point): PathResult<RailEdge> | null {
		const key = `${fromId}->${toId}`;

		if (this.cache.has(key)) {
			return this.cache.get(key);
		}

		const getNeighbors = (node: string): RailEdge[] => {
			if (node == 'origin') {
				const edges: RailEdge[] = [
					{ to: 'destination', cost: fromPoint.distance(toPoint) / TrafficConfiguration.walkingSpeedUnitsPerSecond, kind: 'walk' }
				];

				for (let station of this.graph.stationsById.values()) {
					edges.push({
						to: entryNode(station.id),
						cost: fromPoint.distance(station.position) / TrafficConfiguration.walkingSpeedUnitsPerSecond,
						kind: 'walk'
					});
				}

				return edges;
			}

			const staticEdges = this.graph.adjacency.get(node) ?? [];

			if (node.startsWith('exit:')) {
				const station = this.graph.stationsById.get(stationIdOfNode(node));

				return [
					...staticEdges,
					{ to: 'destination', cost: station.position.distance(toPoint) / TrafficConfiguration.walkingSpeedUnitsPerSecond, kind: 'walk' }
				];
			}

			return staticEdges;
		};

		const heuristic = (node: string): number => {
			if (node == 'destination') {
				return 0;
			}

			if (node == 'origin') {
				return fromPoint.distance(toPoint) / TrafficConfiguration.heuristicTrainSpeedUnitsPerSecond;
			}

			const stationId = stationIdOfNode(node);
			const position = stationId ? this.graph.stationsById.get(stationId).position : toPoint;

			return position.distance(toPoint) / TrafficConfiguration.heuristicTrainSpeedUnitsPerSecond;
		};

		const result = findPath('origin', 'destination', getNeighbors, heuristic);

		this.cache.set(key, result);

		return result;
	}
}
