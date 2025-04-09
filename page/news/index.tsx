import { Component } from "@acryps/page";
import { ArticleViewModel, PublicationService, PublicationSummaryModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { ArticleListComponent } from "./list";

export class NewsPage extends Component {
	articles: ArticleViewModel[];
	publications: PublicationSummaryModel[];

	async onload() {
		this.articles = await new PublicationService().listNewestArticles(0, null);
		this.publications = [];

		for (let article of this.articles) {
			if (!this.publications.find(publication => publication.id == article.publication.id)) {
				this.publications.push(article.publication);
			}
		}
	}

	render() {
		return <ui-news>
			<ui-publications>
				{this.publications.map(publication => <ui-publication ui-href={`publication/${publication.tag}`}>
					{BannerComponent.unpack(publication.company.banner)}

					<ui-detail>
						<ui-name>
							{publication.name}
						</ui-name>

						<ui-description>
							{publication.description}
						</ui-description>
					</ui-detail>
				</ui-publication>)}
			</ui-publications>

			{new ArticleListComponent(this.articles)}
		</ui-news>;
	}
}
