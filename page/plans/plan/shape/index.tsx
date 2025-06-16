import { Component } from "@acryps/page";
import { PlanPage } from "..";
import { PlanService, PlanShapeViewModel } from "../../../managed/services";
import { Point } from "../../../../interface/point";
import { MapComponent } from "../../../shared/map";
import { planLayer } from "../../../shared/map/layers";
import { addIcon, deleteIcon } from "../../../assets/icons/managed";
import { colorPresetColor } from "./index.style";
import { hex } from "@acryps/style";

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

				<ui-color-presets>
					{this.renderColorPreset('stroke', 'f50', 'Railway Line')}

					{this.renderColorPreset('stroke', '0000', 'None')}
				</ui-color-presets>
			</ui-field>

			<ui-field>
				<input type='checkbox' $ui-value={this.shape.closed} ui-change={async () => {
					await this.save();

					this.update();
				}} />

				<label>
					Closed
				</label>
			</ui-field>

			{this.shape.closed && <ui-field>
				<label>
					Fill
				</label>

				<input type='color' $ui-value={this.shape.fill} ui-change={() => this.save()} />

				<ui-color-presets>
					{this.renderColorPreset('fill', 'eee', 'Street')}
					{this.renderColorPreset('fill', '00f', 'Residential')}
					{this.renderColorPreset('fill', 'f00', 'Commercial')}
					{this.renderColorPreset('fill', 'f0f', 'Mixed Use')}
					{this.renderColorPreset('fill', '0f0', 'Park')}

					{this.renderColorPreset('fill', '0000', 'None')}
				</ui-color-presets>
			</ui-field>}

			<ui-actions>
				{this.shape.archived ? <ui-action ui-click={async () => {
					await new PlanService().unarchiveShape(this.shape.id);

					this.shape.archived = null;
					this.update();
				}}>
					{addIcon()} Unarchive Shape
				</ui-action> : <ui-action ui-click={async () => {
					await new PlanService().archiveShape(this.shape.id);

					this.shape.archived = new Date();
					this.update();
				}}>
					{deleteIcon()} Archive Shape
				</ui-action>}
			</ui-actions>
		</ui-shape>
	}

	async save() {
		await new PlanService().saveShape(this.shape.id, this.shape.label, this.shape.stroke, this.shape.fill, this.shape.closed);
	}

	renderColorPreset(type: 'stroke' | 'fill', color: string, name: string) {
		return <ui-color-preset style={colorPresetColor.provide(hex(color))} ui-click={async () => {
			this.shape[type] = hex(color).toValueString();

			await this.save();
			this.update();
		}}>
			{name}
		</ui-color-preset>;
	}
}
