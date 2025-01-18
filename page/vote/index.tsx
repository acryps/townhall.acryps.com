import { Component } from "@acryps/page";
import { BillViewModel, OpenHonestiumViewModel, VoteService } from "../managed/services";

export class VotePage extends Component {
	openBills: BillViewModel[];

	openHonestium: OpenHonestiumViewModel;

	async onload() {
		this.openHonestium = await new VoteService().getOpenHonestium();
		this.openBills = await new VoteService().getOpenBills();
	}

	render(child) {
		if (child) {
			return <ui-vote>
				{child}
			</ui-vote>;
		}

		return <ui-vote>
			<ui-action ui-href='propose'>
				Propose new bill
			</ui-action>

			{this.openHonestium && <ui-action ui-href='honestium'>
				Answer Honestium
			</ui-action>}

			<ui-open-bills>
				<ui-header>
					Open Bills
				</ui-header>

				<ui-hint>
					Bills where people are still voting or have not been certified yet.
				</ui-hint>

				<ui-bills>
					{this.openBills.map(bill => <ui-bill ui-href={`bill/${bill.tag}`}>
						<ui-tag>
							{bill.tag}
						</ui-tag>

						<ui-title>
							{bill.title}
						</ui-title>
					</ui-bill>)}
				</ui-bills>
			</ui-open-bills>
		</ui-vote>;
	}
}
