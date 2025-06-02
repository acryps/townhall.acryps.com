import { CompanyType, DbContext } from "../../managed/database";
import { MetricTracker } from "./tracker";
import { AllocatedAreaMetric } from "./tracker/allocated-area";
import { PopulationAgeAverageMetric } from "./tracker/average-age";
import { CompanyAssetTotalMetric } from "./tracker/company-asset-total";
import { CompanyCountMetric } from "./tracker/company-count";
import { DwellingCountMetric } from "./tracker/dwelling-count";
import { EmptyDwellingCountMetric } from "./tracker/empty-dwellings";
import { OpenWorkOfferMetric } from "./tracker/open-work-offer";
import { PlayerTraveledBlocksMetric } from "./tracker/player-traveled-blocks";
import { PopulationSizeMetric } from "./tracker/population-size";
import { PropertyCountMetric } from "./tracker/property-count";
import { RelationDistanceMetric } from "./tracker/relation-distance";
import { TotalPropertyValueMetric } from "./tracker/total-property-value";
import { WorkUnemploymentMetric } from "./tracker/unemployment";
import { WorkOfferTotalMetric } from "./tracker/work-offers";

export const registerMetrics = (database: DbContext) => {
	// order will be keept in client
	MetricTracker.track(new PopulationSizeMetric(database));
	MetricTracker.track(new PopulationAgeAverageMetric(database));
	MetricTracker.track(new RelationDistanceMetric(database));

	MetricTracker.track(new PlayerTraveledBlocksMetric(database));

	MetricTracker.track(new PropertyCountMetric(database));
	MetricTracker.track(new DwellingCountMetric(database));
	MetricTracker.track(new EmptyDwellingCountMetric(database));
	MetricTracker.track(new AllocatedAreaMetric(database));
	MetricTracker.track(new TotalPropertyValueMetric(database));

	MetricTracker.track(new WorkUnemploymentMetric(database));
	MetricTracker.track(new WorkOfferTotalMetric(database));
	MetricTracker.track(new OpenWorkOfferMetric(database));

	for (let type in CompanyType) {
		if (typeof CompanyType[type] == 'string') {
			MetricTracker.track(new CompanyCountMetric(database, CompanyType[type]));
		}
	}

	MetricTracker.track(new CompanyAssetTotalMetric(database));
};
