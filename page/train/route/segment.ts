import { calculateDanwinstonShapePath } from "../../../interface/line";
import { Point } from "../../../interface/point";
import { TrainRouteViewModel, TrainStationViewModel, TrainStopViewModel } from "../../managed/services";

export class TrainRouteSegment {
	static split(
		route: TrainRouteViewModel,
		stations: TrainStationViewModel[]
	) {
		const path = calculateDanwinstonShapePath(Point.unpack(route.activePath.path), false);

		const segments = [];

		// find segments that the route actually passes
		let currentSegment;

		for (let pixelIndex = 0; pixelIndex < path.length; pixelIndex++) {
			const pixel = path[pixelIndex];
			const stop = this.findStop(pixel, route, stations);

			if (stop) {
				// insert 0 length track piece if two stations directly touch
				if (currentSegment instanceof TrainRouteStopSegment && currentSegment.stop != stop) {
					segments.push(new TrainRouteTrackSegment());
				}

				if (currentSegment?.stop != stop) {
					currentSegment = new TrainRouteStopSegment(stop, stations.find(station => station.id == stop.stationId));

					// sometimes the station is split by some off-boundary track segments
					// detect and merge into stop segment
					if (!route.looping) {
						const lastIndex = segments.findIndex(peer => peer.stop == stop);

						if (lastIndex != -1) {
							for (let previous of segments.splice(lastIndex, segments.length - lastIndex)) {
								currentSegment.path.push(...previous.path);
							}
						}
					}

					segments.push(currentSegment);
				}
			} else if (!(currentSegment instanceof TrainRouteTrackSegment)) {
				currentSegment = new TrainRouteTrackSegment();

				segments.push(currentSegment);
			}

			currentSegment.path.push(pixel);
		}

		// insert missing stops in between
		for (let stop of route.stops) {
			if (!stop.closed && !segments.find(segment => segment.stop == stop)) {
				const station = stations.find(station => station.id == stop.stationId);
				const center = Point.center(Point.unpack(station.property.activePlotBoundary.shape));

				const closest = segments
					.filter(segment => segment instanceof TrainRouteTrackSegment)
					.flatMap(segment => segment.path.map((pixel, index) => ({
						segment,
						index,
						pixel,
						distance: pixel.distance(center)
					})))
					.sort((a, b) => a.distance - b.distance)[0];

				const before = closest.segment.path.slice(0, closest.index);
				const after = closest.segment.path.slice(closest.index + 1);

				segments.splice(segments.indexOf(closest.segment), 1,
					new TrainRouteTrackSegment(before),
					new TrainRouteStopSegment(stop, station, [closest.pixel]),
					new TrainRouteTrackSegment(after)
				);
			}
		}

		// TODO merge multiple consecutive track segments into one

		if (segments[0] instanceof TrainRouteTrackSegment && segments[0].length == 0) {
			segments.splice(0, 1);
		}

		if (segments[segments.length - 1] instanceof TrainRouteTrackSegment && segments[segments.length - 1].length == 0) {
			segments.splice(-1, 1);
		}

		return segments;
	}

	static findStop(pixel: Point, route: TrainRouteViewModel, stations: TrainStationViewModel[]) {
		for (let stop of route.stops) {
			if (!stop.closed) {
				const station = stations.find(station => station.id == stop.stationId);
				const bounds = Point.unpack(station.property.activePlotBoundary.shape);

				if (Point.contains(bounds, pixel)) {
					return stop;
				}
			}
		}
	}

	constructor(
		public path: Point[] = []
	) {}

	get length() {
		return this.path.length;
	}

	get center() {
		return this.path[Math.floor(this.path.length / 2)];
	}
}

export class TrainRouteTrackSegment extends TrainRouteSegment {

}

export class TrainRouteStopSegment extends TrainRouteSegment {
	constructor(
		public stop: TrainStopViewModel,
		public station: TrainStationViewModel,

		path: Point[] = []
	) {
		super(path);
	}
}
