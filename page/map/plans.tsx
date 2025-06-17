import { Component, ComponentContent } from "@acryps/page";
import { MapComponent } from "../shared/map";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { PlanService, PlanSummaryModel, PropertyService } from "../managed/services";
import { planLayer } from "../shared/map/layers";
import { addIcon } from "../assets/icons/managed";

export class PlanViewAction extends Action {
	declare parent: MapPage;
	declare parameters: { tags };

	plans: PlanSummaryModel[];
	active: PlanSummaryModel[];

	async activate() {
		this.plans = await new PlanService().list();

		const tags = JSON.parse(atob(this.parameters.tags));
		this.active = tags.map(tag => this.plans.find(plan => plan.tag == tag));

		requestAnimationFrame(() => {
			this.parent.map.layers.push(...tags.map(tag => planLayer(tag)));
			this.parent.map.updateLayers();
		});
	}

	renderPanel() {
		return <ui-plans>
			{this.active.map((plan, index) => <ui-plan>
				{this.renderPlanSelect(plan, replacement => {
					if (replacement) {
						this.active[index] = replacement;
					} else {
						this.active.splice(index, 1);
					}

					this.updateParameter();
				})}
			</ui-plan>)}

			<ui-add>
				{addIcon()} {this.renderPlanSelect(null, added => {
					this.active.push(added);

					this.updateParameter();
				})}
			</ui-add>
		</ui-plans>;
	}

	renderPlanSelect(selection: PlanSummaryModel, select: (plan: PlanSummaryModel) => void) {
		return <select $ui-value={selection} ui-change={() => {
			select(selection);
		}}>
			<option value={null}></option>

			{this.plans.map(plan => <option ui-value={plan}>
				{plan.name}
			</option>)}
		</select>
	}

	updateParameter() {
		this.parameters.tags = btoa(JSON.stringify(this.active.map(plan => plan.tag)));

		requestAnimationFrame(() => {
			location.reload();
		});
	}
}
