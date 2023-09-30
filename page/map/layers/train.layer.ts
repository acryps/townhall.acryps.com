import { TrainService, TrainStopViewModel } from "../../managed/services";
import { MapLabel } from "../elements/label";
import { MapPolygon } from "../elements/polygon";
import { Point } from "../point";
import { Layer } from "./layer";

export class TrainLayer extends Layer {
    order = 8;

    async load() {
        const routes = await new TrainService().getRoutes();
        const stations = await new TrainService().getStations();

        for (let station of stations) {
            const stops: TrainStopViewModel[] = [];

            for (let route of routes) {
                for (let stop of route.stops) {
                    if (stop.stationId == station.id) {
                        stops.push(stop);
                    }
                }
            }

            const points = [
                Point.unpackSingle(station.position), 
                ...stops.map(stop => Point.unpackSingle(stop.trackPosition))
            ];

            this.add(new MapPolygon(Point.bounding(points, 3), true, 'train-station'));
        }

        for (let route of routes) {
            const path = Point.unpack(route.path);

            this.add(new MapPolygon(path, false, 'train-route', route.color));

            let length = 0;

            for (let i = 1; i < path.length; i++) {
                const first = path[i - 1];
                const last = path[i];

                length += Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);
            }

            const step = 10;

            for (let i = (length % step) / 2; i < length; i += step) {
                this.add(new MapLabel('→', null, 1, path, 100 / length * i));
            }
        }

        for (let route of routes) {
            for (let stop of route.stops) {
                const position = Point.unpackSingle(stop.trackPosition);

                this.add(new MapPolygon([
                    position.copy(-1, -1), 
                    position.copy(-1, 1), 
                    position.copy(1, 1), 
                    position.copy(1, -1)
                ], true, 'train-stop', route.color));
            }
        }

        for (let station of stations) {
            this.add(new MapLabel(station.name, Point.unpackSingle(station.position)));
        }
    }
}