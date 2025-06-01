import { Point } from "../../../interface/point";
import { ResidentSummaryModel } from "../../managed/services";

export class NetworkGraphNode {
	element: HTMLElement;

	position: Point;
	velocity: Point;

	static simulate(nodes: NetworkGraphNode[], connections: [NetworkGraphNode, NetworkGraphNode][]) {
		const repulsion = 100;
		const springLength = 1;
		const springStrength = 0.01;

		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				let a = nodes[i];
				let b = nodes[j];

				let dx = a.position.x - b.position.x;
				let dy = a.position.y - b.position.y;
				let distSq = dx * dx + dy * dy + 0.1;
				let force = repulsion / distSq;
				let angle = Math.atan2(dy, dx);
				let fx = Math.cos(angle) * force;
				let fy = Math.sin(angle) * force;

				a.velocity.x += fx;
				a.velocity.y += fy;

				b.velocity.x -= fx;
				b.velocity.y -= fy;
			}
		}

		// attract
		for (let relation of connections) {
			let from = relation[0];
			let to = relation[1];

			let dx = to.position.x - from.position.x;
			let dy = to.position.y - from.position.y;
			let dist = Math.sqrt(dx * dx + dy * dy);
			let force = (dist - springLength) * springStrength;
			let angle = Math.atan2(dy, dx);
			let fx = Math.cos(angle) * force;
			let fy = Math.sin(angle) * force;
			from.velocity.x += fx;
			from.velocity.y += fy;
			to.velocity.x -= fx;
			to.velocity.y -= fy;
		}

		// apply
		for (let node of nodes) {
			node.position.x += node.velocity.x;
			node.position.y += node.velocity.y;

			node.velocity.x *= 0.9;
			node.velocity.y *= 0.9;
		}
	}
}
