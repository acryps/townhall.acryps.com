import { Component } from "@acryps/page";
import { BoroughService, BoroughViewModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { MapPreviewComponent } from "../shared/map.preview";
import { linkText } from "../linked-text";
import { Point } from "../../interface/../interface/point";
import { MetaPlace } from "@acryps/metadata";

export class BoroughPage extends Component {
	declare parameters: { tag };

	borough: BoroughViewModel;

	async onload() {
		this.borough = await new BoroughService().get(this.parameters.tag);

		new MetaPlace({
			name: this.borough.name,
			description: this.borough.description,
			url: location.href
		}).apply();
	}

	render() {
		return <ui-borough>
			{this.borough.banner && BannerComponent.unpack(this.borough.banner)}

			<ui-name>
				{this.borough.name}
			</ui-name>

			{this.borough.incorporation && <ui-incorporation>
				Incorporated {this.borough.incorporation.toLocaleDateString()}
			</ui-incorporation>}

			<ui-description>
				{linkText(this.borough.description)}
			</ui-description>

			{new MapPreviewComponent(Point.unpack(this.borough.bounds))}
		</ui-borough>;
	}
}
