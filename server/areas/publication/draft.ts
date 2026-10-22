import { ViewModel } from "vlserver";
import { Article, ArticleDraftAnswer, ArticleDraftQuestion } from "../../managed/database";
import { PublicationSummaryModel } from "./publication";

export class DraftSummaryModel extends ViewModel<Article> {
	id;

	title;
	draft;

	publication: PublicationSummaryModel;
}

export class DraftAnswerViewModel extends ViewModel<ArticleDraftAnswer> {
	id;

	orderIndex;
	content;
}

export class DraftQuestionViewModel extends ViewModel<ArticleDraftQuestion> {
	id;

	orderIndex;
	question;
	detail;
	answerId;

	answers: DraftAnswerViewModel[];
}

export class DraftReviewViewModel extends DraftSummaryModel {
	interpreted;
	published;

	draftQuestions: DraftQuestionViewModel[];
}
