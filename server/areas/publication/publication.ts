import { ViewModel } from "vlserver";
import { Publication } from "../../managed/database";
import { ArticleViewModel } from "./article";

export class PublicationSummaryModel extends ViewModel<Publication> {
	id;
	tag;

	name;
	description;
	banner;
}

export class PublicationViewModel extends ViewModel<Publication> {
	id;
	tag;

	name;
	description;
	incorporation;
	legalName;
	banner;

	mainOfficeId;

	articles: ArticleViewModel[];
}
