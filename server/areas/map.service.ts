import { Service } from "vlserver";
import { Borough, DbContext, Property } from "../managed/database";
import { Proxy } from "../proxy";
import { BoroughViewModel } from "./borough.view";
import { BridgeViewModel } from "./bridge.view";
import { HistoryEntryViewModel } from "./history.view";
import { PropertyTypeViewModel } from "./property-type.view";
import { PropertySummaryModel } from "./property.summary";
import { PropertyViewModel } from "./property.view";
import { SquareViewModel } from "./squre.view";
import { StreetViewModel } from "./street.view";
import { WaterBodyViewModel } from "./water-body.view";
import { Point } from "../../interface/point";

export class MapService extends Service {
	constructor(
		private db: DbContext
	) {
		super();
	}

	getBoroughs() {
		return BoroughViewModel.from(
			this.db.borough
				.orderByAscending(borough => borough.name)
		);
	}

	getProperties(page: number) {
		return PropertySummaryModel.from(
			this.db.property
				.where(property => property.deactivated == null)
				.orderByDescending(property => property.borough)
				.orderByDescending(property => property.type)
				.orderByDescending(property => property.id)
				.page(page, 50)
		);
	}

	getStreets() {
		return StreetViewModel.from(
			this.db.street
				.orderByAscending(street => street.size)
				.orderByAscending(street => street.name)
		);
	}

	getSquares() {
		return SquareViewModel.from(
			this.db.square
				.orderByAscending(square => square.name)
		);
	}

	getWaterBodies() {
		return WaterBodyViewModel.from(
			this.db.waterBody
				.orderByAscending(body => body.name)
		);
	}

	getBridges() {
		return BridgeViewModel.from(
			this.db.bridge
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
		return PropertyTypeViewModel.from(this.db.propertyType.orderByAscending(type => type.code));
	}

	async getProperty(id: string) {
		return new PropertyViewModel(await this.db.property.find(id));
	}

	async createProperty(shape: string) {
		const property = new Property();
		property.bounds = Point.pack(Point.unpack(shape));
		property.created = new Date();

		await property.create();

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
