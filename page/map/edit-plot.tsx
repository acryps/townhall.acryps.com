import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { MapService, PropertyService } from "../managed/services";

export class EditPlotAction extends Action {
	declare parent: MapPage;
	declare parameters: { id };

	async activate() {
		const property = await new MapService().getProperty(this.parameters.id);
		const activeBoundary = property.plotBoundaries.find(boundary => boundary.id == property.activePlotBoundaryId);

		this.parent.draw('Save', 'closed-shape', Point.unpack(activeBoundary.shape)).then(shape => this.complete(shape));
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
