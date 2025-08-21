import { Company, ItemContextLinkRank } from "../../managed/database";
import { ItemContextFragmentComposer } from "../composer";

export class CompanyOfficesFragmentComposer extends ItemContextFragmentComposer<Company> {
	async compose(company: Company) {
		for (let office of await company.offices.where(office => office.closed == null).toArray()) {
			this.link(1, office.propertyId, office.name);
		}
	}
}
