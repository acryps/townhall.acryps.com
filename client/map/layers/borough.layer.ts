import { BoroughViewModel, MapService } from "managed/services";
import { MapLabel } from "map/elements/label";
import { Map } from "map/elements/map";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class BoroughLayer extends Layer {
    order = 1;

    async load() {
        for (let borough of await new MapService().getBoroughs()) {
            const bounds = Point.unpack(borough.bounds);
            
            this.add(new MapPolygon(bounds, `${borough.color}30`, borough.color, true, 0.8, 1));
            this.add(new MapLabel(borough.name, Point.center(bounds), 5))
        }
    }
}