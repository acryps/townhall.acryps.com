import { Time } from "../../../interface/time";
import { Office } from "../../managed/database";
import { ItemContextComposer, MetricFragment } from "../composer";

export class OfficeContextComposer extends ItemContextComposer<Office> {
	find = id => this.database.office.find(id);
	title = (item: Office) => item.name;

	async collect(office: Office) {
		return [
			async () => [
				new MetricFragment('Opening', () => `${new Time(office.opened).age()} years ago`),

				new MetricFragment('Worker Count', async () => {
					let total = 0;

					for (let workOffer of await office.workOffers.toArray()) {
						total += await workOffer.workContracts
							.where(contract => contract.canceled == null)
							.count();
					}

					return `${total} workers`;
				})
			]
		];
	}
}
