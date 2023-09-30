import { Map } from "../elements/map";
import { Point } from "../point";
import { MapElement } from "../elements/element";
import { MapComponent } from "map/map.component";

export class Layer {
	order: number;

	container: SVGElement;

	static namespace = 'http://www.w3.org/2000/svg';

	elements: MapElement[] = [];

	constructor(
		public map: Map, 
		public component: MapComponent
	) {
		this.container = document.createElementNS(Layer.namespace, 'svg') as SVGElement;
		this.container.setAttributeNS(null, 'viewBox', `${map.offset.x - 0.5} ${map.offset.y - 0.5} ${map.size} ${map.size}`);

		this.container.appendChild(document.createElementNS(Layer.namespace, 'defs'));
	}

	async load() {}

	add(element: MapElement) {
		element.update();
		element.append(this.container);

		this.elements.push(element);
	}

	update() {
		for (let element of this.elements) {
			element.update();
		}
	}

	resize(zoom: number) {
		for (let element of this.elements) {
			if (element.resize) {
				element.resize(zoom);
			}
		}
	}
}