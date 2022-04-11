import { Map } from "map/elements/map";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class DrawLayer extends Layer {
    order = Infinity;
    
    polygon = new MapPolygon([], '#0002', '#000', false, 0.5, 1);
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
            this.polygon.stroke = '#000';
        } else {
            this.polygon.stroke = '#f00';
        }

        this.polygon.update();
    }
}