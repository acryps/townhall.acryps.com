import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { PropertyService, StreetService } from "../managed/services";

export class EditRouteAction extends Action {
	declare parent: MapPage;
	declare parameters: { id };

	activate() {
		this.parent.draw('Save Route', 'path').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new StreetService().editRoute(this.parameters.id, Point.pack(shape));

		this.navigate(`/street/${this.parameters.id}`);
	}

	render() {
		return <ui-edit-street>
			Edit Street #{this.parameters.id}
		</ui-edit-street>
	}
}
