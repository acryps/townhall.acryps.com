import { Component } from "@acryps/page";
import { BoroughService, BoroughViewModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { linkText } from "../linked-text";
import { Point } from "../../interface/../interface/point";
import { MetaPlace } from "@acryps/metadata";
import { MapComponent } from "../shared/map";
import { Banner } from "../../interface/banner";
import { BoroughMetric } from "./metric";
import { Time } from "../../interface/time";
import { itemContextIcon, mapIcon, marketIcon } from "../assets/icons/managed";
import { Tabs } from "../shared/tabs";
import { BoroughAboutTab } from "./about";
import { Application } from "..";
import { BoroughBoundaryTab } from "./boundary";
import { BoroughPropertiesTab } from "./properties";
import { BoroughOfficesTab } from "./offices";

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
			<ui-header>
				{this.borough.banner && new BannerComponent(Banner.unpack(this.borough.banner))}

				<ui-detail>
					<ui-name>
						{this.borough.name}
					</ui-name>

					{this.borough.incorporation && <ui-incorporation>
						Incorporated {this.borough.incorporation.toLocaleDateString()}
					</ui-incorporation>}

					{this.borough.district && <ui-district>
						{this.borough.district.name} legal district
					</ui-district>}
				</ui-detail>
			</ui-header>

			{new Tabs()
				.addTab('About', () => new BoroughAboutTab(this.borough))
				.addTab('Boundary', () => new BoroughBoundaryTab(this.borough))
				.addTab('Properties', () => new BoroughPropertiesTab(this.borough))
				.addTab('Companies', () => new BoroughOfficesTab(this.borough))
			}
		</ui-borough>;
	}
}
