import { ViewModel } from "vlserver";

export class LiveCommodityTickerModel {
	commodityId: string;

	askLow: number;
	askMedian: number;
	askHigh: number;
	askVolume: number;

	bidLow: number;
	bidMedian: number;
	bidHigh: number;
	bidVolume: number;
}

export class LiveCommodityTickerResponseModel extends ViewModel<LiveCommodityTickerModel> {
	commodityId;

	askLow;
	askMedian;
	askHigh;
	askVolume;

	bidLow;
	bidMedian;
	bidHigh;
	bidVolume;
}
