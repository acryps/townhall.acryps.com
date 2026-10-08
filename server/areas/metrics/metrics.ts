import { CompanyType, DbContext } from "../../managed/database";
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

export const registerMetrics = async (database: DbContext) => {
	// order will be keept in client
	await MetricTracker.track(new PopulationSizeMetric(database));
	await MetricTracker.track(new PopulationAgeAverageMetric(database));
	/// await MetricTracker.track(new RelationDistanceMetric(database)); // very slow

	await MetricTracker.track(new PlayerTraveledBlocksMetric(database));

	await MetricTracker.track(new HomelessCountMetric(database));
	await MetricTracker.track(new HomelessRateMetric(database));

	await MetricTracker.track(new PropertyCountMetric(database));
	await MetricTracker.track(new DwellingCountMetric(database));
	await MetricTracker.track(new EmptyDwellingCountMetric(database));
	await MetricTracker.track(new AllocatedAreaMetric(database));
	await MetricTracker.track(new TotalPropertyValueMetric(database));

	await MetricTracker.track(new WorkUnemploymentMetric(database));
	await MetricTracker.track(new WorkOfferTotalMetric(database));
	await MetricTracker.track(new OpenWorkOfferMetric(database));

	await MetricTracker.track(new NewsArticleCountMetric(database));

	for (let type in CompanyType) {
		if (typeof CompanyType[type] == 'string') {
			await MetricTracker.track(new CompanyCountMetric(database, CompanyType[type]));
		}
	}

	await MetricTracker.track(new CompanyAssetTotalMetric(database));

	for (let borough of await database.borough.toArray()) {
		await MetricTracker.track(new BoroughAllocatedAreaMetric(database, borough));
		await MetricTracker.track(new BoroughResidentCountMetric(database, borough));
		await MetricTracker.track(new BoroughJobCountMetric(database, borough));
		await MetricTracker.track(new BoroughJobCapacityMetric(database, borough));
	}
};
