import { MapService } from "managed/services";
import { MapLabel } from "map/elements/label";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class WaterLayer extends Layer {
    order = 1;

    async load() {
        for (let waterBody of await new MapService().getWaterBodies()) {
            const points = Point.unpack(waterBody.bounds);

            this.add(new MapPolygon(points, true, 'water'));

            const path = waterBody.namePath ? Point.unpack(waterBody.namePath) : [Point.center(points)];

            if (path.length == 1) {
                this.add(new MapLabel(waterBody.name, path[0], 2));
            } else {
                let length = 0;

                for (let i = 1; i < path.length; i++) {
                    const first = path[i - 1];
                    const last = path[i];

                    length += Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);
                }

                const step = waterBody.name.length * 3 + 20;

                for (let i = (length % step) / 2; i < length; i += step) {
                    this.add(new MapLabel(waterBody.name, null, 2, path, 100 / length * i));
                }
            }
        }
    }
}