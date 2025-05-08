import { Component } from "@acryps/page";
import { MapPage } from ".";
import { addIcon, boroughIcon, captureIcon, dayIcon, drawIcon, movementIcon, propertyRegisterIcon, residentIcon, streetIcon } from "../assets/icons/managed";
import { Point } from "../../interface/point";
import { MapLayer } from "../shared/map/layer";
import { baseLayer, nightLayer, boroughLayer, propertyLayer, streetLayer, movementHeatmapLayer, propertyUsageLayer } from "../shared/map/layers";

export class MapToolbarComponent extends Component {
	declare parent: MapPage;

	action: Node;

	keycode = new Map<string, MapLayer | [MapLayer, MapLayer]>()
			.set(' ', [baseLayer, nightLayer])
			.set('b', boroughLayer)
			.set('p', propertyLayer);

	render() {
		onkeypress = event => {
			const layer = this.keycode.get(event.key);

			if (layer) {
				if (Array.isArray(layer)) {
					this.toggleLayer(layer[0], layer[1]);
				} else {
					this.toggleLayer(layer);
				}
			}
		};

		return <ui-tools>
			{this.parent.map.drawer && <ui-actions>
				<ui-action ui-click={() => this.parent.map.pushDrawingPoint()}>
					{addIcon()} Add Point
				</ui-action>

				{this.parent.drawing.type == 'closed-shape' ? (
					this.parent.map.drawer.closeable.map(possible => possible ? <ui-action ui-click={() => this.parent.completeDrawing()}>
						{addIcon()} {this.parent.drawing.name}
					</ui-action> : <ui-action ui-disabled>
						{addIcon()} {this.parent.drawing.name}
					</ui-action>)
				) : <ui-action ui-click={() => this.parent.completeDrawing()}>
					{addIcon()} {this.parent.drawing.name}
				</ui-action>}
			</ui-actions>}

			<ui-drawer>
				{this.action}

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

					<ui-layer ui-click={() => this.toggleLayer(streetLayer)}>
						{streetIcon()}
					</ui-layer>
				</ui-layers>

				<ui-layers>
					<ui-layer ui-click={() => this.toggleLayer(movementHeatmapLayer)}>
						{movementIcon()}
					</ui-layer>

					<ui-layer ui-click={() => this.toggleLayer(propertyUsageLayer)}>
						{residentIcon()}
					</ui-layer>
				</ui-layers>

				<ui-actions>
					<ui-action ui-active={!!this.parent.map.drawer} ui-click={async () => {
						const source = await this.parent.map.capture();
						const name = `map-${Math.round(this.parent.map.center.x)}-${Math.round(this.parent.map.center.y)}.png`;

						if (navigator.share) {
							navigator.share({
								title: `Map ${Math.round(this.parent.map.center.x)} ${Math.round(this.parent.map.center.y)}`,
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

					<ui-action ui-click={async () => {
						if (this.parent.map.drawer) {
							if (this.parent.map.drawer.shape.length) {
								if (confirm('Do you want to delete the current drawing?')) {
									this.parent.map.drawer.complete();
								}
							} else {
								this.parent.map.drawer.complete();
							}
						} else {
							const packed = Point.pack(await this.parent.draw('Add Feature', 'any'));

							this.navigate(`create/${btoa(packed)}`);
						}
					}}>
						{drawIcon()}
					</ui-action>
				</ui-actions>
			</ui-drawer>
		</ui-tools>
	}

	toggleLayer(enable: MapLayer, disable?: MapLayer) {
		if (this.parent.map.layers.includes(enable)) {
			this.parent.map.layers.splice(this.parent.map.layers.indexOf(enable), 1, disable);
		} else if (this.parent.map.layers.includes(disable)) {
			this.parent.map.layers.splice(this.parent.map.layers.indexOf(disable), 1, enable);
		} else {
			this.parent.map.layers.push(enable);
		}

		this.parent.map.layers = this.parent.map.layers.filter(layer => layer);
		this.parent.map.updateLayers();
	}
}
