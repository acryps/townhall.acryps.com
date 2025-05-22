import { MetricTracker } from ".";
import { convertToCompanyTypeName } from "../../../../interface/company";
import { toSimulatedAge } from "../../../../interface/time";
import { CompanyType, DbContext } from "../../../managed/database";

export class CompanyCountMetric extends MetricTracker {
	constructor(
		database: DbContext,
		private companyType: CompanyType
	) {
		super(database);
	}

	tag = ['company-office', 'count', `${this.companyType}`];

	name = `Registered ${convertToCompanyTypeName(this.companyType as any)}`;
	description = 'Total number of registered ${convertToCompanyTypeName(this.companyType as any)}, including not incorporated';

	async fetch() {
		return await this.database.company.where(company => company.type == this.companyType).count();
	}
}
