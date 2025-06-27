import { Component } from "@acryps/page";
import { OracleProposalViewModel, OracleService } from "../managed/services";
import { oracleIcon } from "../assets/icons/managed";
import { LegalEntityComponent } from "../shared/legal-entity";

export class OraclePage extends Component {
	proposal: OracleProposalViewModel;

	async onload() {
		this.proposal = await new OracleService().nextProposal();
	}

	render() {
		return <ui-oracle>
			<ui-header>
				{oracleIcon()}

				<ui-name>
					Oracle
				</ui-name>

				<ui-guide>
					The oracle comes up with random lore updates.
					We review the proposals and accept anything that is realistic.
					We should accept stuff that is realistic, even if it does not align with our plans for the future.
				</ui-guide>
			</ui-header>

			{this.proposal ? <ui-proposal>
				{this.proposal.entity && new LegalEntityComponent(this.proposal.entity)}

				<ui-lore>
					{this.proposal.lore}
				</ui-lore>

				<ui-actions>
					<ui-action ui-click={() => this.resolve(false)}>
						Unrealistic
					</ui-action>

					<ui-action ui-click={() => this.resolve(true)}>
						Realistic
					</ui-action>
				</ui-actions>
			</ui-proposal> : <ui-none>
				All proposals have been reviewed, new proposals will be generated soon.
				Please check back later.
			</ui-none>}
		</ui-oracle>
	}

	async resolve(realistic: boolean) {
		await new OracleService().review(this.proposal.id, realistic);

		this.reload();
	}
}
