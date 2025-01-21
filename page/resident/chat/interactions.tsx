import { Component } from "@acryps/page";
import { ChatInteractionViewModel, ResidentViewModel } from "../../managed/services";

export class InteractionsComponent extends Component {
	visibleInformationRequests: ChatInteractionViewModel[] = [];

	constructor(
		public resident: ResidentViewModel,
		public interactions: ChatInteractionViewModel[]
	) {
		super();
	}

	render() {
		let lastResponse: HTMLElement;

		requestAnimationFrame(() => {
			if (lastResponse) {
				lastResponse.scrollIntoView(true);
			}
		});

		this.interactions.sort((a, b) => +(a.responded ?? Infinity) - +(b.responded ?? Infinity));

		return <ui-interactions>
			{this.interactions.map(interaction => <ui-interaction>
				{interaction.question && <ui-message ui-user>
					{interaction.question}
				</ui-message>}

				{lastResponse = this.renderResponse(interaction)}
			</ui-interaction>)}
		</ui-interactions>;
	}

	renderResponse(interaction: ChatInteractionViewModel) {
		if (!interaction.responded) {
			return <ui-thinking></ui-thinking>;
		}

		if (interaction.containsInformationRequest) {
			if (this.visibleInformationRequests.includes(interaction)) {
				return <ui-information-request>
					system information request: {interaction.response}
				</ui-information-request>;
			}

			return <ui-information-request ui-click={() => {
				this.visibleInformationRequests.push(interaction);

				this.update();
			}}>
				{this.resident.givenName} had to think about it...
			</ui-information-request>;
		}

		return <ui-message ui-resident>
			{interaction.response}
		</ui-message>;
	}
}
