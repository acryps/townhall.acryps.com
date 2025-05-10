import { DensityHeatmapTileServer } from "../density";
import { Point } from "../../../../../interface/point";
import { DbContext, Movement, Valuation } from "../../../../managed/database";
import { ManagedServer } from "../../../../managed/server";
import { GradiantHeatmapTileServer } from ".";
import { calculateDanwinstonShapePath } from "../../../../../interface/line";

type Datapoint = {
	center: Point,
	valuation: Valuation,
	area: number
}

export class PropertyValueTileServer extends GradiantHeatmapTileServer {
	values: Datapoint[] = [];

	depth = 5;

	plotAreaWeight = 0.3;
	buildingAreaWeight = 0.7;

	constructor(
		app: ManagedServer,
		private database: DbContext
	) {
		super(
			app,
			'property-value',

			250,
			10,

			1_000 * 2,
			target => {
				const closest = this.values
					.map(value => ({ value, distance: target.distance(value.center) }))
					.sort((a, b) => a.distance - b.distance)
					.slice(0, this.depth);

				let sum = 0;

				for (let rank = 0; rank < closest.length; rank++) {
					const property = closest[rank];
					const areaPrice = property.value.valuation.price / property.value.area;

					sum += areaPrice * (1 / (rank + 1));
				}

				return sum;
			}
		);

		this.update();
	}

	async update() {
		const values: Datapoint[] = [];

		const properties = await this.database.property
			.include(property => property.activePlotBoundary)
			.include(property => property.buildings)
			.toArray();

		const owners = await this.database.propertyOwner
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
				const outline = calculateDanwinstonShapePath(plotShape, true);

				for (let pointIndex = 0; pointIndex < outline.length; pointIndex += 5) {
					values.push({
						center: outline[pointIndex],
						area: plotArea * this.plotAreaWeight + buildingArea * this.buildingAreaWeight,
						valuation: await owner.aquiredValuation.fetch()
					});
				}
			}
		}

		this.values = values;

		setTimeout(() => this.update(), 1000 * 60 * 60);
	}
}
