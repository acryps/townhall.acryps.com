import { Application } from "main";
import { BoroughViewModel, MapService, PropertyTypeViewModel, PropertyViewModel } from "managed/services";
import { Point } from "map/point";
import { Component } from "node_modules/vldom/component";
import { MapPreviewComponent } from "shared/map.preview";

export class PropertyComponent extends Component {
    declare params: { id: string };

    property: PropertyViewModel;

    types: PropertyTypeViewModel[];
    boroughs: BoroughViewModel[];

    async onload() {
        this.property = await new MapService().getProperty(this.params.id);

        this.types = await new MapService().getPropertyTypes();
        this.boroughs = await new MapService().getBoroughs();
    }

    render() {
        const points = Point.unpack(this.property.bounds);
        const size = Point.size(points);
        
        return <ui-property>
            {new MapPreviewComponent(Point.unpack(this.property.bounds))}

            <ui-title>
                {this.property.name || `Plot ${this.property.id.substring(0, 8)}`}
            </ui-title>

            <ui-field>
                <label>Name</label>

                <input $ui-value={this.property.name} ui-change={() => new MapService().saveProperty(this.property)}></input>
            </ui-field>

            <ui-field>
                <label>Type</label>

                <select $ui-value={this.property.type} ui-change={() => new MapService().saveProperty(this.property)}>
                    {this.types.map(type => <option ui-value={type}>
                        {type.name} ({type.code.toUpperCase()})
                    </option>)}
                </select>
            </ui-field>

            <ui-field>
                <label>Borough</label>

                <select $ui-value={this.property.borough} ui-change={() => new MapService().saveProperty(this.property)}>
                    <option ui-value={null}>No borough assigned</option>

                    {this.boroughs.map(borough => <option ui-value={borough}>
                        {borough.name}
                    </option>)}
                </select>
            </ui-field>

            <ui-field>
                <label>Owner</label>

                <select $ui-value={this.property.owner} ui-change={() => new MapService().saveProperty(this.property)}>
                    <option ui-value={null}>Unclaimed</option>

                    {Application.players.map(player => <option ui-value={player}>
                        {player.username}
                    </option>)}
                </select>
            </ui-field>

            <ui-labeled-value>
                <ui-label>Size</ui-label>
                <ui-value>
                    {size.width} x {size.height}
                </ui-value>
            </ui-labeled-value>

            <ui-button ui-danger-outline ui-click={async () => {
                if (confirm('delete property?')) {
                    await new MapService().deleteProperty(this.property);

                    history.back();
                }
            }}>
                Delete Property
            </ui-button>
        </ui-property>
    }
}