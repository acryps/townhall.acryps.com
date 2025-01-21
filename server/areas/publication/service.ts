import { Service } from "vlserver";
import { DbContext } from "../../managed/database";
import { ArticleViewModel } from "./article";
import { PublicationViewModel } from "./publication";

export class PublicationService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getPublication(tag: string) {
		return new PublicationViewModel(await this.database.publication.first(publication => publication.tag.valueOf() == tag));
	}

	async getArticle(id: string) {
		return new ArticleViewModel(await this.database.article.find(id));
	}

	listNewestArticles() {
		return ArticleViewModel.from(this.database.article.orderByDescending(article => article.published));
	}
}
