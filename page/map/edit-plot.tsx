import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { PropertyService } from "../managed/services";

export class EditPlotAction extends Action {
	declare parent: MapPage;
	declare parameters: { id };

	activate() {
		this.parent.draw('Save').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new PropertyService().editPlotBoundary(this.parameters.id, Point.pack(shape));

		this.navigate(`/property/${this.parameters.id}`);
	}

	renderPanel() {
		return <ui-edit-plot>
			Edit Plot #{this.parameters.id}
		</ui-edit-plot>
	}
}
