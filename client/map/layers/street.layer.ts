import { MapService } from "managed/services";
import { MapLabel } from "map/elements/label";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class StreetLayer extends Layer {
    order = 3;

    streetColor = '#ddd';

    async load() {
        const streets = await new MapService().getStreets();
        const squares = await new MapService().getSquares();

        for (let square of squares) {
            const bounds = Point.unpack(square.bounds);

            this.add(new MapPolygon(bounds, '#eee', this.streetColor, true, 0.6, 1))
        }

        for (let street of streets) {
            const path = Point.unpack(street.path);

            this.add(new MapPolygon(path, '#0000', this.streetColor, false, street.size - 0.4, 1));
        }

        for (let street of streets) {
            const path = Point.unpack(street.path);
            let length = 0;

            for (let i = 1; i < path.length; i++) {
                const first = path[i - 1];
                const last = path[i];

                length += Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);
            }

            const step = street.name.length * street.size * 0.5 + 5;

            for (let i = (length % step) / 2; i < length; i += step) {
                this.add(new MapLabel(street.name, null, street.size * 0.5, path, 100 / length * i));
            }
        }

        for (let square of squares) {
            const bounds = Point.unpack(square.bounds);

            this.add(new MapLabel(square.name, Point.center(bounds), 3));
        }
    }
}