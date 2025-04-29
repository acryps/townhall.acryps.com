import { Service } from "vlserver";
import { Building, DbContext, Dwelling, PlotBoundary, PropertyOwner } from "../../managed/database";
import { DwellingViewModel } from "../life/resident";
import { PropertyDwellingViewModel, PropertyOwnerViewModel } from "../property.view";
import { BuildingSummaryModel } from "./building";
import { PlotBoundarySummaryModel } from "./plot";
import { Point } from "../../../interface/point";
import { Shape } from "../../../interface/shape";
import { TradeManager } from "../trade/manager";

export class PropertyService extends Service {
	constructor(
		private database: DbContext,
		private tradeManager: TradeManager
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

	async assignSoleOwner(propertyId: string, entityId: string) {
		const property = await this.database.property.find(propertyId);
		const entity = await this.database.legalEntity.find(entityId);

		const owner = new PropertyOwner();
		owner.property = property;
		owner.owner = entity;

		owner.aquired = new Date();
		owner.share = 1;

		await owner.create();

		this.tradeManager.valueateProperty(property).then(async valuation => {
			owner.aquiredValuation = valuation;

			await owner.update();
		});

		return new PropertyOwnerViewModel(owner);
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
