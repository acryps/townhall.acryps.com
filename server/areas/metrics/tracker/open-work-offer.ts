import { MetricTracker } from ".";

export class OpenWorkOfferMetric extends MetricTracker {
	tag = ['work', 'offers', 'open'];

	name = 'Open Work Offers';
	description = 'Number of open offers.';

	async fetch() {
		const offers = await this.database.workOffer
			.where(offer => offer.closed == null)
			.where(offer => offer.office.closed == null)
			.include(offer => offer.workContracts)
			.toArray();

		let count = 0;

		for (let offer of offers) {
			const contracts = await offer.workContracts.toArray();

			count += offer.count - contracts.filter(contract => !contract.canceled).length;
		}

		return count;
	}
}
