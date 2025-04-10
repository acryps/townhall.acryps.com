import { Service } from "vlserver";
import { Article, ArticleImage, DbContext, Publication } from "../../managed/database";
import { ArticleImageViewModel, ArticleViewModel } from "./article";
import { PublicationViewModel } from "./publication";
import { Annotator } from "../../annotate";

export class PublicationService extends Service {
	constructor(
		private database: DbContext
	) {
		super();
	}

	async getPublication(tag: string) {
		return new PublicationViewModel(
			await this.database.publication.first(publication => publication.tag.valueOf() == tag)
		);
	}

	async getArticle(id: string) {
		return new ArticleViewModel(await this.database.article.find(id));
	}

	async getArticleContent(id: string) {
		const article = await this.database.article.find(id);

		return Annotator.annotate(article.body).pack();
	}

	listNewestArticles(page: number, publication: string) {
		let query = this.database.article
			.where(article => article.published != null)
			.orderByDescending(article => article.published);

		if (publication) {
			query = query.where(article => article.publicationId == publication);
		}

		return ArticleViewModel.from(query);
	}

	async createArticle(publicationId: string) {
		const article = new Article();
		article.title = '';
		article.body = '';
		article.publicationId = publicationId;

		await article.create();

		return article.id;
	}

	async saveArticle(id: string, title: string, body: string) {
		const article = await this.database.article.find(id);

		if (article.published) {
			throw new Error(`Article '${article.title}' already published`);
		}

		article.title = title;
		article.body = body;

		await article.update();
	}

	async uploadImage(id: string, data: Buffer) {
		const article = await this.database.article.find(id);

		if (article.published) {
			throw new Error(`Article '${article.title}' already published`);
		}

		const image = new ArticleImage();
		image.data = data;
		image.articleId = id;

		await image.create();

		return new ArticleImageViewModel(image);
	}

	async captionImage(id: string, caption: string) {
		const image = await this.database.articleImage.find(id);
		const article = await image.article.fetch();

		if (article.published) {
			throw new Error(`Article '${article.title}' already published`);
		}

		image.caption = caption;

		await image.update();
	}

	async removeImage(id: string) {
		const image = await this.database.articleImage.find(id);
		const article = await image.article.fetch();

		if (article.published) {
			throw new Error(`Article '${article.title}' already published`);
		}

		await image.delete();
	}

	async publish(id: string) {
		const article = await this.database.article.find(id);

		if (article.published) {
			throw new Error(`Article '${article.title}' already published`);
		}

		article.published = new Date();

		await article.update();
	}
}
