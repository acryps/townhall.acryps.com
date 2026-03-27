import { Component } from "@acryps/page";
import { BoroughService, BoroughViewModel } from "../managed/services";
import { linkText } from "../linked-text";
import { Time } from "../../interface/time";
import { BoroughMetric } from "./metric";
import { Point } from "../../interface/point";
import { MapComponent } from "../shared/map";

export class BoroughBoundaryTab extends Component {
	constructor(
		private borough: BoroughViewModel
	) {
		super();
	}

	render() {
		return <ui-boundary>
			{new MapComponent().highlight(Point.unpack(this.borough.bounds))}
		</ui-boundary>
	}
}
