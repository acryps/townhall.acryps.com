import { convertToLegalCompanyName } from "../../../interface/company";
import { Time } from "../../../interface/time";
import { Company, ItemContextLinkRank } from "../../managed/database";
import { ArticleReferenceContextFragment } from "../article/article-reference";
import { DescriptionFragment, ItemContextComposer, ItemContextFragmentComposer, MetricFragment } from "../composer";
import { CompanyOfficesFragmentComposer } from "./office";
import { CompanyRolesFragmentComposer } from "./roles";

export class CompanyContextComposer extends ItemContextComposer<Company> {
	find = id => this.database.company.find(id);
	title = (item: Company) => convertToLegalCompanyName(item);

	async collect(company: Company) {
		return [
			async () => [
				new DescriptionFragment(company.description),
				new MetricFragment('Founded', () => new Time(company.created).toDateString())
			],
			async () => [
				new ArticleReferenceContextFragment(1, company.id),
				new CompanyOfficesFragmentComposer()
			],
			async () => [
				new CompanyRolesFragmentComposer()
			]
		]
	}
}
