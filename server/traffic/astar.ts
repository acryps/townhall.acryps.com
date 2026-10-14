export interface PathEdge {
	to: string;
	cost: number;
	kind: string;
}

export interface PathResult<E extends PathEdge> {
	edges: E[];
	cost: number;
}

// plain A* over an abstract graph - correctness, not speed, is the goal here, so this favours a
// simple, obviously-correct implementation (linear scan for the lowest f-score) over a heap.
export function findPath<E extends PathEdge>(
	start: string,
	goal: string,
	getNeighbors: (node: string) => E[],
	heuristic: (node: string) => number
): PathResult<E> | null {
	const gScore = new Map<string, number>([[start, 0]]);
	const fScore = new Map<string, number>([[start, heuristic(start)]]);
	const cameFrom = new Map<string, { from: string, edge: E }>();

	const open = new Set<string>([start]);
	const closed = new Set<string>();

	while (open.size) {
		let current: string = null;
		let currentScore = Infinity;

		for (let node of open) {
			const score = fScore.get(node) ?? Infinity;

			if (score < currentScore) {
				currentScore = score;
				current = node;
			}
		}

		if (current == goal) {
			const edges: E[] = [];
			let node = goal;

			while (cameFrom.has(node)) {
				const { from, edge } = cameFrom.get(node);

				edges.push(edge);
				node = from;
			}

			edges.reverse();

			return { edges, cost: gScore.get(goal) };
		}

		open.delete(current);
		closed.add(current);

		for (let edge of getNeighbors(current)) {
			if (closed.has(edge.to)) {
				continue;
			}

			const tentative = gScore.get(current) + edge.cost;

			if (tentative < (gScore.get(edge.to) ?? Infinity)) {
				cameFrom.set(edge.to, { from: current, edge });
				gScore.set(edge.to, tentative);
				fScore.set(edge.to, tentative + heuristic(edge.to));
				open.add(edge.to);
			}
		}
	}

	return null;
}
