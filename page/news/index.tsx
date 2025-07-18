import { Component } from "@acryps/page";
import { ArticlePreviewModel, PublicationService, PublicationSummaryModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { ArticleListComponent } from "./list";
import { Banner } from "../../interface/banner";

export class NewsPage extends Component {
	articles: ArticlePreviewModel[];
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
					{new BannerComponent(Banner.unpack(publication.company.banner))}
				</ui-publication>)}
			</ui-publications>

			{new ArticleListComponent(this.articles)}
		</ui-news>;
	}
}
