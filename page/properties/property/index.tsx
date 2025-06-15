import { Application } from "../../index";
import { BoroughSummaryModel, BoroughViewModel, BuildingSummaryModel, HistoricListingGradeViewModel, HistoricListingModifierViewModel, HistoricListingService, MapService, PlotBoundarySummaryModel, PropertyService, PropertyTypeViewModel, PropertyViewModel } from "../../managed/services";
import { Component } from "@acryps/page";
import { MapComponent } from "../../shared/map";
import { PackedPoint, PackedPointArray, Point } from "../../../interface/point";
import { toSimulatedAge } from "../../../interface/time";
import { addIcon, captureIcon, deleteIcon, drawIcon, lawIcon } from "../../assets/icons/managed";
import { MetaGovernmentBuilding, MetaPlace } from "@acryps/metadata";
import { ResidentBadgeListComponent } from "../../shared/resident-badge-list";
import { CompanyOfficePage } from "../../company-office";
import { convertToLegalCompanyName } from "../../../interface/company";
import { BoundaryComponent } from "./boundary";
import { LegalEntitySelectorComponent } from "../../shared/legal-entity/select";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { convertToCurrency } from "../../../interface/currency";
import { Tabs } from "../../shared/tabs";
import { GeneralPropertyTab } from "./general";
import { PropertyOwnershipStructureTab } from "./ownership-structure";
import { PropertyUsageTab } from "./usage";
import { PropertyHistoryTab } from "./history";
import { PropertyStationsTab } from "./stations";

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
					This plot has been archived {toSimulatedAge(this.property.deactivated)} years ago ({this.property.deactivated.toLocaleDateString()})
				</ui-deactivated>}

				{new Tabs()
					.addTab('General', () => new GeneralPropertyTab(this))
					.addItemTabs(
						this.property.trainStations,
						station => `Station ${station.name ?? ''}`.trim(),
						station => new PropertyStationsTab(this, station)
					)
					.addTab(`History (${this.property.historicListingGrade?.grade})`, () => new PropertyHistoryTab(this), this.property.historicListingGrade)
					.addTab('Usage', () => new PropertyUsageTab(this))
					.addTab('Ownership', () => new PropertyOwnershipStructureTab(this))
					.addTab('History', () => new PropertyHistoryTab(this), !this.property.historicListingGrade)
					.addTab('Capabilities', <ui-void></ui-void>)
				}
			</ui-content>}
		</ui-property>
	}
}
