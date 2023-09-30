import { Application } from "../index";
import { BoroughViewModel, HistoricListingGradeViewModel, HistoricListingModifierViewModel, HistoricListingService, MapService, PropertyTypeViewModel, PropertyViewModel } from "../managed/services";
import { Point } from "../map/point";
import { Component } from "@acryps/page";
import { MapPreviewComponent } from "../shared/map.preview";

export class PropertyComponent extends Component {
	declare parameters: { id: string };

	property: PropertyViewModel;

	types: PropertyTypeViewModel[];
	boroughs: BoroughViewModel[];
	grades: HistoricListingGradeViewModel[];
	modifiers: HistoricListingModifierViewModel[];

	async onload() {
		this.property = await new MapService().getProperty(this.parameters.id);

		this.types = await new MapService().getPropertyTypes();
		this.boroughs = await new MapService().getBoroughs();

		this.grades = await new HistoricListingService().getGrades();
		this.modifiers = await new HistoricListingService().getModifiers();
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

			<ui-section>
				<ui-title>Historic Listing</ui-title>

				{this.property.historicListingRegisteredAt && <ui-paragraph>
					This item was registered as a historic item at {this.property.historicListingRegisteredAt.toLocaleDateString()}
				</ui-paragraph>}

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

					return <ui-field>
						<label>{modifier.name}</label>

						<input type="checkbox" $ui-value={value} ui-change={async value => {
							if (value) {
								this.property.historicListingModifiers.push(await new HistoricListingService().addModifier(this.property.id, modifier.id));
							} else {
								this.property.historicListingModifiers = this.property.historicListingModifiers.filter(existing => existing != link);

								await new HistoricListingService().removeModifier(link.id);
							}

							this.update();
						}}></input>

						<ui-hint>
							{modifier.description}
						</ui-hint>
					</ui-field>
				})}
			</ui-section>

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