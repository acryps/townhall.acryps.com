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
import { itemContextIcon } from "../assets/icons/managed";

export class BoroughPage extends Component {
	declare parameters: { tag };

	borough: BoroughViewModel;

	residentCount: number;
	area: number;

	async onload() {
		this.borough = await new BoroughService().get(this.parameters.tag);

		new MetaPlace({
			name: this.borough.name,
			description: this.borough.description,
			url: location.href
		}).apply();

		this.residentCount = await new BoroughService().residentCount(this.borough.id);
		this.area = Point.area(Point.unpack(this.borough.bounds));
	}

	render() {
		return <ui-borough>
			{this.borough.banner && new BannerComponent(Banner.unpack(this.borough.banner))}

			<ui-name>
				{this.borough.name}
			</ui-name>

			{this.borough.incorporation && <ui-incorporation>
				Incorporated {this.borough.incorporation.toLocaleDateString()}
			</ui-incorporation>}

			{this.borough.district && <ui-district>
				{this.borough.district.name} legal district
			</ui-district>}

			<ui-description>
				{linkText(this.borough.description)}
			</ui-description>

			<ui-metrics>
				{new BoroughMetric(
					'Area',
					() => `${this.area.toLocaleString()}b²`
				)}

				{new BoroughMetric(
					'Residents',
					() => this.residentCount.toLocaleString()
				)}

				{new BoroughMetric(
					'Population Density',
					() => `${Math.floor((this.residentCount / (this.area / 1_000_000))).toLocaleString()}r/kb²`
				)}

				{this.borough.incorporation && new BoroughMetric(
					'Age',
					() => `${new Time(this.borough.incorporation).age()}y`
				)}

				{new BoroughMetric(
					'Offices',
					async () => (await new BoroughService().officeCount(this.borough.id)).toLocaleString()
				)}

				{new BoroughMetric(
					'Properties',
					async () => (await new BoroughService().propertyCount(this.borough.id)).toLocaleString()
				)}
			</ui-metrics>

			{new MapComponent().highlight(Point.unpack(this.borough.bounds))}

			<ui-actions>
				<ui-action ui-href={`/item-context/${this.borough.id}`}>
					{itemContextIcon()} View Context
				</ui-action>
			</ui-actions>
		</ui-borough>;
	}
}
