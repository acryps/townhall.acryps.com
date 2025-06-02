import { Component } from "@acryps/page";
import { Action } from "../../action";
import { MapPage } from "..";
import { Point } from "../../../interface/point";
import { MapLayer } from "../../shared/map/layer";
import { PropertyService, TrainRouteViewModel, TrainService } from "../../managed/services";
import { propertyLayer, trainRouteLayer } from "../../shared/map/layers";
import { TrainRouteSegment } from "../../train/route/segment";
import { TrainRouteIconComponent } from "../../shared/train-route";

export class EditTrainRouteAction extends Action {
	declare parameters: { code, segmentIndex };
	declare parent: MapPage;

	trainRoute: TrainRouteViewModel;
	segments: TrainRouteSegment[];
	segment: TrainRouteSegment;

	async activate() {
		this.trainRoute = await new TrainService().getRoute(this.parameters.code);

		this.parent.draw('Save', 'path', Point.unpack(this.trainRoute.activePath.path)).then(shape => this.complete(shape));

		// TODO add support to edit a single segment
		/// const stations = await new TrainService().getStations();
		/// this.segments = TrainRouteSegment.split(this.trainRoute, stations);
		/// this.segment = this.segments[+this.parameters.segmentIndex];

		requestAnimationFrame(() => {
			this.parent.toolbar.toggleLayer(trainRouteLayer(this.parameters.code));
		});
	}

	async complete(shape: Point[]) {
		await new TrainService().saveRoutePath(this.trainRoute.id, Point.pack(shape));

		this.navigate(`/train/route/${this.parameters.code}`);
	}

	renderPanel() {
		return <ui-insert-train-stop>
			Insert stop for {new TrainRouteIconComponent(this.trainRoute)}
		</ui-insert-train-stop>
	}
}
