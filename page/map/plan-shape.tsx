import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { PlanService, PropertyService } from "../managed/services";

export class PlanShapeAction extends Action {
	declare parent: MapPage;
	declare parameters: { tag };

	activate() {
		this.parent.draw('Save', 'any').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new PlanService().addShape(this.parameters.tag, Point.pack(shape));

		this.navigate(`/plan/${this.parameters.tag}`);
	}
}
