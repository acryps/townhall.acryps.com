import { Component } from "@acryps/page";
import { TrainRouteSummaryModel, TrainRouteViewModel } from "../../managed/services";
import { trainRouteColor, trainRouteTextColor } from "./index.style";
import { hex } from "@acryps/style";

export class TrainRouteIconComponent extends Component {
	constructor(
		private trainRoute: TrainRouteSummaryModel
	) {
		super();
	}

	render() {
		return <ui-train-route-icon ui-href={`/train/route/${this.trainRoute.code}`} style={[
			trainRouteColor.provide(hex(this.trainRoute.color)),
			trainRouteTextColor.provide(hex(this.trainRoute.textColor))
		].join(';')}>
			{this.trainRoute.code}
		</ui-train-route-icon>
	}
}
