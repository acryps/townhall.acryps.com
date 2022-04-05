import { Point } from "map/point";
import { MapElement } from "./element";
import { Layer } from "../layers/layer";

export class MapPolygon implements MapElement {
    path: SVGPathElement;

    constructor(
        public points: Point[], 
        public color: string,
        public stroke: string,
        public close: boolean,
        public strokeWidth: number,
        public opacity: number,
        public clickAction?: Function
    ) {
        this.path = document.createElementNS(Layer.namespace, 'path') as SVGPathElement;
    }

    append(parent: SVGElement) {
        parent.appendChild(this.path);
    }

    update() {
        this.path.setAttributeNS(null, 'stroke', this.stroke);
        this.path.setAttributeNS(null, 'stroke-width', this.strokeWidth.toString());
        this.path.setAttributeNS(null, 'opacity', this.opacity.toString());
        this.path.setAttributeNS(null, 'fill', this.color);

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