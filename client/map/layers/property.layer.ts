import { Application } from "main";
import { MapService, PropertyTypeViewModel } from "managed/services";
import { MapLabel } from "map/elements/label";
import { Map } from "map/elements/map";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class PropertyLayer extends Layer {
    order = 4;

    async load() {
        const properties = await new MapService().getProperties();

        for (let property of properties) {
            const bounds = Point.unpack(property.bounds);

            const polygon = new MapPolygon(bounds, true, 'property', property.type?.color, () => {
                open(`/#/property/${property.id}`);
            });

            if (!property.borough) {
                polygon.path.setAttribute('ui-issue', '');
            }

            this.add(polygon);
        }

        for (let property of properties) {
            const bounds = Point.unpack(property.bounds);

            let label = [];
            
            if (property.type) {
                label.push(property.type.code);
            }

            if (property.borough) {
                label.push(property.borough.propertyPrefix);
            }

            if (property.name) {
                label.push(property.name);
            }

            if (label.length) {
                this.add(new MapLabel(label.join(' '), Point.center(bounds), 1));
            }
        }
    }
}