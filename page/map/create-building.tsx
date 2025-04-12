import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { MapService, PropertyService } from "../managed/services";
import { Point } from "../../interface/point";

export class CreateBuildingAction extends Action {
	declare parent: MapPage;
	declare parameters: { id };

	async activate() {
		const property = await new MapService().getProperty(this.parameters.id);
		const activePlotBoundary = property.plotBoundaries.find(boundary => boundary.id == property.activePlotBoundaryId);

		this.parent.map.highlight(Point.unpack(activePlotBoundary.shape));

		this.parent.draw('Add Building').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new PropertyService().createBuilding(this.parameters.id, Point.pack(shape));

		this.navigate(`/property/${this.parameters.id}`);
	}

	render() {
		return <ui-create-building>
			Create Building on #{this.parameters.id}
		</ui-create-building>
	}
}
