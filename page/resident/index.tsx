import { Component } from "@acryps/page";
import { ChatService, LifeService, ResidentViewModel } from "../managed/services";
import { toSimulatedAge } from "../../interface/time";
import { chatIcon, electionIcon, homeIcon, relationGraphIcon } from "../assets/icons/managed";

export class ResidentPage extends Component {
	declare parameters: { tag };

	resident: ResidentViewModel;

	async onload() {
		this.resident = await new LifeService().getResident(this.parameters.tag);
	}

	render(child) {
		if (child) {
			return <ui-resident>
				{child}
			</ui-resident>;
		}

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

			{this.resident.mainTenancy ? <ui-home>
				Lives in {this.resident.mainTenancy.dwelling.property.borough.name} since {toSimulatedAge(this.resident.mainTenancy.start)} years
			</ui-home> : <ui-home>
				No permanent home
			</ui-home>}

			<ui-actions>
				<ui-action ui-click={async () => this.navigate(`chat/${await new ChatService().start(this.resident.tag)}`)}>
					{chatIcon()}
				</ui-action>

				{this.resident.mainTenancy && <ui-action ui-href={`/property/${this.resident.mainTenancy.dwelling.property.id}`}>
					{homeIcon()}
				</ui-action>}

				<ui-action ui-href='relations'>
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
