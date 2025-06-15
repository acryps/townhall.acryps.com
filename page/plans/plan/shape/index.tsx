import { Component } from "@acryps/page";
import { PlanPage } from "..";
import { PlanService, PlanShapeViewModel } from "../../../managed/services";
import { Point } from "../../../../interface/point";
import { MapComponent } from "../../../shared/map";
import { planLayer } from "../../../shared/map/layers";

export class PlanShapePage extends Component {
	declare parameters: { id };
	declare parent: PlanPage;

	shape: PlanShapeViewModel;

	async onload() {
		this.shape = this.parent.plan.shapes.find(shape => shape.id == this.parameters.id);
	}

	render() {
		const map = new MapComponent();
		map.layers.push(planLayer(this.parent.plan.tag));
		map.highlight(Point.unpack(this.shape.path), this.shape.closed);

		return <ui-shape>
			{map}

			<ui-field>
				<label>
					Label
				</label>

				<input $ui-value={this.shape.label} ui-change={() => this.save()} />
			</ui-field>

			<ui-field>
				<label>
					Stroke
				</label>

				<input type='color' $ui-value={this.shape.stroke} ui-change={() => this.save()} />
			</ui-field>

			<ui-field>
				<label>
					Fill
				</label>

				<input type='color' $ui-value={this.shape.fill} ui-change={() => this.save()} />
			</ui-field>

			<ui-field>
				<input type='checkbox' $ui-value={this.shape.closed} ui-change={() => this.save()} />

				<label>
					Closed
				</label>
			</ui-field>
		</ui-shape>
	}

	async save() {
		await new PlanService().saveShape(this.shape.id, this.shape.label, this.shape.stroke, this.shape.fill, this.shape.closed);
	}
}
