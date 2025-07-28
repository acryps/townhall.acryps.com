import { Service } from "vlserver";
import { Building, DbContext, Dwelling, PlotBoundary, PropertyOwner, Valuation } from "../../managed/database";
import { DwellingViewModel } from "../life/resident";
import { PropertyDwellingViewModel, PropertyOwnerViewModel, PropertyViewModel } from "../property.view";
import { BuildingSummaryModel } from "./building";
import { PlotBoundarySummaryModel } from "./plot";
import { Point } from "../../../interface/point";
import { Shape } from "../../../interface/shape";
import { TradeManager } from "../trade/manager";
import { PropertyManager } from "./manager";
import { BoroughSummaryModel } from "../borough.summary";
import { PropertyValueator } from "../trade/valuation/property";
import { LegalEntityManager } from "../legal-entity/manager";
import { A } from "ollama/dist/shared/ollama.7cdb1e15";

export class PropertyService extends Service {
	constructor(
		private database: DbContext,
		private manager: PropertyManager,
		private tradeManager: TradeManager,
		private legalEntityManager: LegalEntityManager
	) {
		super();
	}

	async reviewNext() {
		const properties = await this.database.property
			.where(property => property.deactivated == null)
			.include(property => property.owners)
			.toArray();

		for (let property of properties) {
			const owners = await property.owners.toArray();

			if (!owners.find(owner => owner.ownerId)) {
				return new PropertyViewModel(property);
			}
		}
	}

	async createDwellings(propertyId: string, count: number) {
		if (count > 100) {
			throw 'out of bounds';
		}

		const property = await this.database.property.find(propertyId);
		const created = [];

		for (let index = 0; index < count; index++) {
			const dwelling = new Dwelling();
			dwelling.property = property;
			dwelling.created = new Date();

			created.push(dwelling.create());
		}

		return PropertyDwellingViewModel.from(await Promise.all(created));
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

	async findTouchingBoroughs(propertyId: string) {
		const property = await this.database.property.find(propertyId);
		const plot = await property.activePlotBoundary.fetch();

		return BoroughSummaryModel.from(await this.manager.findTouchingBoroughs(Point.unpack(plot.shape)));
	}

	async assignSoleOwner(propertyId: string, entityId: string) {
		const property = await this.database.property.find(propertyId);
		const borough = await this.legalEntityManager.findBorough(property.boroughId);
		const entity = await this.database.legalEntity.find(entityId);

		let owner = await property.owners
			.orderByDescending(owner => owner.aquired)
			.first();

		if (!owner) {
			owner = new PropertyOwner();
			owner.property = property;

			owner.aquired = new Date();
			owner.share = 1;

			await owner.create();

			new PropertyValueator(borough).valueate(property).then(async valuation => {
				owner.aquiredValuation = valuation;

				await owner.update();
			});
		}

		owner.owner = entity;
		await owner.update();

		return new PropertyOwnerViewModel(owner);
	}

	async assignValuation(propertyId: string, plotAreaPrice: number, buildingAreaPrice: number) {
		const property = await this.database.property.find(propertyId);
		const plot = await property.activePlotBoundary.fetch();
		const plotPrice = Point.area(Point.unpack(plot.shape)) * plotAreaPrice * (Math.random() * 0.2 + 0.9);

		const buildings = await property.buildings.where(building => building.archived == null).toArray();
		const buildingArea = buildings.map(building => Point.area(Point.unpack(building.boundary))).reduce((sum, area) => sum + area, 0);
		const buildingPrice = buildingArea * buildingAreaPrice * (Math.random() * 0.2 + 0.9);;

		const valuation = new Valuation();
		valuation.estimated = new Date();
		valuation.item = `Property ${property.name ?? property.id}`;
		valuation.price = buildingPrice + plotPrice;

		await valuation.create();

		const currentOwners = await property.owners.where(owner => owner.sold == null).toArray();

		if (currentOwners.length) {
			for (let owner of currentOwners) {
				owner.aquiredValuation = valuation;

				await owner.update();
			}
		} else {
			const owner = new PropertyOwner();
			owner.property = property;
			owner.aquired = new Date();
			owner.share = 1;
			owner.aquiredValuation = valuation;

			await owner.create();
		}
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
