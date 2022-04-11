import { Application } from "main";
import { MapService, PropertyTypeViewModel } from "managed/services";
import { MapLabel } from "map/elements/label";
import { Map } from "map/elements/map";
import { MapPolygon } from "map/elements/polygon";
import { Point } from "map/point";
import { Layer } from "./layer";

export class PropertyLayer extends Layer {
    order = 4;

    activeType: PropertyTypeViewModel;

    async load() {
        const properties = await new MapService().getProperties();

        for (let property of properties) {
            const bounds = Point.unpack(property.bounds);

            const polygon = new MapPolygon(bounds, `${property.type?.color || '#ffffff'}cc`, '#000', true, 0.8, 1, () => {
                console.log(property.id);

                if (this.activeType) {
                    property.type = this.activeType;
                    polygon.color = property.type.color;

                    new MapService().saveProperty(property);
                    
                    this.update();
                } else {
                    this.component.navigate(`property/${property.id}`);
                }
            });

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
            } else {
                label.push('?B');
            }

            if (label.length) {
                this.add(new MapLabel(label.join(' '), Point.topLeft(bounds).copy(1, 1), 1));
            }
        }
    }
}