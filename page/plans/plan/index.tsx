import { Component } from "@acryps/page";
import { PlanViewModel, PlanService } from "../../managed/services";
import { LegalEntitySelectorComponent } from "../../shared/legal-entity/select";
import { addIcon, planIcon } from "../../assets/icons/managed";
import { Point } from "../../../interface/point";
import { Application } from "../..";
import { BoundaryComponent } from "../../properties/property/boundary";
import { MapComponent } from "../../shared/map";
import { planLayer } from "../../shared/map/layers";

export class PlanPage extends Component {
	declare parameters: { tag };

	plan: PlanViewModel;

	async onload() {
		this.plan = await new PlanService().getPlan(this.parameters.tag);
	}

	render(child) {
		if (child) {
			return <ui-plan>
				<ui-header ui-href='.'>
					{planIcon()} {this.plan.name}
				</ui-header>

				{child}
			</ui-plan>;
		}

		const center = this.plan.shapes.length ? Point.center(this.plan.shapes.flatMap(shape => Point.unpack(shape.path))) : Application.center;

		const map = new MapComponent();
		map.layers.push(planLayer(this.parameters.tag));
		map.show(center, 0.5);

		return <ui-plan>
			{map}

			<ui-field>
				<input $ui-value={this.plan.name} ui-change={() => this.save()} />
			</ui-field>

			<ui-field>
				<textarea rows={8} $ui-value={this.plan.description} ui-change={() => this.save()} />
			</ui-field>

			{new LegalEntitySelectorComponent(this.plan.author).onSelect(author => {
				new PlanService().setAuthor(this.plan.id, author.id);

				this.reload();
			})}

			<ui-shapes>
				{this.plan.shapes.map(shape => <ui-shape ui-href={shape.id} ui-archived={!!shape.archived}>
					<ui-name>
						{shape.label ?? `Shape #${shape.id}`}
					</ui-name>

					{new BoundaryComponent(shape.path, null, shape.closed)}
				</ui-shape>)}

				<ui-action ui-href={`/map/${center.x}/${center.y}/5/plan-shape/${this.plan.tag}`}>
					{addIcon()} Create Shape
				</ui-action>
			</ui-shapes>
		</ui-plan>
	}

	private save() {
		new PlanService().save(this.plan.id, this.plan.name, this.plan.description);
	}
}
