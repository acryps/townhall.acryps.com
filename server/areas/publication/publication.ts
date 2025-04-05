import { ViewModel } from "vlserver";
import { Publication } from "../../managed/database";
import { ArticleViewModel } from "./article";
import { CompanySummaryModel } from "../company.view";

export class PublicationSummaryModel extends ViewModel<Publication> {
	id;
	tag;

	name;
	description;

	company: CompanySummaryModel;
}

export class PublicationViewModel extends PublicationSummaryModel {
	incorporation;

	articles: ArticleViewModel[];
}
