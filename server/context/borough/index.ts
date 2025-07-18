import { Point } from "../../../interface/point";
import { Borough, ItemContextLinkRank } from "../../managed/database";
import { ArticleReferenceContextFragment } from "../article/article-reference";
import { DescriptionFragment, ItemContextComposer, ItemContextFragmentComposer, MetricFragment } from "../composer";
import { BoroughPropertyFragmentComposer } from "./properties";

export class BoroughContextComposer extends ItemContextComposer<Borough> {
	find = id => this.database.borough.find(id);
	title = (item: Borough) => item.name;

	async primary(borough: Borough) {
		return [
			new DescriptionFragment(borough.description),
			new MetricFragment('Area', () => `${Point.area(Point.unpack(borough.bounds))} b2`),
			new MetricFragment('Population', async () => `${await this.database.resident.where(resident => resident.mainTenancy.dwelling.property.boroughId == borough.id).count()} residents`)
		];
	}

	async near(borough: Borough) {
		return [
			new ArticleReferenceContextFragment(ItemContextLinkRank.near, borough.id)
		];
	}

	async far(borough: Borough) {
		return [
			new BoroughPropertyFragmentComposer()
		]
	}
}
