import { MetricTracker } from ".";

export class NewsArticleCountMetric extends MetricTracker {
	tag = ['news', 'article', 'count'];

	name = 'News Articles';
	description = 'Number of news articles';

	async fetch() {
		return await this.database.article
			.where(article => article.published != null)
			.count();
	}
}
