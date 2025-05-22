import { MetricTracker } from ".";

export class WorkOfferTotalMetric extends MetricTracker {
	tag = ['work', 'offers', 'total'];

	name = 'Work Offering Count';
	description = 'Number of work positions, both occupied and open.';

	async fetch() {
		const offers = await this.database.workOffer
			.where(offer => offer.closed == null)
			.where(offer => offer.office.closed == null)
			.toArray();

		let count = 0;

		for (let offer of offers) {
			count += offer.count;
		}

		return count;
	}
}
