import { Company, ItemContextLinkRank } from "../../managed/database";
import { ItemContextFragmentComposer } from "../composer";

export class CompanyRolesFragmentComposer extends ItemContextFragmentComposer<Company> {
	async compose(company: Company) {
		for (let office of await company.offices.where(office => office.closed == null).toArray()) {
			for (let workOffer of await office.workOffers.where(offer => offer.closed == null).toArray()) {
				const contracts = await workOffer.workContracts
					.where(contract => contract.canceled == null)
					.include(contract => contract.worker)
					.toArray();

				this.found(ItemContextLinkRank.near, `Offers Role ${workOffer.title}`, `${contracts.length} people work in this position`);

				for (let contract of contracts) {
					const worker = await contract.worker.fetch();

					this.link(ItemContextLinkRank.far, contract.workerId, `${worker.givenName} ${worker.familyName} working as ${workOffer.title} at office ${office.name}`);
				}
			}
		}
	}
}
