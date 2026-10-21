import { Logger } from "@acryps/log";
import { CompanyType, DbContext, MetricValue } from "../../managed/database";
import { WorkerHandle } from "../../worker";
import { MetricTracker } from "./tracker";
import { AllocatedAreaMetric } from "./tracker/allocated-area";
import { NewsArticleCountMetric } from "./tracker/articles";
import { PopulationAgeAverageMetric } from "./tracker/average-age";
import { BoroughAllocatedAreaMetric } from "./tracker/borough/allocated-area";
import { BoroughJobCapacityMetric } from "./tracker/borough/job-capacity";
import { BoroughJobCountMetric } from "./tracker/borough/job-count";
import { BoroughResidentCountMetric } from "./tracker/borough/resident-count";
import { CompanyAssetTotalMetric } from "./tracker/company-asset-total";
import { CompanyCountMetric } from "./tracker/company-count";
import { DwellingCountMetric } from "./tracker/dwelling-count";
import { EmptyDwellingCountMetric } from "./tracker/empty-dwellings";
import { HomelessCountMetric } from "./tracker/homeless-count";
import { HomelessRateMetric } from "./tracker/homeless-rate";
import { OpenWorkOfferMetric } from "./tracker/open-work-offer";
import { PlayerTraveledBlocksMetric } from "./tracker/player-traveled-blocks";
import { PopulationSizeMetric } from "./tracker/population-size";
import { PropertyCountMetric } from "./tracker/property-count";
import { RelationDistanceMetric } from "./tracker/relation-distance";
import { TotalPropertyValueMetric } from "./tracker/total-property-value";
import { WorkUnemploymentMetric } from "./tracker/unemployment";
import { WorkOfferTotalMetric } from "./tracker/work-offers";

// order will be keept in client
const buildMetricTrackers = async (database: DbContext) => {
	const trackers: MetricTracker[] = [
		new PopulationSizeMetric(database),
		new PopulationAgeAverageMetric(database),
		/// new RelationDistanceMetric(database), // very slow

		new PlayerTraveledBlocksMetric(database),

		new HomelessCountMetric(database),
		new HomelessRateMetric(database),

		new PropertyCountMetric(database),
		new DwellingCountMetric(database),
		new EmptyDwellingCountMetric(database),
		new AllocatedAreaMetric(database),
		new TotalPropertyValueMetric(database),

		new WorkUnemploymentMetric(database),
		new WorkOfferTotalMetric(database),
		new OpenWorkOfferMetric(database),

		new NewsArticleCountMetric(database)
	];

	for (let type in CompanyType) {
		if (typeof CompanyType[type] == 'string') {
			trackers.push(new CompanyCountMetric(database, CompanyType[type]));
		}
	}

	trackers.push(new CompanyAssetTotalMetric(database));

	for (let borough of await database.borough.toArray()) {
		trackers.push(new BoroughAllocatedAreaMetric(database, borough));
		trackers.push(new BoroughResidentCountMetric(database, borough));
		trackers.push(new BoroughJobCountMetric(database, borough));
		trackers.push(new BoroughJobCapacityMetric(database, borough));
	}

	return trackers;
};

export const registerMetrics = async (database: DbContext) => {
	const metrics = await database.metric.toArray();
	const trackers = await buildMetricTrackers(database);

	// preload the most recent values in a single query - metrics are updated one after another,
	// so the last `2 * trackers.length` values will usually cover the latest value of every metric,
	// sparing each tracker its own round trip on startup
	const recentValues = await database.metricValue
		.orderByDescending(value => value.updated)
		.include(value => value.metric)
		.limit(trackers.length * 2)
		.toArray();

	const lastValueByMetricId = new Map<string, MetricValue>();

	for (let value of recentValues) {
		if (!lastValueByMetricId.has(value.metricId)) {
			lastValueByMetricId.set(value.metricId, value);
		}
	}

	for (let tracker of trackers) {
		await MetricTracker.track(tracker, metrics, lastValueByMetricId);
	}
};

// runs a single metric update on a worker thread - which metric is picked via the dispatch `context` (the metric's tag)
export class MetricTrackerWorkerHandle extends WorkerHandle {
	static async dispatch(logger: Logger, database: DbContext, tag: string) {
		const tracker = (await buildMetricTrackers(database)).find(tracker => tracker.tag.join('-') == tag);

		tracker.metric = await database.metric.first(metric => metric.tag.valueOf() == tag);

		await tracker.update();
	}
}
