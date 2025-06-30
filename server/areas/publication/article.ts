import { ViewModel } from "vlserver";
import { Article, ArticleImage, ArticleOpinion } from "../../managed/database";
import { PublicationSummaryModel } from "./publication";
import { OracleProposalSummaryModel, OracleProposalViewModel } from "../oracle/proposal";
import { ResidentSummaryModel } from "../life/resident";

export class ArticleNewstickerModel extends ViewModel<Article> {
	id;

	title;
	published;
}

export class ArticlePreviewModel extends ViewModel<Article> {
	id;

	title;
	published;
	body;

	images: ArticleImageViewModel[];
	publication: PublicationSummaryModel;

	oracleProposal: OracleProposalSummaryModel;
}

export class ArticleViewModel extends ArticlePreviewModel {
	opinions: ArticleOpinionViewModel[];
}

export class ArticleOpinionViewModel extends ViewModel<ArticleOpinion> {
	id;

	commented;
	comment;

	author: ResidentSummaryModel;
}

export class ArticleImageViewModel extends ViewModel<ArticleImage> {
	id;

	caption;
}
