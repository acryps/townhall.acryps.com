import { Component } from "@acryps/page";
import { MilitaryPage } from "..";
import { MiliatryService, MilitaryUnitSummaryModel, MilitaryUnitViewModel } from "../../managed/services";
import { BannerComponent } from "../../banner";
import { Banner } from "../../../interface/banner";
import { Time } from "../../../interface/time";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";

export class MilitaryUnitPage extends Component {
	declare parent: MilitaryPage;
	declare parameters: { id };

	unit: MilitaryUnitViewModel;

	army: MilitaryUnitSummaryModel;
	hierarchy: MilitaryUnitSummaryModel[];

	async onload() {
		this.unit = await new MiliatryService().getUnit(this.parameters.id);

		this.hierarchy = [];

		let parent: MilitaryUnitSummaryModel = this.unit;

		while (parent) {
			this.hierarchy.unshift(parent);

			this.army = parent;
			parent = this.parent.units.find(unit => unit.id == parent.parentId);
		}
	}

	render() {
		return <ui-unit>
			<ui-army>
				{this.army.name}
			</ui-army>

			{new BannerComponent(Banner.unpack(this.unit.banner))}

			<ui-code>
				{this.hierarchy.map(unit => unit.code).join('-')}
			</ui-code>

			<ui-name>
				{this.unit.name}
			</ui-name>

			<ui-description>
				{this.unit.description}
			</ui-description>

			{this.unit.created && <ui-date>
				Created {new Time(this.unit.created).toDateString()}
			</ui-date>}

			{this.unit.disbanded && <ui-date>
				Disbanded {new Time(this.unit.disbanded).toDateString()}
			</ui-date>}

			<ui-facilities>
				{this.unit.facilities.map(facility => <ui-facility ui-href={`/property/${facility.property.id}`}>
					{new MapComponent().highlight(Point.unpack(facility.property.activePlotBoundary.shape))}

					<ui-name>
						{facility.name ?? facility.property.name}
					</ui-name>
				</ui-facility>)}
			</ui-facilities>

			<ui-hierarchy>
				{this.parent.renderUnit(this.army, this.unit)}
			</ui-hierarchy>
		</ui-unit>
	}
}
