import { Time } from "../../../interface/time";
import { Article } from "../../managed/database";
import { DescriptionFragment, ItemContextComposer, MetricFragment } from "../composer";
import { ArticleReferencesFragmentComposer } from "./references";

export class ArticleContextComposer extends ItemContextComposer<Article> {
	find = id => this.database.article.find(id);
	title = (item: Article) => item.title;

	async primary(article: Article) {
		return [
			new MetricFragment('Title', () => article.title),
			new DescriptionFragment(article.body),
			new MetricFragment('Published', () => new Time(article.published).toString())
		];
	}

	async near(article: Article) {
		return [
			new ArticleReferencesFragmentComposer()
		];
	}
}
