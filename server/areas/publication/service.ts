import { Service } from "vlserver";
import { Article, ArticleImage, DbContext, Publication } from "../../managed/database";
import { ArticleImageViewModel, ArticleNewstickerModel, ArticlePreviewModel, ArticleViewModel } from "./article";
import { PublicationViewModel } from "./publication";
import { Annotator } from "../../annotate";
import { ArticleDraftInterpreter } from "./draft-interpreter";
import { DraftReviewViewModel, DraftSummaryModel } from "./draft";

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

	async getNewsticker() {
		return ArticleNewstickerModel.from(this.database.article
			.where(article => article.published != null)
			.where(article => article.oracleProposalId == null)
			.orderByDescending(article => article.published)
			.limit(5)
		);
	}

	listNewestArticles(page: number, publication: string) {
		let query = this.database.article
			.where(article => article.published != null)
			.orderByDescending(article => article.published);

		if (publication) {
			query = query.where(article => article.publicationId == publication);
		}

		return ArticlePreviewModel.from(query);
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

	async createDraft(publicationId: string) {
		const article = new Article();
		article.title = '';
		article.draft = '';
		article.publicationId = publicationId;

		await article.create();

		return article.id;
	}

	async saveDraft(id: string, draft: string) {
		const article = await this.database.article.find(id);

		if (article.published) {
			throw new Error(`Article '${article.title}' already published`);
		}

		article.draft = draft;

		await article.update();
	}

	interpretDraft(id: string) {
		// fire and forget - the review page polls until it completes
		ArticleDraftInterpreter.interpret(this.database, id);
	}

	async getDraftReview(id: string) {
		return new DraftReviewViewModel(await this.database.article.find(id));
	}

	async selectAnswer(questionId: string, answerId: string) {
		const question = await this.database.articleDraftQuestion.find(questionId);
		question.answerId = answerId;

		await question.update();
	}

	writeDraft(id: string) {
		// fire and forget - the review page polls until it completes
		ArticleDraftInterpreter.write(this.database, id);
	}

	async editAnswer(answerId: string, content: string) {
		const answer = await this.database.articleDraftAnswer.find(answerId);
		answer.content = content;

		await answer.update();
	}

	async hasPendingDrafts() {
		const candidates = await this.database.article
			.where(article => article.interpreted != null)
			.where(article => article.published == null)
			.toArray();

		for (let article of candidates) {
			const unanswered = await this.database.articleDraftQuestion
				.where(question => question.articleId == article.id)
				.where(question => question.answerId == null)
				.count();

			if (unanswered) {
				return true;
			}
		}

		return false;
	}

	async listPendingDrafts() {
		const candidates = await this.database.article
			.where(article => article.interpreted != null)
			.where(article => article.published == null)
			.orderByAscending(article => article.interpreted)
			.toArray();

		const pending: Article[] = [];

		for (let article of candidates) {
			const unanswered = await this.database.articleDraftQuestion
				.where(question => question.articleId == article.id)
				.where(question => question.answerId == null)
				.count();

			if (unanswered) {
				pending.push(article);
			}
		}

		return DraftSummaryModel.from(pending);
	}
}
