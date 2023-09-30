import { Map } from "../elements/map";
import { MapPolygon } from "../elements/polygon";
import { Point } from "../point";
import { Layer } from "./layer";

export class DrawLayer extends Layer {
    order = Infinity;
    
    polygon = new MapPolygon([], false, 'draw');
    currentPosition: Point;

    async load() {
        this.add(this.polygon);
    }

    get points() {
        return this.polygon.points.filter(point => point != this.currentPosition);
    }

    append(point: Point) {
        this.polygon.points.push(point);
        this.polygon.update();
    }

    reset() {
        this.polygon.points = [];
        this.polygon.update();
    }

    showCurrentPosition(position: Point) {
        this.polygon.points = this.points;
        this.polygon.points.push(position);

        this.currentPosition = position;

        let isStraight = false;

        if (this.polygon.points.length > 2) {
            const last = this.polygon.points[this.polygon.points.length - 2];

            if (this.currentPosition.x == last.x || this.currentPosition.y == last.y) {
                isStraight = true;
            } 

            if (Math.abs(this.currentPosition.x - last.x) - Math.abs(this.currentPosition.y - last.y) == 0) {
                isStraight = true;
            }
        }

        if (isStraight) {
            this.polygon.path.setAttribute('ui-straight', '');
        } else {
            this.polygon.path.removeAttribute('ui-straight');
        }

        this.polygon.update();
    }
}