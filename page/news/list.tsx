import { Component } from "@acryps/page";
import { ArticleViewModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { Banner } from "../../interface/banner";

export class ArticleListComponent extends Component {
	articles: ArticleViewModel[];

	constructor(
		articles: ArticleViewModel[]
	) {
		super();

		this.articles = articles.toSorted((a, b) => b.published > a.published ? 1 : -1);
	}

	render() {
		let lastDate = new Date();

		return <ui-articles>
			{this.articles.filter(article => article.published).map(article => {
				const element = <ui-article ui-href={`/news/article/${article.id}`}>
					<ui-detail>
						<ui-title>
							{article.title}
						</ui-title>

						<ui-body>
							{article.body.substring(0, 1000)}
						</ui-body>

						<ui-publication>
							{new BannerComponent(Banner.unpack(article.publication.company.banner))}

							{article.publication.name}
						</ui-publication>
					</ui-detail>

					{article.images.length > 0 && <img src={`/article/image/${article.images[0].id}`} />}
				</ui-article>;

				if (lastDate.toDateString() != article.published.toDateString()) {
					lastDate = article.published;

					return [
						<ui-date>
							{article.published.toLocaleDateString()}
						</ui-date>,

						element
					]
				}

				lastDate = article.published;

				return element;
			})}
		</ui-articles>;
	}
}
