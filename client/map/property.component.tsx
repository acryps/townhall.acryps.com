import { MapService, PropertyViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";

export class PropertyComponent extends Component {
    params: { id: string };
    property: PropertyViewModel;

    async onload() {
        this.property = await new MapService().getProperty(this.params.id);
    }

    async onchange() {
        this.reload();
    }

    render() {
        return <ui-panel>
            <ui-id>{this.property.code ? `${this.property.borough.propertyPrefix}${this.property.code}` : this.property.id}</ui-id>

            <ui-block>
                {this.property.borough.name} {this.property.owner?.username}
            </ui-block>

            <ui-title>
                {this.property.name || `Plot ${this.property.borough.propertyPrefix}${this.property.code}`}
            </ui-title>
        </ui-panel>
    }
}