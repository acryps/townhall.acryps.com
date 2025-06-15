import { Component } from "@acryps/page";
import { PlanService, PlanSummaryModel } from "../managed/services";
import { LegalEntityComponent } from "../shared/legal-entity";
import { addIcon } from "../assets/icons/managed";

export class PlansPage extends Component {
	plans: PlanSummaryModel[];

	async onload() {
		this.plans = await new PlanService().list();
	}

	render(child) {
		if (child) {
			return <ui-plans>
				{child}
			</ui-plans>
		}

		return <ui-plans>
			<ui-title>
				Plans
			</ui-title>

			<ui-hint>
				Any legal entity can create a plan and present it here.
			</ui-hint>

			<ui-actions>
				<ui-action ui-href='create'>
					{addIcon()} Create Plan
				</ui-action>
			</ui-actions>

			<ui-list>
				{this.plans.map(plan => <ui-plan ui-href={plan.tag}>
					<ui-name>
						{plan.name}
					</ui-name>

					<ui-author>
						{new LegalEntityComponent(plan.author, () => {})}
					</ui-author>
				</ui-plan>)}
			</ui-list>
		</ui-plans>;
	}
}
