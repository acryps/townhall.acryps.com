import { calculateDanwinstonShapePath } from "../../interface/line";
import { Point } from "../../interface/point";
import { DbContext, TrainRoute, TrainStop } from "../managed/database";

export interface OrderedRouteStop {
	stop: TrainStop;
	position: number;
}

// walks the route's drawn path pixel by pixel - the same technique used to render routes on the
// map (see page/train/route/segment.ts) - to find the order stops are actually visited in, and the
// real (curved) rail distance between them, instead of assuming a straight line between stations.
export async function orderRouteStops(
	database: DbContext,
	route: TrainRoute,
	pathPoints: Point[],
	stops: TrainStop[]
): Promise<{ ordered: OrderedRouteStop[], totalLength: number }> {
	const boundaryByStop = new Map<string, Point[]>();

	for (let stop of stops) {
		const station = await database.trainStation.find(stop.stationId);
		const property = station?.propertyId ? await database.property.find(station.propertyId) : null;
		const plotBoundary = property?.activePlotBoundaryId ? await database.plotBoundary.find(property.activePlotBoundaryId) : null;

		if (plotBoundary?.shape) {
			boundaryByStop.set(stop.id, Point.unpack(plotBoundary.shape));
		}
	}

	const findStop = (pixel: Point) => stops.find(stop => {
		const boundary = boundaryByStop.get(stop.id);

		return boundary && Point.contains(boundary, pixel);
	});

	const pixels = calculateDanwinstonShapePath(pathPoints, false);

	const position = [0];

	for (let i = 1; i < pixels.length; i++) {
		position.push(position[i - 1] + pixels[i - 1].distance(pixels[i]));
	}

	const totalLength = position[position.length - 1] ?? 0;

	const ordered: OrderedRouteStop[] = [];
	let previousStop: TrainStop = null;

	for (let i = 0; i < pixels.length; i++) {
		const stop = findStop(pixels[i]);

		if (stop && stop != previousStop) {
			ordered.push({ stop, position: position[i] });
		}

		previousStop = stop ?? previousStop;
	}

	// stops the drawn track never actually crosses - place them at their closest track pixel
	// (mirrors the fallback in page/train/route/segment.ts for stations placed off the drawn line)
	for (let stop of stops) {
		if (ordered.some(entry => entry.stop == stop)) {
			continue;
		}

		const boundary = boundaryByStop.get(stop.id);
		const center = boundary?.length ? Point.center(boundary) : null;

		if (!center || !pixels.length) {
			continue;
		}

		let closestIndex = 0;
		let closestDistance = Infinity;

		for (let i = 0; i < pixels.length; i++) {
			const distance = pixels[i].distance(center);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = i;
			}
		}

		ordered.push({ stop, position: position[closestIndex] });
	}

	ordered.sort((a, b) => a.position - b.position);

	return { ordered, totalLength };
}
