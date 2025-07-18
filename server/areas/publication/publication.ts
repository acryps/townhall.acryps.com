import { ViewModel } from "vlserver";
import { Publication } from "../../managed/database";
import { ArticlePreviewModel } from "./article";
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

	articles: ArticlePreviewModel[];
}
