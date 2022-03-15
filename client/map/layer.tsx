import { Map } from "./map";
import { Point } from "./point";

export class Layer {
    svg: SVGElement;
    path: SVGPathElement;

    static namespace = 'http://www.w3.org/2000/svg';

    constructor(
        public id: string,
        public points: Point[], 
        public color: string,
        public stroke: string,
        public close: boolean,
        public strokeWidth: number,
        public opacity: number,
        public clickAction?: Function
    ) {}

    render(map: Map) {
        this.svg = document.createElementNS(Layer.namespace, 'svg') as SVGElement;
        this.svg.setAttributeNS(null, 'viewBox', `${map.offset.x - 0.5} ${map.offset.y - 0.5} ${map.size} ${map.size}`);

        this.path = document.createElementNS(Layer.namespace, 'path') as SVGPathElement;
        this.update();

        this.svg.appendChild(this.path);

        return this.svg;
    }

    update() {
        this.path.setAttributeNS(null, 'stroke', this.stroke);
        this.path.setAttributeNS(null, 'stroke-width', this.strokeWidth.toString());
        this.path.setAttributeNS(null, 'opacity', this.opacity.toString());
        this.path.setAttributeNS(null, 'fill', this.color);
        this.path.setAttributeNS(null, 'd', `${this.points.map((point, index) => `${index ? "L" : "M"}${point.x} ${point.y}`)} ${this.close ? 'Z' : ''}`);

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