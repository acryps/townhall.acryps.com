import { Component } from "@acryps/page";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";
import { BoroughService, CompanyViewModel, DistrictViewModel, TrainRouteViewModel, TrainService } from "../../managed/services";
import { TrainRouteIconComponent } from "../../shared/train-route";
import { TrainsPage } from "..";

export class RegisterTrainRoutePage extends Component {
	declare parameters: { path };
	declare parent: TrainsPage;

	code = '';
	color = '';
	textColor = '';
	name = '';

	path: Point[];

	async onload() {
		this.path = Point.unpack(atob(this.parameters.path));
	}

	render() {
		const preview = new TrainRouteViewModel();
		const iconPreview = new TrainRouteIconComponent(preview);

		const updatePreview = () => {
			preview.code = this.code;
			preview.color = this.color;
			preview.textColor = this.textColor;

			iconPreview.update();
		};

		return <ui-register-train-route>
			{new MapComponent().highlight(this.path, false)}

			<ui-field>
				<label>Code</label>

				<ui-used>
					Used: {this.parent.routes
						.toSorted((a, b) => a.code.localeCompare(b.code))
						.map(route => new TrainRouteIconComponent(route))}
				</ui-used>

				<input $ui-value={this.code} ui-change={() => updatePreview()} />
			</ui-field>

			<ui-field>
				<label>Color (#rrggbb)</label>

				<input $ui-value={this.color} ui-change={() => updatePreview()} />
			</ui-field>

			<ui-field>
				<label>Text Color (#rrggbb)</label>

				<input $ui-value={this.textColor} ui-change={() => updatePreview()} />
			</ui-field>

			<ui-preview>
				{iconPreview}
			</ui-preview>

			<ui-field>
				<label>Name</label>

				<input $ui-value={this.name} />
			</ui-field>

			<ui-actions>
				<ui-action ui-click={async () => {
					await new TrainService().register(Point.pack(this.path), this.code, this.color, this.textColor, this.name);

					this.navigate(`/train/route/${this.code}`);
				}}>
					Register Train Route
				</ui-action>
			</ui-actions>
		</ui-register-train-route>;
	}
}
