import { MetricTracker } from ".";

export class RelationDistanceMetric extends MetricTracker {
	tag = ['population', 'relation-distance'];

	name = 'Longest Relation Distance';
	description = '"Everybody knows everybody over five friends". Most amount of hops between two people. Some people are not connected to eachother, only takes the longest possible relation chain. Uses Breadth-First Search (BFS) algorithm';

	async fetch() {
		const relationships = await this.database.residentRelationship
			.where(relationship => relationship.initiatorId != null)
			.where(relationship => relationship.peerId != null)
			.toArray();

		const graph = {};

		for (let relation of relationships) {
			if (relation.initiatorId in graph) {
				graph[relation.initiatorId].push(relation.peerId);
			} else {
				graph[relation.initiatorId] = [relation.peerId];
			}

			if (relation.peerId in graph) {
				graph[relation.peerId].push(relation.initiatorId);
			} else {
				graph[relation.peerId] = [relation.initiatorId];
			}
		}

		return this.longestShortestPath(graph);
	}

	findComponent(graph, start, visited) {
		const component = [];
		const queue = [start];

		while (queue.length > 0) {
			const node = queue.shift();

			if (visited.has(node)) {
				continue;
			}

			visited.add(node);
			component.push(node);

			for (const neighbor of graph[node] || []) {
				if (!visited.has(neighbor)) {
					queue.push(neighbor);
				}
			}
		}

		return component;
	}

	bfsShortestPaths(graph, start) {
		const visited = new Set();
		const distances: Record<string, number> = {};
		const queue = [[start, 0]];

		while (queue.length > 0) {
			const [current, distance] = queue.shift();

			if (visited.has(current)) {
				continue;
			}

			visited.add(current);
			distances[current] = distance;

			for (const neighbor of graph[current] || []) {
				if (!visited.has(neighbor)) {
					queue.push([neighbor, distance + 1]);
				}
			}
		}

		return distances;
	}

	longestShortestPath(graph) {
		const visited = new Set();
		let maxDistance = -1;
		let maxPair = null;

		for (const person in graph) {
			if (visited.has(person)) {
				continue;
			}

			const component = this.findComponent(graph, person, visited);

			for (const node of component) {
				const distances = this.bfsShortestPaths(graph, node);

				for (const [target, distance] of Object.entries(distances)) {
					if (distance > maxDistance) {
						maxDistance = distance;
						maxPair = [node, target];
					}
				}
			}
		}

		return maxDistance;
	}

	format(value: number) {
		return `${value} hops`;
	}
}
