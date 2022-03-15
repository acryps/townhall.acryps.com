import { Layer } from "./layer";
import { MapComponent } from "./map.component";
import { Point } from "./point";

export class Label {
    boundingBox: DOMRect;
    element: SVGTextElement;

    id = Math.random();

    maxSize?: { x: number, y: number };
  
    constructor(
      public parent: MapComponent,
      public content: string,
      public position: Point,
      public size: number = 2,
      public rotation: number = 0
    ) {
        this.element = document.createElementNS(Layer.namespace, 'text') as SVGTextElement;
        this.element.textContent = this.content;

        this.element.setAttributeNS(null, 'dominant-baseline', 'central');
        this.element.setAttributeNS(null, 'text-anchor', 'middle');

        this.element.setAttributeNS(null, 'transform', `translate(${this.position.x}, ${this.position.y}) rotate(${this.rotation / Math.PI * 180})`);

        this.parent.onZoom.push(() => this.resize());
        this.resize();
    }

    resize() {
        this.element.setAttributeNS(null, 'font-size', `${this.size * 8 / this.parent.zoom}px`);
        this.update();
    }
  
    update() {
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
        }
    }
}