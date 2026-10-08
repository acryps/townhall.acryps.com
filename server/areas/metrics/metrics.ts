import { Logger } from "@acryps/log";
import { CompanyType, DbContext } from "../../managed/database";
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

	for (let tracker of await buildMetricTrackers(database)) {
		await MetricTracker.track(tracker, metrics);
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
