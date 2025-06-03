import { Component } from "@acryps/page";
import { MapPage } from ".";
import { addIcon, boroughIcon, captureIcon, dayIcon, deleteIcon, drawIcon, flipIcon, goIcon, movementIcon, priceIcon, propertyRegisterIcon, residentIcon, streetIcon, timeMachineIcon, trainIcon, undoIcon } from "../assets/icons/managed";
import { PackedPoint, Point } from "../../interface/point";
import { MapLayer } from "../shared/map/layer";
import { baseLayer, nightLayer, boroughLayer, propertyLayer, streetLayer, movementHeatmapLayer, propertyUsageLayer, propertyValueHeatmapLayer, trainRoutesLayer } from "../shared/map/layers";
import { BoroughSummaryModel } from "../managed/services";
import { Application } from "..";
import { activeBoroughColor, activeBoroughContrast } from "./index.style";
import { hex } from "@acryps/style";
import { Action } from "../action";
import { TimeMachineComponent } from "./time-machine";

export class MapToolbarComponent extends Component {
	declare parent: MapPage;
	declare rootNode: HTMLElement;

	action: Node;

	renderedLocations = new Map<string, BoroughSummaryModel>;
	coordinateTracker: HTMLElement;
	boroughTracker: HTMLElement;

	timeMachine: TimeMachineComponent;

	keycode = new Map<string, MapLayer | [MapLayer, MapLayer]>()
			.set(' ', [baseLayer, nightLayer])
			.set('b', boroughLayer)
			.set('p', propertyLayer);

	render() {
		requestAnimationFrame(() => this.updateLocationIndicator());

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
				<ui-group>
					<ui-action ui-click={() => this.parent.map.pushDrawingPoint()}>
						{addIcon()} Add
					</ui-action>

					<ui-action ui-click={() => this.parent.map.popDrawingPoint()}>
						{undoIcon()}
					</ui-action>

					<ui-action ui-click={() => this.parent.map.flipDrawingDirection()}>
						{flipIcon()}
					</ui-action>
				</ui-group>

				{this.parent.drawing.type == 'closed-shape' ? (
					this.parent.map.drawer.closeable.map(possible => possible ? <ui-action ui-click={() => this.parent.completeDrawing()}>
						{this.parent.drawing.name} {goIcon()}
					</ui-action> : <ui-action ui-disabled>
						{this.parent.drawing.name} {goIcon()}
					</ui-action>)
				) : <ui-action ui-click={() => this.parent.completeDrawing()}>
					{this.parent.drawing.name} {goIcon()}
				</ui-action>}
			</ui-actions>}

			{this.timeMachine}

			<ui-location>
				{this.coordinateTracker = <ui-coordinates></ui-coordinates>}
				{this.boroughTracker = <ui-borough></ui-borough>}
			</ui-location>

			{(this.parent.child instanceof Action) && this.parent.child.renderPanel()}

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

					<ui-layer ui-click={() => this.toggleLayer(trainRoutesLayer)}>
						{trainIcon()}
					</ui-layer>
				</ui-layers>

				<ui-layers>
					<ui-layer ui-click={() => this.toggleLayer(propertyUsageLayer)}>
						{residentIcon()}
					</ui-layer>

					<ui-layer ui-click={() => this.toggleLayer(propertyValueHeatmapLayer)}>
						{priceIcon()}
					</ui-layer>

					<ui-layer ui-click={() => this.toggleTimeMachine()}>
						{timeMachineIcon()}
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
							const packed = Point.pack(await this.parent.draw('Finish', 'any'));

							this.navigate(`create/${btoa(packed)}`);
						}
					}}>
						{drawIcon()}
					</ui-action>
				</ui-actions>
			</ui-drawer>
		</ui-tools>
	}

	updateLocationIndicator() {
		const cursor = this.parent.map.cursor;
		const packed = cursor.pack();

		this.coordinateTracker.textContent = `${cursor.x} ${cursor.y}`;

		let activeBorough: BoroughSummaryModel;

		if (this.renderedLocations.has(packed)) {
			activeBorough = this.renderedLocations.get(packed);
		} else {
			activeBorough = this.getActiveBorough(packed, cursor);
			this.renderedLocations.set(packed, activeBorough);
		}

		if (activeBorough) {
			this.boroughTracker.textContent = activeBorough.name;
			this.rootNode.style.setProperty(activeBoroughColor.propertyName, activeBorough.color);
			this.rootNode.style.setProperty(activeBoroughContrast.propertyName, Application.contrastColor(activeBorough.color));
		} else {
			this.boroughTracker.textContent = '-';
			this.rootNode.style.removeProperty(activeBoroughColor.propertyName);
			this.rootNode.style.removeProperty(activeBoroughContrast.propertyName);
		}
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

	toggleTimeMachine() {
		if (this.timeMachine) {
			this.timeMachine = null;
		} else {
			this.timeMachine = new TimeMachineComponent(this.parent.map);
		}

		this.update();
	}

	getActiveBorough(packed: PackedPoint, cursor: Point) {
		for (let borough of Application.boroughs) {
			const bounds = Point.unpack(borough.bounds);

			if (Point.touches(cursor, new Point(1, 1), bounds)) {
				if (Point.fill(bounds).has(packed)) {
					return borough;
				}
			}
		}
	}
}
