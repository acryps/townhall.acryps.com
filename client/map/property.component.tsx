import { BoroughViewModel, MapService, PropertyTypeViewModel, PropertyViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";
import { Point } from "./point";

export class PropertyComponent extends Component {
    params: { id };

    property: PropertyViewModel;

    types: PropertyTypeViewModel[];
    boroughs: BoroughViewModel[];

    async onload() {
        this.property = await new MapService().getProperty(this.params.id);

        this.types = await new MapService().getPropertyTypes();
        this.boroughs = await new MapService().getBoroughs();
    }

    render() {
        const bounds = Point.unpack(this.property.bounds);
        const size = Point.size(bounds);

        return <ui-panel>
            <ui-panel-close ui-href="../..">✗</ui-panel-close>

            <ui-title>
                {this.property.name || `Plot ${this.property.id.substring(0, 8)}`}
            </ui-title>

            <ui-labeled-value>
                <ui-label>Type</ui-label>
                <ui-value>
                    <ui-field>
                        <select $ui-value={this.property.type} ui-change={() => new MapService().saveProperty(this.property)}>
                            {this.types.map(type => <option ui-value={type}>
                                {type.name} ({type.code.toUpperCase()})
                            </option>)}
                        </select>
                    </ui-field>
                </ui-value>
            </ui-labeled-value>

            <ui-labeled-value>
                <ui-label>Borough</ui-label>
                <ui-value>
                    <ui-field>
                        <select $ui-value={this.property.borough} ui-change={() => new MapService().saveProperty(this.property)}>
                            {this.boroughs.map(borough => <option ui-value={borough}>
                                {borough.name}
                            </option>)}
                        </select>
                    </ui-field>
                </ui-value>
            </ui-labeled-value>

            {this.property.owner && <ui-labeled-value>
                <ui-label>Owner</ui-label>
                <ui-value>
                    {this.property.owner.username}
                </ui-value>
            </ui-labeled-value>}

            <ui-labeled-value>
                <ui-label>Size</ui-label>
                <ui-value>
                    {size.width} x {size.height}
                </ui-value>
            </ui-labeled-value>
        </ui-panel>;
    }
}