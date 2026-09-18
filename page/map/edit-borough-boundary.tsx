import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { BoroughService, BoroughViewModel } from "../managed/services";

export class EditBoroughBoundaryAction extends Action {
	declare parent: MapPage;
	declare parameters: { tag };

	borough: BoroughViewModel;

	async activate() {
		this.borough = await new BoroughService().get(this.parameters.tag);

		this.parent.draw('Save Boundary', 'closed-shape').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new BoroughService().editBoundary(this.borough.id, Point.pack(shape));

		this.navigate(`/borough/${this.parameters.tag}`);
	}

	renderPanel() {
		return <ui-edit-borough>
			Edit Boundary of #{this.parameters.tag}
		</ui-edit-borough>
	}
}
