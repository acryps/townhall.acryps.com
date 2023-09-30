import { MapService, PropertyTypeViewModel } from "../../managed/services";
import { MapLabel } from "../elements/label";
import { MapPolygon } from "../elements/polygon";
import { Point } from "../point";
import { Layer } from "./layer";

export class PropertyLayer extends Layer {
    order = 4;

    async load() {
        const properties = await new MapService().getProperties();

        for (let property of properties) {
            const bounds = Point.unpack(property.bounds);

            const polygon = new MapPolygon(bounds, true, 'property', property.type?.color, () => {
                open(`/property/${property.id}`);
            });

            if (!property.borough) {
                polygon.path.setAttribute('ui-issue', '');
            }

            if (property.historicListingGrade) {
                polygon.path.setAttribute('ui-historically-listed', '');
            }

            this.add(polygon);
        }

        for (let property of properties) {
            const bounds = Point.unpack(property.bounds);

            let label = [];

            if (property.historicListingGrade) {
                label.push(property.historicListingGrade.grade);
            }
            
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