import { Component } from "@acryps/page";
import { BillViewModel, VoteService } from "../../managed/services";
import { VoteTickerComponent } from "./ticker";
import { toSimulatedAge } from "../../../interface/time";

export class BillPage extends Component {
	declare parameters: { tag };

	bill: BillViewModel;

	async onload() {
		this.bill = await new VoteService().getBill(this.parameters.tag);
	}

	render() {
		return <ui-bill>
			<ui-tag>
				{this.bill.tag}
			</ui-tag>

			<ui-title>
				{this.bill.title}
			</ui-title>

			<ui-description>
				{this.bill.description}
			</ui-description>

			{this.renderHonestiums(true)}
			{this.renderHonestiums(false)}

			{this.bill.certified && <ui-certification>
				<ui-date>
					Certified {toSimulatedAge(this.bill.certified)} years ago.
				</ui-date>

				<ui-result>
					{this.bill.pro ? 'Pro' : 'Contra'}
				</ui-result>
			</ui-certification>}

			{!!this.bill.honestiums.length && new VoteTickerComponent(this.bill)}
		</ui-bill>
	}

	renderHonestiums(pro: boolean) {
		return this.bill.honestiums.filter(honestium => honestium.pro == pro).map(honestium => <ui-honestium>
			<ui-question>
				<ui-type>{pro ? 'Pro' : 'Contra'}</ui-type> {honestium.question}
			</ui-question>

			<ui-answer>
				{honestium.answer}
			</ui-answer>
		</ui-honestium>);
	}
}
