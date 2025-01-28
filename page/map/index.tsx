import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Application } from "..";
import { registerInteration } from "../shared/map/interaction";
import { Point } from "../../interface/point";
import { baseLayer, boroughLayer, movementHeatmapLayer, nightLayer, propertyLayer } from "../shared/map/layers";
import { MapLayer } from "../shared/map/layer";
import { addIcon, boroughIcon, captureIcon, chatIcon, dayIcon, drawIcon, movementIcon, propertyRegisterIcon, residentIcon, streetIcon } from "../assets/icons/managed";
import { Observable } from "@acryps/page-observable";

export class MapPage extends Component {
	declare parameters: { x, y, zoom };
	declare rootNode: HTMLElement;

	// scales zoom conversion (scale is a floating number, zoom a integer)
	//
	// 3 keeps a good balance between number length (usually max 2 characters) and accuracy
	readonly zoomAccuracy = 3;

	private map = new MapComponent();

	render(child) {
		if (child) {
			return <ui-map-child>
				{child}
			</ui-map-child>;
		}

		this.map.show(new Point(+this.parameters.x, +this.parameters.y), 1 / ((+this.parameters.zoom / this.zoomAccuracy) ** 2));

		requestAnimationFrame(() => {
			registerInteration(this.map, () => {
				this.parameters.x = this.map.cursor.x;
				this.parameters.y = this.map.cursor.y;
			}, scale => {
				this.parameters.zoom = (Math.sqrt(1 / scale) * this.zoomAccuracy).toFixed(0);
			}, pick => {
				this.map.pick(pick);
			});
		});

		return <ui-map>
			{this.map}

			<ui-map-marker />

			<ui-tools>
				{this.map.drawing && (this.map.drawingClosePossible.map(possible => possible ? <ui-action ui-click={() => {
					const shape = this.map.completeDrawing();
					const packed = Point.pack(shape);

					// backup if create would were to fail
					console.log('shape', packed);

					this.navigate(`create/${btoa(packed)}`);
				}}>
					{addIcon()} Add Feature
				</ui-action> : <ui-action ui-click={() => this.map.pushDrawingPoint()}>
					{addIcon()} Add Point
				</ui-action>))}

				<ui-drawer>
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
						<ui-action ui-active={!!this.map.drawing} ui-click={async () => {
							const source = await this.map.capture();
							const name = `map-${Math.round(this.map.center.x)}-${Math.round(this.map.center.y)}.png`;

							if (navigator.share) {
								navigator.share({
									title: `Map ${Math.round(this.map.center.x)} ${Math.round(this.map.center.y)}`,
									files: [
										new File([source], name, { type: 'image/png' })
									],
									url: location.href
								});
							} else {
								const link = document.createElement('a');
								link.download = name;
								link.href = URL.createObjectURL(source);

								link.click();
							}
						}}>
							{captureIcon()}
						</ui-action>

						<ui-action ui-click={() => {
							this.map.enableDrawing();
							this.update();
						}}>
							{drawIcon()}
						</ui-action>
					</ui-actions>
				</ui-drawer>
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
