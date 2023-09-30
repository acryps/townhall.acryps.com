import { MapService } from "../../managed/services";
import { MapLabel } from "../elements/label";
import { MapPolygon } from "../elements/polygon";
import { Point } from "../point";
import { Layer } from "./layer";

export class StreetLayer extends Layer {
    order = 3;

    async load() {
        const streets = await new MapService().getStreets();
        const squares = await new MapService().getSquares();

        for (let street of streets) {
            for (let bridge of street.bridges) {
                const path = Point.unpack(bridge.path);

                this.add(new MapPolygon(path, false, 'bridge', { size: street.size }));
                this.add(new MapLabel(bridge.name, Point.center(path), null, Point.unpack(street.path)));
            }
        }

        for (let street of streets) {
            const path = Point.unpack(street.path);

            this.add(new MapPolygon(path, false, 'street', { size: street.size }));
        }

        for (let square of squares) {
            const bounds = Point.unpack(square.bounds);

            this.add(new MapPolygon(bounds, false, 'square'))
        }

        for (let street of streets) {
            const path = Point.unpack(street.path);
            let length = 0;

            for (let i = 1; i < path.length; i++) {
                const first = path[i - 1];
                const last = path[i];

                length += Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);
            }

            const step = street.name.length * 1.5;

            for (let i = (length % step) / 2; i < length; i += step) {
                this.add(new MapLabel(street.name, null, 1, path, 100 / length * i));
            }
        }

        for (let square of squares) {
            const bounds = Point.unpack(square.bounds);

            this.add(new MapLabel(square.name, Point.center(bounds), 2));
        }
    }
}