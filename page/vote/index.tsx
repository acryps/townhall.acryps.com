import { Component } from "@acryps/page";
import { BillViewModel, OpenHonestiumViewModel, VoteService } from "../managed/services";

export class VotePage extends Component {
	bills: BillViewModel[];

	openHonestium: OpenHonestiumViewModel;

	async onload() {
		this.openHonestium = await new VoteService().getOpenHonestium();

		this.bills = await new VoteService().getBills();
	}

	render(child) {
		if (child) {
			return <ui-vote>
				{child}
			</ui-vote>;
		}

		const openBills = this.bills.filter(bill => !bill.certified);

		return <ui-vote>
			{!!openBills.length && <ui-open-bills>
				<ui-header>
					Open Bills
				</ui-header>

				<ui-hint>
					Bills where people are still voting or have not been certified yet.
				</ui-hint>

				<ui-bills>
					{openBills.map(bill => <ui-bill ui-href={`bill/${bill.tag}`}>
						<ui-tag>
							{bill.tag}
						</ui-tag>

						<ui-title>
							{bill.title}
						</ui-title>

						<ui-scope>
							{bill.scope.name} Legal District
						</ui-scope>

						<ui-summary>
							{bill.summary}
						</ui-summary>
					</ui-bill>)}
				</ui-bills>
			</ui-open-bills>}

			<ui-certified-bills>
				<ui-header>
					Certified Bills
				</ui-header>

				<ui-hint>
					Bills certified by law house, where all eligable voters have cast their obligatory vote.
				</ui-hint>

				<ui-bills>
					{this.bills.filter(bill => bill.certified).map(bill => <ui-bill ui-href={`bill/${bill.tag}`}>
						<ui-tag>
							{bill.tag}
						</ui-tag>

						<ui-title>
							{bill.title}
						</ui-title>

						<ui-scope>
							{bill.scope.name} Legal District
						</ui-scope>

						<ui-summary>
							{bill.summary}
						</ui-summary>

						<ui-result>
							<ui-pro>
								{bill.pro ? 'Yes' : 'No'}
							</ui-pro>

							<ui-time>
								{bill.certified.toLocaleString()}
							</ui-time>
						</ui-result>
					</ui-bill>)}
				</ui-bills>
			</ui-certified-bills>

			<ui-actions>
				<ui-action ui-href='propose'>
					Propose new bill
				</ui-action>

				{this.openHonestium && <ui-action ui-href='honestium'>
					Answer Honestium
				</ui-action>}
			</ui-actions>
		</ui-vote>;
	}
}
