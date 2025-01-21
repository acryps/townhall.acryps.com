import { Component } from "@acryps/page";
import { OpenHonestiumViewModel, VoteService } from "../../managed/services";

export class HonestiumPage extends Component {
	honestium: OpenHonestiumViewModel;

	async onload() {
		this.honestium = await new VoteService().getOpenHonestium();

		if (!this.honestium) {
			this.navigate('/vote');
		}
	}

	render() {
		if (!this.honestium) {
			return <ui-void></ui-void>;
		}

		return <ui-open-honestium>
			<ui-bill>
				<ui-tag>
					{this.honestium.bill.tag}
				</ui-tag>

				<ui-title>
					{this.honestium.bill.title}
				</ui-title>

				<ui-description>
					{this.honestium.bill.description}
				</ui-description>

				<ui-answers>
					{this.honestium.bill.honestiums.filter(honestium => honestium.answered && honestium.pro).length} pro honestiums answered
				</ui-answers>

				<ui-answers>
					{this.honestium.bill.honestiums.filter(honestium => honestium.answered && !honestium.pro).length} contra honestiums answered
				</ui-answers>
			</ui-bill>

			<ui-question>
				{this.honestium.question}
			</ui-question>

			<textarea
				$ui-value={this.honestium.answer}
				ui-change={() => new VoteService().saveHonestium(this.honestium.id, this.honestium.answer)}
				rows="8"
			/>

			<ui-hint>
				THIS IS A LEGALLY BINDING ANSWER, YOU ARE ANSWERING UNDER OATH.
				The answer must be honest, even if it is bad for the desired election result.
			</ui-hint>

			<ui-hint>
				Answer will be saved automatically.
				Press submit to save the answer.
			</ui-hint>

			<ui-actions>
				<ui-action ui-submit ui-click={() => {
					if (confirm('Did you answer this question honestly? You are under oath. The answer cannot be edited, once the honestium has been submitted. Your answer has already been saved, if you are not sure yet, you can still cancel and submit later, no data will be lost.')) {
						new VoteService().submitHonestium(this.honestium.id);

						this.reload();
					}
				}}>
					Submit Answer under Oath
				</ui-action>
			</ui-actions>
		</ui-open-honestium>;
	}
}
