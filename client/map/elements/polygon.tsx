import { Point } from "map/point";
import { MapElement } from "./element";
import { Layer } from "../layers/layer";

export class MapPolygon implements MapElement {
    path: SVGPathElement;

    constructor(
        public points: Point[], 
        public close: boolean,
        public style: string,
        public properties?: string | any,
        public clickAction?: Function
    ) {
        this.path = document.createElementNS(Layer.namespace, 'path') as SVGPathElement;
    }

    append(parent: SVGElement) {
        parent.appendChild(this.path);
    }

    update() {
        this.path.setAttributeNS(null, 'ui-style', this.style);

        if (this.properties) {
            if (typeof this.properties == 'object') {
                for (let key in this.properties) {
                    this.path.style.setProperty(`--${key}`, this.properties[key]);
                }
            } else {
                this.path.style.setProperty('--color', this.properties);
            }
        }

        if (this.points.length > 1) {
            this.path.setAttributeNS(null, 'd', `${this.points.map((point, index) => `${index ? "L" : "M"}${point.x} ${point.y}`)} ${this.close ? 'Z' : ''}`);
        } else {
            this.path.setAttributeNS(null, 'd', '');
        }

        if (this.clickAction) {
            this.path.onclick = this.path.ontouchend = () => {
                this.clickAction();
            };

            this.path.setAttributeNS(null, 'ui-clickable', '');
        } else {
            this.path.onclick = null;
            this.path.removeAttributeNS(null, 'ui-clickable');
        }
    }    
}