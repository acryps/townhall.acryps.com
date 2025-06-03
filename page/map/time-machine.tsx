import { Component } from "@acryps/page";
import { MapToolbarComponent } from "./toolbar";
import { MapLayer } from "../shared/map/layer";
import { timeMachineLayer } from "../shared/map/layers";
import { MapComponent } from "../shared/map";

export class TimeMachineComponent extends Component {
	declare parent: MapToolbarComponent;

	date = new Date();
	layer: MapLayer;

	debounce = setTimeout(() => { });
	taskId: any;

	constructor(
		private map: MapComponent
	) {
		super();
	}

	render() {
		this.updateMap();

		return <ui-time-machine>
			<ui-action ui-click={() => this.rewind(-30)}>
				-1m
			</ui-action>

			<ui-action ui-click={() => this.rewind(-1)}>
				-1d
			</ui-action>

			<input
				type='datetime-local'
				$ui-value={this.date}
				ui-change={() => this.updateMap()}
			/>

			<ui-action ui-click={() => this.rewind(1)}>
				+1d
			</ui-action>

			<ui-action ui-click={() => this.rewind(30)}>
				+1m
			</ui-action>
		</ui-time-machine>
	}

	rewind(offset: number) {
		this.date = new Date(+this.date + offset * 1000 * 60 * 60 * 24);

		this.update();
		this.updateMap();
	}

	updateMap() {
		clearTimeout(this.debounce);

		this.debounce = setTimeout(async () => {
			const task = this.taskId = Math.random();

			const updated = timeMachineLayer(this.date);
			await updated.update(this.map.center.floor(), this.map.width, this.map.height);

			if (task != this.taskId) {
				return;
			}

			if (this.layer) {
				this.map.layers.splice(this.map.layers.indexOf(this.layer), 1, updated);
			} else {
				this.map.layers.push(updated);
			}

			this.layer = updated;
			this.map.updateLayers();
		}, 500);
	}
}
