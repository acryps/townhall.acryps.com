import { Component } from "@acryps/page";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";
import { BoroughService, DistrictViewModel } from "../../managed/services";

export class RegisterBoroughPage extends Component {
	declare parameters: { bounds };

	name = '';
	description = '';
	district: DistrictViewModel = null;
	bounds: Point[];

	districts: DistrictViewModel[];

	async onload() {
		this.bounds = Point.unpack(atob(this.parameters.bounds));
		this.districts = await new BoroughService().listDistricts();
	}

	render() {
		return <ui-register-borough>
			{new MapComponent().highlight(this.bounds)}

			<ui-field>
				<label>Name</label>

				<input $ui-value={this.name} />
			</ui-field>

			<ui-field>
				<label>Description</label>

				<input $ui-value={this.description} />
			</ui-field>

			<ui-field>
				<label>Legal District</label>

				<ui-hint>
					A legal district contains multiple boroughs.
					Law House sessions are scoped to legal districts, where legal matters of all sorts are decided upon.
				</ui-hint>

				<select $ui-value={this.district}>
					<option ui-value={null}>
						No legal district
					</option>

					{this.districts.map(district => <option ui-value={district}>
						{district.name}
					</option>)}
				</select>
			</ui-field>

			<ui-actions>
				<ui-action ui-click={async () => {
					const tag = await new BoroughService().register(Point.pack(this.bounds), this.name, this.description, this.district?.id);

					this.navigate(`/borough/${tag}`);
				}}>
					Register Borough
				</ui-action>
			</ui-actions>
		</ui-register-borough>;
	}
}
