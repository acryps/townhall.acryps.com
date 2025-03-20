import { DbClient } from "vlquery";
import { Service } from "vlserver";
import { Company, CompanyType, DbContext, Office } from "../../managed/database";
import { CompanySummaryModel, CompanyViewModel, OfficeViewModel } from "../company.view";
import { WorkOfferViewModel } from "../work";

export class CompanyOfficeService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async find(tag: string) {
		return new CompanyViewModel(await this.database.company.first(company => company.tag.valueOf() == tag));
	}

	async getOffice(id: string) {
		return new OfficeViewModel(await this.database.office.find(id));
	}

	async getWorkOffer(id: string) {
		return new WorkOfferViewModel(await this.database.workOffer.find(id));
	}

	async getCompanies() {
		return CompanySummaryModel.from(this.database.company
			.orderByAscending(company => company.tag)
		);
	}

	async register(name: string, description: string, type: string, firstOfficeId: string, capacity: number) {
		const company = new Company();
		company.created = new Date();
		company.name = name;
		company.description = description;
		company.type = type;

		const findTag = async (iteration = 0) => {
			let tag = `${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

			while (tag.includes('--')) {
				tag = tag.replace('--', '-');
			}

			if (iteration) {
				tag += `-${iteration}`;
			}

			const existing = await this.database.company.first(company => company.tag.valueOf() == tag);

			if (existing) {
				return await findTag(iteration + 1);
			}

			return tag;
		}

		company.tag = await findTag();

		await company.create();

		const office = new Office();
		office.company = company;
		office.propertyId = firstOfficeId;
		office.capacity = capacity;
		office.opened = company.created;
		office.name = 'Main Office';

		await office.create();

		return company.tag;
	}
}
