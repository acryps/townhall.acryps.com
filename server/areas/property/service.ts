import { Service } from "vlserver";
import { Building, DbContext, Dwelling, PlotBoundary } from "../../managed/database";
import { DwellingViewModel } from "../life/resident";
import { PropertyDwellingViewModel } from "../property.view";
import { BuildingSummaryModel } from "./building";
import { PlotBoundarySummaryModel } from "./plot";
import { Point } from "../../../interface/point";
import { Shape } from "../../../interface/shape";

export class PropertyService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async createDwelling(propertyId: string) {
		const property = await this.database.property.find(propertyId);

		const dwelling = new Dwelling();
		dwelling.property = property;

		await dwelling.create();

		return new PropertyDwellingViewModel(dwelling);
	}

	async createBuilding(propertyId: string, boundary: string) {
		const property = await this.database.property.find(propertyId);

		const building = new Building();
		building.property = property;
		building.boundary = Point.pack(Point.unpack(boundary));
		building.created = new Date();

		await building.create();

		return new BuildingSummaryModel(building);
	}

	async setOwner(propertyId: string, ownerId: string) {
		const property = await this.database.property.find(propertyId);
		property.ownerId = ownerId;

		await property.update();
	}

	async saveBuilding(viewModel: BuildingSummaryModel) {
		const building = await viewModel.toModel();

		await building.update();
	}

	async archiveBuilding(id: string) {
		const building = await this.database.building.find(id);
		building.archived = new Date();

		await building.update();
	}

	async editPlotBoundary(propertyId: string, boundary: string) {
		const property = await this.database.property.find(propertyId);
		let shape = Point.unpack(boundary);

		const properties = await this.database.property
			.where(property => property.activePlotBoundary != null)
			.where(property => property.deactivated == null)
			.where(peer => peer.id != property.id)
			.include(property => property.activePlotBoundary)
			.toArray();

		const plotBoundary = new PlotBoundary();
		plotBoundary.property = property;
		plotBoundary.shape = Point.pack(shape);
		plotBoundary.created = new Date();

		await plotBoundary.create();

		property.activePlotBoundary = plotBoundary;
		await property.update();

		return new PlotBoundarySummaryModel(plotBoundary);
	}
}
