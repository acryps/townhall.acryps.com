import { Component } from "@acryps/page";
import { ArticleViewModel, PublicationService, PublicationSummaryModel } from "../managed/services";

export class NewsPage extends Component {
	articles: ArticleViewModel[];
	publications: PublicationSummaryModel[];

	async onload() {
		this.articles = await new PublicationService().listNewestArticles();
		this.publications = [];

		for (let article of this.articles) {
			if (!this.publications.find(publication => publication.id == article.publication.id)) {
				this.publications.push(article.publication);
			}
		}
	}

	render() {
		let lastDate = new Date();

		return <ui-news>
			<ui-publications>
				{this.publications.map(publication => <ui-publication ui-href={`publication/${publication.tag}`}>
					{publication.name}
				</ui-publication>)}
			</ui-publications>

			<ui-articles>
				{this.articles.map(article => {
					const element = <ui-article ui-href={`article/${article.id}`}>
						<ui-title>
							{article.title}
						</ui-title>

						<ui-body>
							{article.body.substring(0, 1000)}
						</ui-body>

						<ui-publication>
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
			</ui-articles>
		</ui-news>;
	}
}
