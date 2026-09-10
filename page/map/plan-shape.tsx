import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { PlanService, PropertyService } from "../managed/services";
import { MapLayer } from "../shared/map/layer";
import { planLayer } from "../shared/map/layers";
import { planIcon } from "../assets/icons/managed";

export class PlanShapeAction extends Action {
	declare parent: MapPage;
	declare parameters: { tag };

	existingShapesLayer: MapLayer;

	activate() {
		this.parent.draw('Save', 'any').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new PlanService().addShape(this.parameters.tag, Point.pack(shape));

		this.navigate(`/plan/${this.parameters.tag}`);
	}

	toggleExistingShapes() {
		if (this.existingShapesLayer) {
			this.parent.map.layers.splice(this.parent.map.layers.indexOf(this.existingShapesLayer), 1);
			this.existingShapesLayer = null;
		} else {
			this.existingShapesLayer = planLayer(this.parameters.tag);
			this.existingShapesLayer.alpha = 0.8;

			this.parent.map.layers.push(this.existingShapesLayer);
		}

		this.parent.map.updateLayers();
	}

	renderPanel() {
		return <ui-plan-shape>
			<ui-action ui-active={!!this.existingShapesLayer} ui-click={() => this.toggleExistingShapes()}>
				{planIcon()} Show Existing Shapes
			</ui-action>
		</ui-plan-shape>;
	}
}
