import { BoroughViewModel, MapService } from "../../managed/services";
import { MapLabel } from "../elements/label";
import { Map } from "../elements/map";
import { MapPolygon } from "../elements/polygon";
import { Point } from "../point";
import { Layer } from "./layer";

export class BoroughLayer extends Layer {
    order = 2;

    async load() {
        const boroughts = await new MapService().getBoroughs();

        for (let borough of boroughts) {
            const bounds = Point.unpack(borough.bounds);
            
            this.add(new MapPolygon(bounds, true, 'borough', borough.color));
        }

        for (let borough of boroughts) {
            const bounds = Point.unpack(borough.bounds);
        
            this.add(new MapLabel(borough.name, Point.center(bounds), 5))
        }
    }
}