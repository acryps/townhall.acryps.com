import { MapService, PropertyViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";

export class PropertyComponent extends Component {
    params: { id };
    property: PropertyViewModel;

    async onload() {
        this.property = await new MapService().getProperty(this.params.id);
    }

    render() {
        return <ui-panel>
            <ui-panel-close ui-href="../..">✗</ui-panel-close>

            <ui-title>
                {this.property.name || `Plot ${this.property.borough.propertyPrefix}${this.property.code}`}
            </ui-title>

            <ui-labeled-value>
                <ui-label>Borough</ui-label>
                <ui-value>
                    {this.property.borough.name}
                </ui-value>
            </ui-labeled-value>

            {this.property.owner && <ui-labeled-value>
                <ui-label>Owner</ui-label>
                <ui-value>
                    {this.property.owner.username}
                </ui-value>
            </ui-labeled-value>}

            <ui-labeled-value>
                <ui-label>Property Code</ui-label>
                <ui-value>
                    {this.property.code ? `${this.property.borough.propertyPrefix}${this.property.code} (${this.property.borough.propertyPrefix})` : this.property.id}
                </ui-value>
            </ui-labeled-value>
        </ui-panel>;
    }
}