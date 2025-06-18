import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { ChangeFrameViewModel, ChangeService, HistoricListingGradeViewModel, HistoricListingModifierViewModel, HistoricListingService } from "../../managed/services";
import { Point } from "../../../interface/point";
import { ChangeFramesComponent } from "./change-frames";

export class PropertyHistoryTab extends Component {
	grades: HistoricListingGradeViewModel[];
	modifiers: HistoricListingModifierViewModel[];

	constructor(
		private page: PropertyPage
	) {
		super();
	}

	async onload() {
		this.grades = await new HistoricListingService().getGrades();
		this.modifiers = await new HistoricListingService().getModifiers();
	}

	render() {
		return <ui-history>
			{new ChangeFramesComponent(this.page.activePlotBoundary)}

			<ui-historic-listing>
				<ui-header>Historic Listing</ui-header>

				{this.page.property.historicListingRegisteredAt && <ui-date>
					This item was registered as a historic item at {this.page.property.historicListingRegisteredAt.toLocaleDateString()}
				</ui-date>}

				<ui-field>
					<label>Listing Grade</label>

					<select $ui-value={this.page.property.historicListingGrade} ui-change={async () => {
						await new HistoricListingService().addListing(this.page.property, this.page.property.historicListingGrade);

						this.update();
					}}>
						<option ui-value={null}>Not listed</option>

						{this.grades.map(grade => <option ui-value={grade}>
							{grade.grade} - {grade.name}
						</option>)}
					</select>

					{this.page.property.historicListingGrade && <ui-hint>
						{this.page.property.historicListingGrade.description}
					</ui-hint>}
				</ui-field>

				{this.page.property.historicListingGrade && this.modifiers.map(modifier => {
					const link = this.page.property.historicListingModifiers.find(source => source.historicListingModifier.id == modifier.id);
					let value = !!link;

					return <ui-modifier>
						<ui-field>
							<input type="checkbox" $ui-value={value} ui-change={async value => {
								if (value) {
									this.page.property.historicListingModifiers.push(await new HistoricListingService().addModifier(this.page.property.id, modifier.id));
								} else {
									this.page.property.historicListingModifiers = this.page.property.historicListingModifiers.filter(existing => existing != link);

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
		</ui-history>;
	}
}
