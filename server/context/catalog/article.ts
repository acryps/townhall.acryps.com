import { DbContext } from "../../managed/database";
import { ContextCatalogProvider } from "./provider";

export class ArticleContextCatalogProvider extends ContextCatalogProvider {
	type = 'article';
	listed = true;

	async list(database: DbContext) {
		const articles = await database.article
			.where(article => article.published != null)
			.orderByDescending(article => article.published)
			.toArray();

		return articles.map(article => ({ id: article.id, label: article.title }));
	}

	async search(database: DbContext, text: string) {
		const articles = await database.article
			.where(article => article.published != null)
			.where(article => article.title.lowercase().includes(text.toLowerCase()))
			.toArray();

		return articles.map(article => ({ id: article.id, label: article.title }));
	}
}
