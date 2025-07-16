import { Service } from "vlserver";
import { BoroughViewModel } from "../borough.view";
import { Borough, DbContext } from "../../managed/database";
import { BoroughSummaryModel } from "../borough.summary";
import { Point } from "../../../interface/point";
import { DistrictViewModel } from "../vote/district";

export class BoroughService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async get(tag: string) {
		return new BoroughViewModel(await this.database.borough.first(borough => borough.tag.valueOf() == tag));
	}

	async register(bounds: string, name: string, description: string, districtId: string) {
		const borough = new Borough();
		borough.bounds = Point.pack(Point.unpack(bounds));
		borough.incorporation = new Date();
		borough.name = name;
		borough.description = description;
		borough.districtId = districtId;

		borough.color = `#${Math.random().toString(16).substring(2, 4)}${Math.random().toString(16).substring(2, 4)}${Math.random().toString(16).substring(2, 4)}`;

		borough.tag = name.toLowerCase().replace(/[^a-z]/g, '-');

		while (borough.tag.includes('--')) {
			borough.tag = borough.tag.replace('--', '-');
		}

		await borough.create();

		return borough.tag;
	}

	list() {
		return BoroughSummaryModel.from(
			this.database.borough
				.orderByAscending(borough => borough.name)
		);
	}

	listDistricts() {
		return DistrictViewModel.from(
			this.database.district
				.orderByAscending(borough => borough.billPrefix)
		);
	}

	async residentCount(id: string) {
		return await this.database.resident
			.where(resident => resident.mainTenancy.dwelling.property.boroughId == id)
			.count();
	}

	async officeCount(id: string) {
		return await this.database.office
			.where(office => office.property.boroughId == id)
			.count();
	}

	async propertyCount(id: string) {
		return await this.database.property
			.where(property => property.deactivated == null)
			.where(property => property.boroughId == id)
			.count()
	}
}
