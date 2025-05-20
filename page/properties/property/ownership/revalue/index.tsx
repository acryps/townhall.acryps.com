import { Component } from "@acryps/page";
import { PropertyOwnershipPage } from "..";
import { LegalEntitySelectorComponent } from "../../../../shared/legal-entity/select";
import { LegalEntityViewModel } from "../../../../managed/services";

export class RevaluePropertyPage extends Component {
	declare parent: PropertyOwnershipPage;
	declare parameters: { ownerId: string };

	valueator: LegalEntityViewModel;

	render() {
		return <ui-revalue>
			<ui-guide>
				Revalueation will reconsider the price of the property automatically.
				Valuation will take some time.
			</ui-guide>

			<ui-field>
				<label>
					Valueator
				</label>

				{new LegalEntitySelectorComponent().onSelect(entity => {
					this.valueator = entity;

					this.update();
				})}
			</ui-field>

			<ui-action>
				Order Revaluation (MISSING)
			</ui-action>
		</ui-revalue>
	}
}
