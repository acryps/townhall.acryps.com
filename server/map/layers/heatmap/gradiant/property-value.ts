import { DensityHeatmapTileServer } from "../density";
import { Point } from "../../../../../interface/point";
import { DbContext, Movement, Valuation } from "../../../../managed/database";
import { ManagedServer } from "../../../../managed/server";
import { GradiantHeatmapTileServer } from ".";
import { calculateDanwinstonShapePath } from "../../../../../interface/line";
import { Task } from "../../../../scheduler";
import { Logger } from "@acryps/log";
import { WorkerDispatch, WorkerHandle } from "../../../../worker";

type Datapoint = {
	center: Point,
	valuation: Valuation,
	area: number
}

export class PropertyValueTileServer extends GradiantHeatmapTileServer<Datapoint> {
	values: Datapoint[] = [];

	depth = 10;

	static plotAreaWeight = 0.3;
	static buildingAreaWeight = 0.7;

	constructor(
		app: ManagedServer
	) {
		super(
			app,
			'property-value',

			200,
			10,

			600 * 2,

			(topLeft: Point, size: number) => {
				return this.values
					.filter(value => value.center.x > topLeft.x && value.center.x < topLeft.x + size)
					.filter(value => value.center.y > topLeft.y && value.center.y < topLeft.y + size);
			},

			(target, values, range) => {
				const closest = values
					.filter(value => value.center.distance(target) < range * 1)
					.map(value => ({
						value,
						distance: target.distance(value.center)
					}));

				if (!closest.length) {
					return null;
				}

				let sum = 0;

				for (let rank = 0; rank < closest.length; rank++) {
					const property = closest[rank];
					const areaPrice = property.value.valuation.price / property.value.area;

					sum += areaPrice / closest.length;
				}

				return sum;
			}
		);
	}

	// the heavy DB loop runs on a worker thread - see `PropertyValueIndexWorkerHandle`
	async update() {
		const values = await WorkerDispatch.dispatch<Datapoint[]>(PropertyValueIndexWorkerHandle);

		// `Point` instances lose their prototype (and so their methods, eg. `distance`) crossing the worker boundary - rebuild them
		this.values = values.map(value => Object.assign({}, value, {
			center: new Point(value.center.x, value.center.y)
		}));

		console.log(`indexed ${this.values.length} valuation points`);
	}
}

export class PropertyValueIndexWorkerHandle extends WorkerHandle {
	static async dispatch(logger: Logger, database: DbContext): Promise<Datapoint[]> {
		const values: Datapoint[] = [];

		const properties = await database.property
			.include(property => property.activePlotBoundary)
			.include(property => property.buildings)
			.toArray();

		const owners = await database.propertyOwner
			.where(owner => owner.aquiredValuation.price != null)
			.include(owner => owner.aquiredValuation)
			.toArray();

		for (let owner of owners) {
			const property = properties.find(property => property.id == owner.propertyId);

			if (property && !property.deactivated) {
				const bounds = await property.activePlotBoundary.fetch();
				const plotShape = Point.unpack(bounds.shape);
				const plotArea = Point.area(plotShape);

				const buildings = await property.buildings.toArray();
				const buildingArea = buildings
					.filter(building => !building.archived)
					.map(building => Point.area(Point.unpack(building.boundary)))
					.reduce((sum, area) => area + sum, 0);

				// make multiple datapoints to represent big buildings properly
				const outline = [...Point.fill(plotShape).values()]
					.sort((a, b) => a.x % a.y - b.x % b.y); // semi random ranking

				const valuation = await owner.aquiredValuation.fetch();

				for (let pointIndex = 0; pointIndex < outline.length; pointIndex += 5) {
					values.push({
						center: outline[pointIndex],
						area: plotArea * PropertyValueTileServer.plotAreaWeight + buildingArea * PropertyValueTileServer.buildingAreaWeight,
						valuation: valuation
					});
				}
			}
		}

		return values;
	}
}

// `PropertyValueTileServer` already extends `GradiantHeatmapTileServer`, so it can't also extend `Task` -
// this thin companion just re-runs its indexing on a schedule
export class PropertyValueIndexTask extends Task {
	usesWorker = true;

	constructor(
		private tileServer: PropertyValueTileServer
	) {
		super();
	}

	async run() {
		await this.tileServer.update();

		return 1000 * 60;
	}
}
