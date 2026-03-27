import { Component } from "@acryps/page";
import { BoroughService, BoroughViewModel } from "../managed/services";
import { linkText } from "../linked-text";
import { itemContextIcon, marketIcon } from "../assets/icons/managed";
import { Point } from "../../interface/point";
import { BoroughMetric } from "./metric";
import { Time } from "../../interface/time";

export class BoroughAboutTab extends Component {
	residentCount: number;
	area: number;

	constructor(
		private borough: BoroughViewModel
	) {
		super();
	}

	async onload() {
		this.residentCount = await new BoroughService().residentCount(this.borough.id);
		this.area = Point.area(Point.unpack(this.borough.bounds));
	}

	render() {
		return <ui-about>
			<ui-actions>
				<ui-action ui-href={`/market/entity/${this.borough.id}`}>
					{marketIcon()} Market
				</ui-action>

				<ui-action ui-href={`/item-context/${this.borough.id}`}>
					{itemContextIcon()} View Context
				</ui-action>
			</ui-actions>

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
		</ui-about>;
	}
}
