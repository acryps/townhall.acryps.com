import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { SquareService, SquareViewModel } from "../managed/services";

export class EditSquareBoundaryAction extends Action {
	declare parent: MapPage;
	declare parameters: { tag };

	square: SquareViewModel;

	async activate() {
		this.square = await new SquareService().getSquare(this.parameters.tag);

		this.parent.draw('Save Boundary', 'closed-shape').then(shape => this.complete(shape));
	}

	async complete(shape: Point[]) {
		await new SquareService().editBoundary(this.square.id, Point.pack(shape));

		this.navigate(`/square/${this.parameters.tag}`);
	}

	renderPanel() {
		return <ui-edit-square>
			Edit Square #{this.parameters.tag}
		</ui-edit-square>
	}
}
