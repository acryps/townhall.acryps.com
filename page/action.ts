import { Component, ComponentContent } from "@acryps/page";
import { Point } from "../interface/point";

export abstract class Action extends Component {
	async onload() {
		await this.activate();

		this.parent.update();
	}

	abstract activate();

	renderPanel(): ComponentContent {
		return [];
	};
}
