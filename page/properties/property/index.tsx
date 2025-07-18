import { MapService, PlotBoundarySummaryModel, PropertyViewModel } from "../../managed/services";
import { Component } from "@acryps/page";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";
import { Time } from "../../../interface/time";
import { MetaPlace } from "@acryps/metadata";
import { Tabs } from "../../shared/tabs";
import { GeneralPropertyTab } from "./general";
import { PropertyOwnershipStructureTab } from "./ownership-structure";
import { PropertyUsageTab } from "./usage";
import { PropertyHistoryTab } from "./history";
import { PropertyStationsTab } from "./stations";
import { PropertyCapabilitiesTab } from "./capabilities";
import { PropertyMilitaryTab } from "./military";

export class PropertyPage extends Component {
	declare parameters: { id: string };

	property: PropertyViewModel;
	activePlotBoundary: PlotBoundarySummaryModel;

	async onload() {
		this.property = await new MapService().getProperty(this.parameters.id);
		this.activePlotBoundary = this.property.plotBoundaries.find(boundary => boundary.id == this.property.activePlotBoundaryId);

		const points = Point.unpack(this.activePlotBoundary.shape);
		const center = Point.center(points);

		new MetaPlace({
			name: this.property.name ?? `Property ${this.property.id.split('-')[0]}`,
			address: `${this.property.borough?.name} ${Math.floor(center.x)} ${Math.floor(center.y)}`,
			url: location.href
		}).apply();
	}

	render(child) {
		return <ui-property>
			<ui-name>
				{this.property.name || `Property #${this.property.id.substring(0, 8)}`}
			</ui-name>

			{child ?? <ui-content>
				{new MapComponent().highlight(Point.unpack(this.activePlotBoundary.shape))}

				{this.property.deactivated && <ui-deactivated>
					This plot has been archived {new Time(this.property.deactivated).age()} years ago ({this.property.deactivated.toLocaleDateString()})
				</ui-deactivated>}

				{new Tabs()
					.addTab('General', () => new GeneralPropertyTab(this))
					.addItemTabs(
						this.property.trainStations,
						station => `Station ${station.name ?? ''}`.trim(),
						station => new PropertyStationsTab(this, station)
					)
					.addTab('Military', () => new PropertyMilitaryTab(this), this.property.militaryFacilities.length != 0)
					.addTab(`History (${this.property.historicListingGrade?.grade})`, () => new PropertyHistoryTab(this), this.property.historicListingGrade)
					.addTab(`Usage ${this.property.dwellings.length}/${this.property.offices.length}`, () => new PropertyUsageTab(this))
					.addTab('Ownership', () => new PropertyOwnershipStructureTab(this))
					.addTab('History', () => new PropertyHistoryTab(this), !this.property.historicListingGrade)
					.addTab('Capabilities', () => new PropertyCapabilitiesTab(this))
				}
			</ui-content>}
		</ui-property>
	}
}
