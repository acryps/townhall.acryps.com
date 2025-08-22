import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { MapService, PropertyService, WaterBodyService, WaterBodyViewModel } from "../managed/services";
import { Point } from "../../interface/point";
import { waterBoundaryLayer } from "../shared/map/layers";

export class CreateWaterBodyAction extends Action {
	declare parent: MapPage;
	declare parameters: { tag };

	waterBody: WaterBodyViewModel;

	async activate() {
		this.waterBody = await new WaterBodyService().getWaterBody(this.parameters.tag);

		this.parent.toolbar.toggleLayer(waterBoundaryLayer);
		this.parent.draw('Add Water Body').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new WaterBodyService().addArea(this.waterBody.id, Point.pack(shape));

		this.navigate(`/water/body/${this.waterBody.tag}`);
	}

	renderPanel() {
		return <ui-create-building>
			Add area to water body #{this.parameters.tag}
		</ui-create-building>
	}
}
