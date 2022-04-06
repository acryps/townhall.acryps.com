import { Map } from "map/elements/map";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class DrawLayer extends Layer {
    order = Infinity;
    
    polygon = new MapPolygon([], '#0002', '#000', false, 0.5, 1);
    currentPosition: Point;

    constructor(map: Map) {
        super(map);

        this.add(this.polygon);
    }

    get points() {
        return this.polygon.points;
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
        this.polygon.points = this.polygon.points.filter(point => point != this.currentPosition);
        this.polygon.points.push(position);

        this.currentPosition = position;
        this.polygon.update();
    }
}