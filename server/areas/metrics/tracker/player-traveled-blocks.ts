import { MetricTracker } from ".";
import { Point } from "../../../../interface/point";
import { Player } from "../../../managed/database";

export class PlayerTraveledBlocksMetric extends MetricTracker {
	tag = ['player', 'travel'];

	name = 'Player Traveled Blocks';
	description = 'Number of traveled blocks within the last hour';

	async fetch() {
		const cutoff = new Date(+new Date() - 1000 * 60 * 60);

		const movements = await this.database.movement
			.where(movement => movement.time.isAfter(cutoff))
			.toArray();

		const positions = new Map<string, Point>();

		let distance = 0;

		for (let move of movements) {
			const position = new Point(move.x, move.y);

			if (positions.has(move.playerId)) {
				const last = positions.get(move.playerId);

				distance += last.distance(position);
			}

			positions.set(move.playerId, position);
		}

		return distance;
	}

	format(value: number) {
		return `${value.toFixed(0)} b`;
	}
}
