import { Component } from "@acryps/page";
import { Action } from "../../action";
import { MapPage } from "..";
import { Point } from "../../../interface/point";
import { MapLayer } from "../../shared/map/layer";
import { PropertyService, TrainRouteViewModel, TrainService } from "../../managed/services";
import { propertyLayer } from "../../shared/map/layers";
import { TrainRouteSegment } from "../../train/route/segment";
import { TrainRouteIconComponent } from "../../shared/train-route";

export class InsertTrainRouteStopAction extends Action {
	declare parameters: { code, segmentIndex };
	declare parent: MapPage;

	trainRoute: TrainRouteViewModel;
	segments: TrainRouteSegment[];
	segment: TrainRouteSegment;

	async activate() {
		this.trainRoute = await new TrainService().getRoute(this.parameters.code);
		const stations = await new TrainService().getStations();
		this.segments = TrainRouteSegment.split(this.trainRoute, stations);
		this.segment = this.segments[+this.parameters.segmentIndex];

		const propertyLayer = MapLayer.fromShapeSource((x, y) => `/tile/property/${x}/${y}`, 500, 'source-over', true, async property => {
			let station = stations.find(station => station.property.id == property.id);

			if (!station) {
				station = await new TrainService().registerStation(property.id);
			}

			await new TrainService().addStop(this.trainRoute.id, station.id);

			this.navigate(`/train/route/${this.trainRoute.code}`);
		});

		requestAnimationFrame(() => {
			this.parent.toolbar.toggleLayer(propertyLayer);

			this.parent.map.highlight(this.segment.path, false);
		});
	}

	renderPanel() {
		return <ui-insert-train-stop>
			Insert stop for {new TrainRouteIconComponent(this.trainRoute)} in segment #{this.segments.indexOf(this.segment)}.
		</ui-insert-train-stop>
	}
}
