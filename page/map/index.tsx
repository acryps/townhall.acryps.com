import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Application } from "..";
import { registerInteration } from "../shared/map/interaction";
import { Point } from "../../interface/point";
import { baseLayer, boroughLayer, movementHeatmapLayer, nightLayer, propertyLayer } from "../shared/map/layers";
import { MapLayer } from "../shared/map/layer";
import { boroughIcon, captureIcon, dayIcon, drawIcon, movementIcon, propertyRegisterIcon, residentIcon, streetIcon } from "../assets/icons/managed";

export class MapPage extends Component {
	declare parameters: { x, y, zoom };

	// scales zoom conversion (scale is a floating number, zoom a integer)
	//
	// 3 keeps a good balance between number length (usually max 2 characters) and accuracy
	readonly zoomAccuracy = 3;

	private map = new MapComponent();

	render() {
		this.map.show(new Point(+this.parameters.x, +this.parameters.y), 1 / ((+this.parameters.zoom / this.zoomAccuracy) ** 2));

		requestAnimationFrame(() => {
			registerInteration(this.map, point => {
				this.parameters.x = point.x.toFixed(0);
				this.parameters.y = point.y.toFixed(0);
			}, scale => {
				this.parameters.zoom = (Math.sqrt(1 / scale) * this.zoomAccuracy).toFixed(0);
			}, pick => {
				this.map.pick(pick);
			});
		});

		return <ui-map>
			{this.map}

			<ui-tools>
				<ui-layer ui-click={() => this.toggleLayer(baseLayer, nightLayer)}>
					{dayIcon()}
				</ui-layer>

				<ui-layers>
					<ui-layer ui-click={() => this.toggleLayer(boroughLayer)}>
						{boroughIcon()}
					</ui-layer>

					<ui-layer ui-click={() => this.toggleLayer(propertyLayer)}>
						{propertyRegisterIcon()}
					</ui-layer>

					<ui-layer ui-click={() => this.toggleLayer(propertyLayer)}>
						{streetIcon()}
					</ui-layer>
				</ui-layers>

				<ui-layers>
					<ui-layer ui-click={() => this.toggleLayer(movementHeatmapLayer)}>
						{movementIcon()}
					</ui-layer>

					<ui-layer ui-click={() => this.toggleLayer(propertyLayer)}>
						{residentIcon()}
					</ui-layer>
				</ui-layers>

				<ui-actions>
					<ui-action ui-click={async () => {
						const source = URL.createObjectURL(await this.map.capture());

						const link = document.createElement('a');
						link.download = `map-${Math.round(this.map.center.x)}-${Math.round(this.map.center.y)}.png`;
						link.href = source;

						link.click();
					}}>
						{captureIcon()}
					</ui-action>

					<ui-action>
						{drawIcon()}
					</ui-action>
				</ui-actions>
			</ui-tools>
		</ui-map>
	}

	toggleLayer(enable: MapLayer, disable?: MapLayer) {
		if (this.map.layers.includes(enable)) {
			this.map.layers.splice(this.map.layers.indexOf(enable), 1, disable);
		} else if (this.map.layers.includes(disable)) {
			this.map.layers.splice(this.map.layers.indexOf(disable), 1, enable);
		} else {
			this.map.layers.push(enable);
		}

		this.map.layers = this.map.layers.filter(layer => layer);
		this.map.updateLayers();
	}
}
