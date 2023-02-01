import { Layer } from "../layers/layer";
import { MapComponent } from "../map.component";
import { Point } from "../point";
import { MapElement } from "./element";
import { MapPolygon } from "./polygon";

export class MapLabel implements MapElement {
    boundingBox: DOMRect;
    element: SVGTextElement;
    shadow: SVGTextElement;
    pathPolygon: MapPolygon;

    id = Math.random();

    maxSize?: { x: number, y: number };
  
    constructor(
      public content: string,
      public position: Point,
      public size: number = 2,
      public path?: Point[],
      public pathDistance?: number
    ) {
        this.element = document.createElementNS(Layer.namespace, 'text') as SVGTextElement;

        this.element.setAttributeNS(null, 'dominant-baseline', 'central');
        this.element.setAttributeNS(null, 'text-anchor', 'middle');

        if (this.path) {
            if (this.path[0].x > this.path[this.path.length - 1].x) {
                this.path = [...this.path].reverse();
            }

            this.pathPolygon = new MapPolygon(this.path, false, null);
            this.pathPolygon.update();

            const id = `p_${Math.random().toString(36).substring(2)}`;
            this.pathPolygon.path.setAttributeNS(null, 'id', id);

            const textPath = document.createElementNS(Layer.namespace, 'textPath');
            textPath.setAttributeNS(null, 'href', '#' + id);
            textPath.setAttributeNS(null, 'startOffset', pathDistance + '%');

            textPath.textContent = this.content;

            this.element.appendChild(textPath);
        } else {
            this.element.setAttributeNS(null, 'x', this.position.x);
            this.element.setAttributeNS(null, 'y', this.position.y);

            this.element.textContent = this.content;
        }

        this.shadow = document.createElementNS(Layer.namespace, 'text') as SVGTextElement;
        this.shadow.setAttributeNS(null, 'stroke', '#fff');
        this.shadow.innerHTML = this.element.innerHTML;

        for (let attribute of this.element.attributes) {
            this.shadow.setAttributeNS(null, attribute.name, attribute.value);
        }
    }

    append(container: SVGElement) {
        container.appendChild(this.shadow);
        container.appendChild(this.element);

        if (this.path) {
            container.querySelector('defs').appendChild(this.pathPolygon.path);
        }
    }

    resize(zoom: number) {
        this.element.setAttributeNS(null, 'font-size', `${this.size * 8 / zoom}px`);
        this.shadow.setAttributeNS(null, 'font-size', `${this.size * 8 / zoom}px`);
    }

    update() {}
}