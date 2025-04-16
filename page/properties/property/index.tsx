import { Application } from "../../index";
import { BoroughViewModel, BuildingSummaryModel, HistoricListingGradeViewModel, HistoricListingModifierViewModel, HistoricListingService, MapService, PlotBoundarySummaryModel, PropertyService, PropertyTypeViewModel, PropertyViewModel } from "../../managed/services";
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

export class PropertyPage extends Component {
	declare parameters: { id: string };

	property: PropertyViewModel;

	types: PropertyTypeViewModel[];
	boroughs: BoroughViewModel[];
	grades: HistoricListingGradeViewModel[];
	modifiers: HistoricListingModifierViewModel[];

	activePlotBoundary: PlotBoundarySummaryModel;

	async onload() {
		this.property = await new MapService().getProperty(this.parameters.id);
		this.activePlotBoundary = this.property.plotBoundaries.find(boundary => boundary.id == this.property.activePlotBoundaryId);

		this.types = await new MapService().getPropertyTypes();
		this.boroughs = await new MapService().getBoroughs();

		this.grades = await new HistoricListingService().getGrades();
		this.modifiers = await new HistoricListingService().getModifiers();

		const points = Point.unpack(this.activePlotBoundary.shape);
		const center = Point.center(points);

		new MetaPlace({
			name: this.property.name ?? `Property ${this.property.id.split('-')[0]}`,
			address: `${this.property.borough?.name} ${Math.floor(center.x)} ${Math.floor(center.y)}`,
			url: location.href
		}).apply();
	}

	render(child) {
		const center = Point.center(Point.unpack(this.activePlotBoundary.shape));
		const activeBuildings = this.property.buildings.filter(building => !building.archived);

		return <ui-property>
			<ui-name>
				{this.property.name || `Property #${this.property.id.substring(0, 8)}`}
			</ui-name>

			{child ?? <ui-content>
				{new MapComponent().highlight(Point.unpack(this.activePlotBoundary.shape))}

				{this.property.deactivated && <ui-deactivated>
					This plot has been archived {toSimulatedAge(this.property.deactivated)} years ago ({this.property.deactivated.toLocaleDateString()})
				</ui-deactivated>}

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

				<ui-buildings>
					{this.property.buildings.map(building => <ui-building ui-href={`building/${building.id}`} ui-archived={!!building.archived}>
						<ui-name>
							{building.name ?? `Building #${building.id.split('-')[0]}`}
						</ui-name>

						{new BoundaryComponent(building.boundary)}
					</ui-building>)}

					{activeBuildings.length == 0 && <ui-action ui-click={() => this.copyBuilding(this.activePlotBoundary.shape)}>
						{addIcon()} Use Plot Boundary as building
					</ui-action>}

					<ui-action ui-href={`/map/${center.x}/${center.y}/5/create-building/${this.property.id}`}>
						{addIcon()} Create Building
					</ui-action>
				</ui-buildings>

				<ui-plot-boundaries>
					{this.property.plotBoundaries.map((boundary, index) => <ui-plot-boundary ui-active={boundary == this.activePlotBoundary}>
						<ui-comment>
							{boundary.changeComment ?? `Plot Boundary #${boundary.id.split('-')[0]}`}
						</ui-comment>

						{new BoundaryComponent(boundary.shape, this.property.plotBoundaries[index - 1]?.shape)}
					</ui-plot-boundary>)}

					<ui-action ui-href={`/map/${center.x}/${center.y}/5/edit-plot/${this.property.id}`}>
						{drawIcon()} Edit Plot Boundary
					</ui-action>
				</ui-plot-boundaries>

				<ui-dwellings>
					{this.property.dwellings.map(dwelling => <ui-dwelling>
						<ui-name>
							Dwelling #{dwelling.id.split('-')[0]}
						</ui-name>

						{dwelling.tenants.length ? new ResidentBadgeListComponent(dwelling.tenants.map(tenant => tenant.inhabitant)) : <ui-vacant>
							<ui-header>
								Vacant
							</ui-header>

							<ui-hint>
								Residents will move in automatically, but it might take some time.
							</ui-hint>
						</ui-vacant>}
					</ui-dwelling>)}

					<ui-action ui-click={async () => {
						this.property.dwellings.push(await new PropertyService().createDwelling(this.property.id));
						this.update();
					}}>
						{addIcon()} Create Dwelling
					</ui-action>
				</ui-dwellings>

				<ui-offices>
					{this.property.offices.map(office => <ui-office ui-href={`/company-office/office/${office.id}`}>
						<ui-company ui-href={`/company-office/company/${office.company.tag}`}>
							{convertToLegalCompanyName(office.company)}
						</ui-company>

						<ui-name>
							{office.name ?? office.id.split('-')[0]}
						</ui-name>
					</ui-office>)}

					<ui-action ui-href={`/company-office/register/${this.property.id}`}>
						{addIcon()} Create Company Here
					</ui-action>

					<ui-action ui-href={`/company-office/office/create/${this.property.id}`}>
						{addIcon()} Create Office for existing company
					</ui-action>
				</ui-offices>

				<ui-historic-listing>
					<ui-header>Historic Listing</ui-header>

					{this.property.historicListingRegisteredAt && <ui-date>
						This item was registered as a historic item at {this.property.historicListingRegisteredAt.toLocaleDateString()}
					</ui-date>}

					<ui-field>
						<label>Listing Grade</label>

						<select $ui-value={this.property.historicListingGrade} ui-change={async () => {
							await new HistoricListingService().addListing(this.property, this.property.historicListingGrade);

							this.update();
						}}>
							<option ui-value={null}>Not listed</option>

							{this.grades.map(grade => <option ui-value={grade}>
								{grade.grade} - {grade.name}
							</option>)}
						</select>

						{this.property.historicListingGrade && <ui-hint>
							{this.property.historicListingGrade.description}
						</ui-hint>}
					</ui-field>

					{this.property.historicListingGrade && this.modifiers.map(modifier => {
						const link = this.property.historicListingModifiers.find(source => source.historicListingModifier.id == modifier.id);
						let value = !!link;

						return <ui-modifier>
							<ui-field>
								<input type="checkbox" $ui-value={value} ui-change={async value => {
									if (value) {
										this.property.historicListingModifiers.push(await new HistoricListingService().addModifier(this.property.id, modifier.id));
									} else {
										this.property.historicListingModifiers = this.property.historicListingModifiers.filter(existing => existing != link);

										await new HistoricListingService().removeModifier(link.id);
									}

									this.update();
								}}></input>

								<label>{modifier.name}</label>
							</ui-field>

							<ui-grade>
								{modifier.description}
							</ui-grade>
						</ui-modifier>
					})}
				</ui-historic-listing>

				<ui-actions>
					<ui-action ui-click={async () => {
						await new MapService().archiveProperty(this.property);

						history.back();
					}}>
						{deleteIcon()} Archive Property
					</ui-action>

					<ui-action ui-click={() => {
						const boundary = Point.bounds(Point.unpack(this.activePlotBoundary.shape), 50);

						const link = document.createElement('a');
						link.href = `/plot/${boundary.x.min}/${boundary.y.min}/${Math.max(boundary.width, boundary.height)}`;
						link.download = `Property ${this.property.id.split('-')[0]}`;

						link.click();
					}}>
						{captureIcon()} Download Property Register Entry
					</ui-action>
				</ui-actions>
			</ui-content>}
		</ui-property>
	}

	async copyBuilding(source: PackedPointArray) {
		this.property.buildings.push(
			await new PropertyService().createBuilding(this.property.id, source)
		);

		this.update();
	}
}
