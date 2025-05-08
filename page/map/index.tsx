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
import { MapToolbarComponent } from "./toolbar";

export type DrawingType = 'closed-shape' | 'path' | 'any';

export class MapPage extends Component {
	declare parameters: { x, y, zoom };
	declare rootNode: HTMLElement;

	// scales zoom conversion (scale is a floating number, zoom a integer)
	//
	// 3 keeps a good balance between number length (usually max 2 characters) and accuracy
	readonly zoomAccuracy = 3;

	map = new MapComponent();
	toolbar = new MapToolbarComponent();

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

		if (this.child instanceof Action) {
			this.toolbar.action = child;
		} else {
			this.toolbar.action = null;
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
		});

		return <ui-map>
			{this.map}

			{this.toolbar}
		</ui-map>
	}

	completeDrawing() {
		const shape = this.map.drawer.complete();

		// backup if create would were to fail
		console.log('shape', Point.pack(shape));

		this.drawing.complete(shape);
		this.toolbar.update();
	}

	draw(action: string, type: DrawingType = 'closed-shape') {
		return new Promise<Point[]>(done => {
			this.drawing = {
				type,
				name: action,
				complete: shape => done(shape)
			}

			this.map.enableDrawing();
			this.toolbar.update();
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
