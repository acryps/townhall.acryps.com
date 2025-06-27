import { ViewModel } from "vlserver";
import { Article, ArticleImage } from "../../managed/database";
import { PublicationSummaryModel } from "./publication";
import { OracleProposalSummaryModel, OracleProposalViewModel } from "../oracle/proposal";

export class ArticleNewstickerModel extends ViewModel<Article> {
	id;

	title;
	published;
}

export class ArticleViewModel extends ViewModel<Article> {
	id;

	title;
	published;
	body;

	images: ArticleImageViewModel[];
	publication: PublicationSummaryModel;

	oracleProposal: OracleProposalSummaryModel;
}

export class ArticleImageViewModel extends ViewModel<ArticleImage> {
	id;

	caption;
}
