import { Service } from "vlserver";
import { DbContext, MilitaryFacility } from "../../managed/database";
import { MilitaryUnitSummaryModel, MilitaryUnitViewModel } from "./unit";
import { MilitaryFacilityViewModel } from "../property/military-facility";

export class MiliatryService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getUnit(id: string) {
		return new MilitaryUnitViewModel(await this.database.militaryUnit.find(id));
	}

	getUnits() {
		return MilitaryUnitSummaryModel.from(this.database.militaryUnit);
	}

	async assignFacility(propertyId: string) {
		const facility = new MilitaryFacility();
		facility.opened = new Date();
		facility.propertyId = propertyId;

		await facility.create();

		return new MilitaryFacilityViewModel(facility);
	}

	async updateFacility(facilityId: string, name: string, unitId: string) {
		const facility = await this.database.militaryFacility.find(facilityId);
		facility.name = name || null;
		facility.unitId = unitId;

		await facility.update();
	}

	async closeFacility(facilityId: string) {
		const facility = await this.database.militaryFacility.find(facilityId);
		facility.closed = new Date();

		await facility.update();
	}
}
