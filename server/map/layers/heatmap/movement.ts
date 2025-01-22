import { HeatmapTileServer } from ".";
import { DbContext, Movement } from "../../../managed/database";
import { ManagedServer } from "../../../managed/server";

export class MovementTileServer extends HeatmapTileServer {
	lastUpdate;
	movements: Movement[] = [];

	constructor(
		app: ManagedServer,
		database: DbContext
	) {
		database.movement.orderByAscending(movement => movement.time).first().then(movement => {
			this.loadMovements(database, movement.time);
		});

		super(
			app,
			'movement',

			250,
			100,

			async (minX, minY, maxX, maxY) => {
				return this.movements
					.filter(movement => movement.x >= minX && movement.x <= maxX)
					.filter(movement => movement.y >= minY && movement.y <= maxY);
			}
		);
	}

	// load movements in chunks as there are so many
	async loadMovements(database: DbContext, start: Date) {
		const end = new Date(+start + 1000 * 60 * 60 * 24 * 7);

		const movements = await database.movement
			.includeTree({ x: true, y: true })
			.where(movement => movement.time.isAfter(start) && movement.time.isBefore(end))
			.toArray();

		// spread does not work with this many items
		// "maximum call stack size exceeded"
		for (let movement of movements) {
			this.movements.push(movement);
		}

		if (movements.length) {
			console.log(`[movement] imported ${movements.length} positions ${start.toDateString()} - ${end.toDateString()}`);
		}

		this.lastUpdate = new Date(Math.min(+end, +new Date()));

		if (end > new Date()) {
			// update every minute
			setTimeout(() => {
				this.loadMovements(database, end);
			}, 1000 * 60);
		} else {
			// intial load, stagger to 5 seconds
			setTimeout(() => {
				this.loadMovements(database, end);
			}, 1000 * 5);
		}
	}
}
