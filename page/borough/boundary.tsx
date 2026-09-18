import { Component } from "@acryps/page";
import { BoroughBoundarySummaryModel, BoroughService, BoroughViewModel } from "../managed/services";
import { linkText } from "../linked-text";
import { Time } from "../../interface/time";
import { BoroughMetric } from "./metric";
import { Point } from "../../interface/point";
import { MapComponent } from "../shared/map";
import { BoundaryComponent } from "../properties/property/boundary";
import { drawIcon } from "../assets/icons/managed";

export class BoroughBoundaryTab extends Component {
	currentBoundary: BoroughBoundarySummaryModel;

	constructor(
		private borough: BoroughViewModel
	) {
		super();

		this.currentBoundary = this.borough.boundaries.find(boundary => boundary.id == this.borough.activeBoundaryId);
	}

	render() {
		const shape = Point.unpack(this.currentBoundary.shape);
		const center = Point.center(shape).floor();

		return <ui-boundary>
			{new MapComponent().highlight(shape)}

			<ui-boundaries>
				{this.borough.boundaries.map((boundary, index) => <ui-boundary ui-active={boundary.id == this.currentBoundary.id}>
					<ui-name>
						{boundary.changeComment ?? `Boundary #${boundary.id.split('-')[0]}`}
					</ui-name>

					{new BoundaryComponent(boundary.shape, this.borough.boundaries[index - 1]?.shape)}
				</ui-boundary>)}

				<ui-action ui-href={`/map/${center.x}/${center.y}/5/edit-borough-boundary/${this.borough.tag}`}>
					{drawIcon()} Edit Boundary
				</ui-action>
			</ui-boundaries>
		</ui-boundary>
	}
}
