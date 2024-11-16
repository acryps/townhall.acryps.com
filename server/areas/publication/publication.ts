import { ViewModel } from "vlserver";
import { Publication } from "../../managed/database";
import { ArticleViewModel } from "./article";

export class PublicationSummaryModel extends ViewModel<Publication> {
	id;
	tag;

	name;
}

export class PublicationViewModel extends ViewModel<Publication> {
	id;
	tag;

	name;
	incorporation;
	legalName;

	mainOfficeId;

	articles: ArticleViewModel[];
}
