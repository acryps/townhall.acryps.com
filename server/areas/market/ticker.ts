import { ViewModel } from "vlserver";

export class LiveCommodityTickerModel {
	commodityId: string;

	askLow: number;
	askMedian: number;
	askHigh: number;
	askVolume: number;
	askCapitalization: number;

	bidLow: number;
	bidMedian: number;
	bidHigh: number;
	bidVolume: number;
	bidCapitalization: number;
}

export class LiveCommodityTickerResponseModel extends ViewModel<LiveCommodityTickerModel> {
	commodityId;

	askLow;
	askMedian;
	askHigh;
	askVolume;
	askCapitalization;

	bidLow;
	bidMedian;
	bidHigh;
	bidVolume;
	bidCapitalization;
}
