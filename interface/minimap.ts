import { BoroughSummaryModel } from "./models";
import { Point } from "./point";

// general scale of the minimap
export const minimapScale = 1 / 5;

// relative margin
//
// map will be object-fitted in cover mode
const margin = 0.5;

export const getMinimapBounds = (boroughs: BoroughSummaryModel[]) => {
	const boroughBounds: Point[] = [];

	for (let borough of boroughs) {
		if (borough.district?.includeInMinimap) {
			boroughBounds.push(...Point.unpack(borough.bounds));
		}
	}

	const size = Point.size(boroughBounds).max;

	return Point.bounds(boroughBounds, size * margin);
}
