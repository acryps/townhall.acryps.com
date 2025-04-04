import { Component } from "@acryps/page";
import { ArticleViewModel } from "../managed/services";
import { BannerComponent } from "../banner";

export class ArticleListComponent extends Component {
	constructor(
		private articles: ArticleViewModel[]
	) {
		super();
	}

	render() {
		let lastDate = new Date();

		return <ui-articles>
			{this.articles.filter(article => article.published).map(article => {
				const element = <ui-article ui-href={`/news/article/${article.id}`}>
					{article.images.length > 0 && <ui-images>
						{article.images.map(image => <img src={`/article/image/${image.id}`} />)}
					</ui-images>}

					<ui-title>
						{article.title}
					</ui-title>

					<ui-body>
						{article.body.substring(0, 1000)}
					</ui-body>

					<ui-publication>
						{BannerComponent.unpack(article.publication.banner)}

						{article.publication.name}
					</ui-publication>
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
