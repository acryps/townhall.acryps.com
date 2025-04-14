import { Component } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Application } from "..";
import { registerInteration } from "../shared/map/interaction";
import { Point } from "../../interface/point";
import { baseLayer, boroughLayer, movementHeatmapLayer, nightLayer, propertyLayer, propertyUsageLayer, streetLayer } from "../shared/map/layers";
import { MapLayer } from "../shared/map/layer";
import { addIcon, boroughIcon, captureIcon, chatIcon, dayIcon, drawIcon, movementIcon, propertyRegisterIcon, residentIcon, streetIcon } from "../assets/icons/managed";
import { Observable } from "@acryps/page-observable";
import { CreateFeaturePage } from "./create";
import { Action } from "../action";

export type DrawingType = 'closed-shape' | 'path' | 'any';

export class MapPage extends Component {
	declare parameters: { x, y, zoom };
	declare rootNode: HTMLElement;

	// scales zoom conversion (scale is a floating number, zoom a integer)
	//
	// 3 keeps a good balance between number length (usually max 2 characters) and accuracy
	readonly zoomAccuracy = 3;

	map = new MapComponent();

	keycode = new Map<string, MapLayer | [MapLayer, MapLayer]>()
		.set(' ', [baseLayer, nightLayer])
		.set('b', boroughLayer)
		.set('p', propertyLayer);

	drawing: {
		type: DrawingType,
		name: string,
		complete: (shape: Point[]) => void
	};

	render(child) {
		if (child && !(this.child instanceof Action)) {
			return <ui-map-child>
				{child}
			</ui-map-child>;
		}

		Application.setTitle(this.drawing?.name, 'Map');

		this.map.show(new Point(+this.parameters.x, +this.parameters.y), 1 / ((+this.parameters.zoom / this.zoomAccuracy) ** 2));

		requestAnimationFrame(() => {
			registerInteration(this.map, () => {
				this.updateParameters({
					x: this.map.cursor.x,
					y: this.map.cursor.y
				});
			}, scale => {
				this.updateParameters({
					zoom: (Math.sqrt(1 / scale) * this.zoomAccuracy).toFixed(0)
				});
			}, pick => {
				this.map.pick(pick);

				console.log(pick);
			});

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
		});

		return <ui-map>
			{this.map}

			<ui-tools>
				{this.map.drawing && <ui-actions>
					<ui-action ui-click={() => this.map.pushDrawingPoint()}>
						{addIcon()} Add Point
					</ui-action>

					{this.drawing.type == 'closed-shape' ? (
						this.map.drawingClosePossible.map(possible => possible ? <ui-action ui-click={() => this.completeDrawing()}>
							{addIcon()} {this.drawing.name}
						</ui-action> : <ui-action ui-disabled>
							{addIcon()} {this.drawing.name}
						</ui-action>)
					) : <ui-action ui-click={() => this.completeDrawing()}>
						{addIcon()} {this.drawing.name}
					</ui-action>}
				</ui-actions>}

				<ui-drawer>
					{child}

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

						<ui-action ui-click={async () => {
							if (this.map.drawing) {
								if (this.map.drawing.length) {
									if (confirm('Do you want to delete the current drawing?')) {
										this.map.completeDrawing();
									}
								}
							} else {
								const packed = Point.pack(await this.draw('Add Feature', 'any'));

								this.navigate(`create/${btoa(packed)}`);
							}
						}}>
							{drawIcon()}
						</ui-action>
					</ui-actions>
				</ui-drawer>
			</ui-tools>
		</ui-map>
	}

	completeDrawing() {
		const shape = this.map.completeDrawing();

		// backup if create would were to fail
		console.log('shape', Point.pack(shape));

		this.drawing.complete(shape);
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

	draw(action: string, type: DrawingType = 'closed-shape') {
		return new Promise<Point[]>(done => {
			this.drawing = {
				type,
				name: action,
				complete: shape => done(shape)
			}

			this.map.enableDrawing();
			this.update();
		});
	}

	updateParameters(changes: Partial<typeof this.parameters>) {
		this.parameters = {
			...this.parameters,
			...changes
		};

		history.replaceState(null, '', `/map/${this.parameters.x}/${this.parameters.y}/${this.parameters.zoom}`);
	}
}
