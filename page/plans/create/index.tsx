import { Component } from "@acryps/page";
import { LegalEntityViewModel, PlanService } from "../../managed/services";
import { LegalEntitySelectorComponent } from "../../shared/legal-entity/select";
import { addIcon } from "../../assets/icons/managed";

export class CreatePlanPage extends Component {
	name = '';
	description = '';

	author: LegalEntityViewModel;

	render() {
		return <ui-create-plan>
			<ui-field>
				<label>
					Name
				</label>

				<input $ui-value={this.name} />
			</ui-field>

			<ui-field>
				<label>
					Description
				</label>

				<textarea rows={12} $ui-value={this.description} />
			</ui-field>

			{new LegalEntitySelectorComponent(this.author).onSelect(author => {
				this.author = author;

				this.update();
			})}

			<ui-action ui-click={async () => {
				const tag = await new PlanService().create(
					this.name,
					this.description,
					this.author?.id
				);

				this.navigate(`../${tag}`);
			}}>
				{addIcon()} Create Plan
			</ui-action>
		</ui-create-plan>
	}
}
