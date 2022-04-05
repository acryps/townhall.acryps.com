import { MapService } from "managed/services";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class PropertyLayer extends Layer {
    order = 3;

    async load() {
        for (let property of await new MapService().getProperties()) {
            this.add(new MapPolygon(Point.unpack(property.bounds), '#ff08', '#000', true, 0.8, 1, () => {
                console.log(property.id);
            }));
        }
    }
}