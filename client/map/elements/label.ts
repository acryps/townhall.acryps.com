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
            this.pathPolygon = new MapPolygon(this.path, null, null, false, 0, 0);
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
        console.log(zoom)

        this.element.setAttributeNS(null, 'font-size', `${this.size * 8 / zoom}px`);
        this.shadow.setAttributeNS(null, 'font-size', `${this.size * 8 / zoom}px`);
    }
  
    update() {
        /*
        this.element.removeAttributeNS(null, 'ui-hidden');
        this.boundingBox = this.element.getBoundingClientRect();

        if (this.maxSize) {
            if (this.boundingBox.width > this.maxSize.x * this.parent.zoom || this.boundingBox.height > this.maxSize.y * this.parent.zoom) {
                this.element.setAttributeNS(null, 'ui-hidden', '');

                return;
            }
        }
  
        // intersect check
        for (let label of this.parent.labels) {
            if (label != this && label.boundingBox.top + label.boundingBox.height > this.boundingBox.top && label.boundingBox.left + label.boundingBox.width > this.boundingBox.left && label.boundingBox.bottom - label.boundingBox.height < this.boundingBox.bottom && label.boundingBox.right - this.boundingBox.width < this.boundingBox.right) {
                if (this.size == label.size ? this.id > label.id : this.size < label.size) {
                    this.element.setAttributeNS(null, 'ui-hidden', '');

                    return;
                }
            }
        }*/
    }
}