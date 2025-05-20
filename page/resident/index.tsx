import { Component } from "@acryps/page";
import { ChatService, LifeService, ResidentEventViewModel, ResidentViewModel } from "../managed/services";
import { toSimulatedAge } from "../../interface/time";
import { chatIcon, electionIcon, homeIcon, relationGraphIcon } from "../assets/icons/managed";
import { MetaPerson } from "@acryps/metadata";
import { convertToLegalCompanyName } from "../../interface/company";

export class ResidentPage extends Component {
	declare parameters: { tag };

	resident: ResidentViewModel;
	events: ResidentEventViewModel[];

	async onload() {
		this.resident = await new LifeService().getResident(this.parameters.tag);
		this.events = await new LifeService().getEventHistory(this.resident.id);

		new MetaPerson({
			givenName: this.resident.givenName,
			familyName: this.resident.familyName,

			description: this.resident.biography
		}).apply();
	}

	render(child) {
		if (child) {
			return <ui-resident>
				{child}
			</ui-resident>;
		}

		const activeWorkContract = this.resident.workContracts.find(contract => !contract.canceled);

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

			{activeWorkContract ? <ui-work ui-href={`/company-office/company/${activeWorkContract.offer.office.company.tag}`}>
				Working as {activeWorkContract.offer.title} for {convertToLegalCompanyName(activeWorkContract.offer.office.company)} in {activeWorkContract.offer.office.property.borough.name}
			</ui-work> : <ui-work>
				Not employeed at the time
			</ui-work>}

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
			</ui-actions>

			<ui-biography>
				{this.resident.biography}
			</ui-biography>

			<ui-timeline>
				{this.events.map(event => <ui-event>
					<ui-time>
						{toSimulatedAge(event.timestamp)} years ago
					</ui-time>

					<ui-action>
						{event.action ?? event.id}
					</ui-action>

					<ui-detail>
						{event.detail}
					</ui-detail>
				</ui-event>)}
			</ui-timeline>
		</ui-resident>
	}
}
