import { MetricTracker } from ".";
import { toSimulatedAge } from "../../../../interface/time";
import { LegalEntityManager } from "../../legal-entity/manager";
import { TradeManager } from "../../trade/manager";

export class CompanyAssetTotalMetric extends MetricTracker {
	tag = ['company-office', 'asset', 'total'];

	name = 'Total commercial assets';
	description = 'Combined value of all company owned assets';

	async fetch() {
		const companies = await this.database.company.toArray();

		let total = 0;

		for (let company of companies) {
			const entity = await new LegalEntityManager(this.database).findCompany(company.id);
			const assets = await new TradeManager(this.database).compileAssets(entity.id);

			for (let item of assets) {
				total += item.value;
			}
		}

		return value;
	}
}
