import { Commodity, CommodityCategory, DbContext, MarketSegment } from "../../managed/database";

export class MarketSegmentResolver {
	// categories are nested (parent/children); a category without its own segment
	// inherits the segment of its nearest ancestor that has one set
	static async resolveCategory(category: CommodityCategory): Promise<MarketSegment> {
		let current = category;

		while (current) {
			const segment = await current.segment.fetch();

			if (segment) {
				return segment;
			}

			current = await current.parent.fetch();
		}

		return null;
	}

	static async resolveCommodity(commodity: Commodity): Promise<MarketSegment> {
		const category = await commodity.category.fetch();

		if (!category) {
			return null;
		}

		return this.resolveCategory(category);
	}

	// resolves every commodity to its segment in memory (no per-category fetches), grouped by segment id
	// commodities whose category tree has no segment assigned anywhere are left out
	static async groupCommoditiesBySegment(database: DbContext) {
		const categories = await database.commodityCategory.toArray();
		const commodities = await database.commodity.toArray();

		const categoriesById = new Map(categories.map(category => [category.id, category]));
		const resolvedSegmentIdByCategoryId = new Map<string, string>();

		const resolve = (categoryId: string): string => {
			if (!categoryId) {
				return null;
			}

			if (resolvedSegmentIdByCategoryId.has(categoryId)) {
				return resolvedSegmentIdByCategoryId.get(categoryId);
			}

			const category = categoriesById.get(categoryId);
			const segmentId = category.segmentId ?? resolve(category.parentId);

			resolvedSegmentIdByCategoryId.set(categoryId, segmentId);

			return segmentId;
		};

		const commoditiesBySegmentId = new Map<string, Commodity[]>();

		for (let commodity of commodities) {
			const segmentId = resolve(commodity.categoryId);

			if (!segmentId) {
				continue;
			}

			if (!commoditiesBySegmentId.has(segmentId)) {
				commoditiesBySegmentId.set(segmentId, []);
			}

			commoditiesBySegmentId.get(segmentId).push(commodity);
		}

		return commoditiesBySegmentId;
	}
}
