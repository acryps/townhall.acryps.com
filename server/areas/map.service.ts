import { Service } from "vlserver";
import { Borough, DbContext, PlotBoundary, Property } from "../managed/database";
import { Proxy } from "../proxy";
import { BoroughViewModel } from "./borough.view";
import { BridgeViewModel } from "./bridge.view";
import { HistoryEntryViewModel } from "./history.view";
import { PropertyTypeViewModel } from "./property-type.view";
import { PropertySummaryModel } from "./property.summary";
import { PropertyOverviewModel, PropertyViewModel } from "./property.view";
import { SquareViewModel } from "./squre.view";
import { StreetViewModel } from "./street.view";
import { WaterBodyViewModel } from "./water-body.view";
import { Point } from "../../interface/point";

export class MapService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async reviewNext() {
		return new PropertyViewModel(
			await this.database.property.where(property => property.deactivated == null).first(property => property.reviewPlot != true)
		);
	}

	getBoroughs() {
		return BoroughViewModel.from(
			this.database.borough
				.orderByAscending(borough => borough.name)
		);
	}

	getProperties(page: number) {
		return PropertyOverviewModel.from(
			this.database.property
				.where(property => property.deactivated == null)
				.orderByDescending(property => property.borough)
				.orderByDescending(property => property.type)
				.orderByDescending(property => property.id)
				.page(page, 50)
		);
	}

	getStreets() {
		return StreetViewModel.from(
			this.database.street
				.orderByAscending(street => street.size)
				.orderByAscending(street => street.name)
		);
	}

	getSquares() {
		return SquareViewModel.from(
			this.database.square
				.orderByAscending(square => square.name)
		);
	}

	getWaterBodies() {
		return WaterBodyViewModel.from(
			this.database.waterBody
				.orderByAscending(body => body.name)
		);
	}

	getBridges() {
		return BridgeViewModel.from(
			this.database.bridge
				.orderByAscending(bridge => bridge.name)
		);
	}

	async getHistory() {
		return HistoryEntryViewModel.from(await Proxy.getHistory());
	}

	async getTubes() {
		return await Proxy.getTubes();
	}

	async getPropertyTypes() {
		return PropertyTypeViewModel.from(this.database.propertyType.orderByAscending(type => type.code));
	}

	async getProperty(id: string) {
		return new PropertyViewModel(await this.database.property.find(id));
	}

	async createProperty(shape: string) {
		const property = new Property();
		property.created = new Date();

		await property.create();

		const plot = new PlotBoundary();
		plot.shape = Point.pack(Point.unpack(shape));
		plot.created = new Date();
		plot.property = property;

		await plot.create();

		property.activePlotBoundary = plot;
		await property.update();

		return property.id;
	}

	async createBorough(boroughViewModel: BoroughViewModel) {
		const borough = await boroughViewModel.toModel();
		borough.incorporation = new Date();

		await borough.create();
	}

	async createStreet(streetViewModel: StreetViewModel) {
		const street = await streetViewModel.toModel();

		await street.create();
	}

	async createSquare(squareViewModel: SquareViewModel) {
		const square = await squareViewModel.toModel();

		await square.create();
	}

	async createWaterBody(waterBodyViewModel: WaterBodyViewModel) {
		const waterBody = await waterBodyViewModel.toModel();

		await waterBody.create();
	}

	async saveProperty(propertyViewModel: PropertySummaryModel) {
		const property = await propertyViewModel.toModel();

		await property.update();
	}

	async archiveProperty(propertyViewModel: PropertyViewModel) {
		const property = await propertyViewModel.toModel();

		if (property.historicListingGradeId) {
			throw new Error('Historical property cannot be deactivated');
		}

		if (await property.offices.count()) {
			throw new Error('Inactive properties cannot have any offices');
		}

		if (await property.dwellings.count()) {
			throw new Error('Inactive properties cannot have any dwellings');
		}

		if (!property.deactivated) {
			property.deactivated = new Date();
		}

		await property.update();
	}
}
