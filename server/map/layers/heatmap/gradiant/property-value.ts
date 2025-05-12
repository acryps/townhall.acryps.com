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

	depth = 10;

	plotAreaWeight = 0.3;
	buildingAreaWeight = 0.7;

	constructor(
		app: ManagedServer,
		private database: DbContext
	) {
		super(
			app,
			'property-value',

			200,
			10,

			1500 * 2,

			(target, range) => {
				const closest = this.values
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
				const outline = [...Point.fill(plotShape).values()];

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

		console.log(`indexed ${values.length} valuation points`);

		setTimeout(() => this.update(), 1000 * 60);
	}
}
