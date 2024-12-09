import { Component } from "@acryps/page";
import { LifeService, ResidentViewModel } from "../managed/services";
import { toSimulatedAge } from "../../interface/time";
import { chatIcon, electionIcon, homeIcon, relationGraphIcon } from "../assets/icons/managed";

export class ResidentPage extends Component {
	declare parameters: { tag };

	resident: ResidentViewModel;

	async onload() {
		this.resident = await new LifeService().getResident(this.parameters.tag);
	}

	render() {
		return <ui-resident>
			<img src={`/resident/image/${this.resident.tag}`} />

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

			<ui-actions>
				<ui-action>
					{chatIcon()}
				</ui-action>

				<ui-action>
					{homeIcon()}
				</ui-action>

				<ui-action>
					{relationGraphIcon()}
				</ui-action>

				<ui-action>
					{electionIcon()}
				</ui-action>
			</ui-actions>

			<ui-biography>
				{this.resident.biography}
			</ui-biography>
		</ui-resident>
	}
}
