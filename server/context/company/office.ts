import { Company, ItemContextLinkRank } from "../../managed/database";
import { ItemContextFragmentComposer } from "../composer";

export class CompanyOfficesFragmentComposer extends ItemContextFragmentComposer<Company> {
	async compose(company: Company) {
		for (let office of await company.offices.where(office => office.closed == null && office.opened != null).toArray()) {
			if (await office.workOffers.count()) {
				this.link(1, office.id, `Office '${office.name}'`);
			}
		}
	}
}
