import { ViewModel } from "vlserver";
import { Article, ArticleImage } from "../../managed/database";
import { PublicationSummaryModel } from "./publication";

export class ArticleViewModel extends ViewModel<Article> {
	id;

	title;
	published;
	body;

	images: ArticleImageViewModel[];
	publication: PublicationSummaryModel;
}

export class ArticleImageViewModel extends ViewModel<ArticleImage> {
	id;

	caption;
}
