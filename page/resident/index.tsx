import { Component } from "@acryps/page";
import { LifeService, ResidentViewModel } from "../managed/services";
import { toSimulatedAge } from "../../interface/time";

export class ResidentPage extends Component {
	declare parameters: { id };

	resident: ResidentViewModel;

	async onload() {
		this.resident = await new LifeService().getResident(this.parameters.id);
	}

	render() {
		return <ui-resident>
			<ui-name>
				<ui-given-name>
					{this.resident.givenName}
				</ui-given-name>

				<ui-family-name>
					{this.resident.familyName}
				</ui-family-name>
			</ui-name>

			<ui-age>
				Born {this.resident.birthday.toLocaleDateString()}, aged {toSimulatedAge(this.resident.birthday)}
			</ui-age>

			<ui-biography>
				{this.resident.biography}
			</ui-biography>
		</ui-resident>
	}
}
