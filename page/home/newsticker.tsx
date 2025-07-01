import { Component } from "@acryps/page";
import { PublicationService } from "../managed/services";
import { ArticleNewstickerModel } from "../../interface/models";
import { Time } from "../../interface/time";

export class NewstickerComponent extends Component {
	newsticker: ArticleNewstickerModel[] = [];

	async onload() {
		this.newsticker = await new PublicationService().getNewsticker();
	}

	renderLoader = () => this.render();

	render() {
		return <ui-newsticker>
			<ui-scroller>
				{this.newsticker.map(article => this.renderArticle(article))}
				{this.newsticker.map(article => this.renderArticle(article))}
			</ui-scroller>
		</ui-newsticker>;
	}

	renderArticle(article: ArticleNewstickerModel) {
		return <ui-article ui-href={`/news/article/${article.id}`}>
			<ui-title>
				{article.title}
			</ui-title>

			<ui-date>
				{new Time(article.published).toDateString()}
			</ui-date>
		</ui-article>;
	}
}
