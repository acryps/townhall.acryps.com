import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { BoundaryComponent } from "./boundary";
import { PackedPointArray, Point } from "../../../interface/point";
import { addIcon, deleteIcon, drawIcon } from "../../assets/icons/managed";
import { BoroughSummaryModel, MapService, PropertyService, PropertyTypeViewModel } from "../../managed/services";
import { Application } from "../..";

export class GeneralPropertyTab extends Component {
	touchingBoroughs: BoroughSummaryModel[];
	boroughs: BoroughSummaryModel[];
	types: PropertyTypeViewModel[];

	constructor(
		private page: PropertyPage
	) {
		super();
	}

	async onload() {
		this.types = await new MapService().getPropertyTypes();

		this.boroughs = Application.boroughs;
		this.touchingBoroughs = await new PropertyService().findTouchingBoroughs(this.page.property.id);
	}

	render() {
		const center = Point.center(Point.unpack(this.page.activePlotBoundary.shape));
		const activeBuildings = this.page.property.buildings.filter(building => !building.archived);

		return <ui-general>
			<ui-field>
				<label>Name</label>

				<input $ui-value={this.page.property.name} ui-change={() => new MapService().saveProperty(this.page.property)}></input>
			</ui-field>

			<ui-field>
				<label>Type</label>

				<select $ui-value={this.page.property.type} ui-change={() => new MapService().saveProperty(this.page.property)}>
					{this.types.map(type => <option ui-value={type}>
						{type.name} ({type.code.toUpperCase()})
					</option>)}
				</select>
			</ui-field>

			<ui-field>
				<label>Borough</label>

				<select $ui-value={this.page.property.borough} ui-change={() => new MapService().saveProperty(this.page.property)}>
					<option ui-value={null}>No borough assigned</option>
					<option disabled></option>

					{this.touchingBoroughs.map(borough => <option ui-value={borough}>
						{borough.name}
					</option>)}
					{this.touchingBoroughs.length != 0 && <option disabled></option>}

					{this.boroughs.filter(borough => !this.touchingBoroughs.find(touching => touching.id == borough.id)).map(borough => <option ui-value={borough}>
						{borough.name}
					</option>)}
				</select>
			</ui-field>

			<ui-plot-boundaries>
				{this.page.property.plotBoundaries.map((boundary, index) => <ui-plot-boundary ui-active={boundary == this.page.activePlotBoundary}>
					<ui-detail>
						<ui-comment>
							{boundary.changeComment ?? `Plot Boundary #${boundary.id.split('-')[0]}`}
						</ui-comment>

						<ui-area>
							{Point.area(Point.unpack(boundary.shape))}b²
						</ui-area>
					</ui-detail>

					{new BoundaryComponent(boundary.shape, this.page.property.plotBoundaries[index - 1]?.shape)}
				</ui-plot-boundary>)}

				<ui-action ui-href={`/map/${center.x}/${center.y}/5/edit-plot/${this.page.property.id}`}>
					{drawIcon()} Edit Plot Boundary
				</ui-action>
			</ui-plot-boundaries>

			<ui-buildings>
				{this.page.property.buildings.map(building => <ui-building ui-href={`building/${building.id}`} ui-archived={!!building.archived}>
					<ui-detail>
						<ui-name>
							{building.name ?? `Building #${building.id.split('-')[0]}`}
						</ui-name>

						<ui-area>
							{Point.area(Point.unpack(building.boundary))}b²
						</ui-area>
					</ui-detail>

					{new BoundaryComponent(building.boundary)}
				</ui-building>)}

				{activeBuildings.length == 0 && <ui-action ui-click={() => this.copyBuilding(this.page.activePlotBoundary.shape)}>
					{addIcon()} Use Plot Boundary as building
				</ui-action>}

				<ui-action ui-href={`/map/${center.x}/${center.y}/5/create-building/${this.page.property.id}`}>
					{addIcon()} Create Building
				</ui-action>
			</ui-buildings>

			<ui-actions>
				<ui-action ui-click={async () => {
					await new MapService().archiveProperty(this.page.property);

					history.back();
				}}>
					{deleteIcon()} Archive Property
				</ui-action>
			</ui-actions>
		</ui-general>
	}

	async copyBuilding(source: PackedPointArray) {
		this.page.property.buildings.push(
			await new PropertyService().createBuilding(this.page.property.id, source)
		);

		this.update();
	}
}
