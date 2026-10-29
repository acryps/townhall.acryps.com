import { DbContext } from "../../managed/database";
import { Task } from "../../scheduler";
import { ArticleDraftInterpreter } from "./draft-interpreter";

// the only place interpret()/write() ever get called from - submitting a draft or answering its last
// question just updates plain article state, this is what actually turns that into content. keeping
// generation off the request path means a server crash mid-generation simply leaves state for the
// next tick to pick up, instead of stranding the article with no code left watching it
export class ArticleDraftWorker extends Task {
	// guards against re-dispatching an article that's still being worked on - interpret()/write()
	// can easily take longer than this task's own interval
	private working = new Set<string>();

	constructor(
		private database: DbContext
	) {
		super();
	}

	async run() {
		const submittedDrafts = await this.database.article
			.where(article => article.draftSubmitted != null)
			.where(article => article.interpreted == null)
			.where(article => article.published == null)
			.toArray();

		for (let article of submittedDrafts) {
			this.dispatch(article.id, () => ArticleDraftInterpreter.interpret(this.database, article.id));
		}

		const interpretedArticles = await this.database.article
			.where(article => article.interpreted != null)
			.where(article => article.published == null)
			.toArray();

		for (let article of interpretedArticles) {
			const unanswered = await this.database.articleDraftQuestion
				.where(question => question.articleId == article.id)
				.where(question => question.answerId == null)
				.count();

			if (!unanswered) {
				this.dispatch(article.id, () => ArticleDraftInterpreter.write(this.database, article.id));
			}
		}

		return 1000 * 60;
	}

	private dispatch(articleId: string, action: () => Promise<void>) {
		if (this.working.has(articleId)) {
			return;
		}

		this.working.add(articleId);

		console.log(`generating content for article ${articleId}`);

		action().finally(() => this.working.delete(articleId));
	}
}
