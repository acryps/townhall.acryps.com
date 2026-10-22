import { Component } from "@acryps/page";
import { ArticlePreviewModel, PublicationService, PublicationSummaryModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { ArticleListComponent } from "./list";
import { Banner } from "../../interface/banner";

export class NewsPage extends Component {
	articles: ArticlePreviewModel[];
	publications: PublicationSummaryModel[];
	pendingDrafts: boolean;

	page = 0;
	loadingNextPage = false;

	loadMoreTracker: HTMLElement = <ui-load-more></ui-load-more>;

	async onload() {
		this.articles = await new PublicationService().listNewestArticles(0, null);
		this.publications = [];

		this.collectPublications(this.articles);

		this.pendingDrafts = await new PublicationService().hasPendingDrafts();
	}

	collectPublications(articles: ArticlePreviewModel[]) {
		for (let article of articles) {
			if (!this.publications.find(publication => publication.id == article.publication.id)) {
				this.publications.push(article.publication);
			}
		}
	}

	async loadNextPage() {
		if (this.loadingNextPage) {
			return;
		}

		this.loadingNextPage = true;
		this.page++;

		const nextPage = await new PublicationService().listNewestArticles(this.page, null);

		if (nextPage.length == 0) {
			return;
		}

		this.articles.push(...nextPage);
		this.collectPublications(nextPage);

		setTimeout(() => {
			this.loadingNextPage = false;

			this.checkLoading();
		}, 250);

		this.update();
	}

	checkLoading() {
		if (this.loaded) {
			if (this.loadMoreTracker.getBoundingClientRect().y < innerHeight * 2) {
				this.loadNextPage();
			}
		}
	}

	render() {
		document.addEventListener('scroll', () => this.checkLoading());

		return <ui-news>
			<ui-publications>
				{this.publications.map(publication => <ui-publication ui-href={`publication/${publication.tag}`}>
					{new BannerComponent(Banner.unpack(publication.company.banner))}
				</ui-publication>)}
			</ui-publications>

			{this.pendingDrafts && <ui-actions>
				<ui-action ui-href='drafts'>
					Answer Questions
				</ui-action>
			</ui-actions>}

			{new ArticleListComponent(this.articles)}

			{this.loadMoreTracker}
		</ui-news>;
	}
}
