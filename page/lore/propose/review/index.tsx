import { Component } from "@acryps/page";
import { LoreProposalViewModel, LoreService } from "../../../managed/services";
import { WriteLoreProposalPage } from "../write";

export class LoreProposalReviewPage extends Component {
	declare parameters: { id };

	proposal: LoreProposalViewModel;

	async onload() {
		this.proposal = await new LoreService().getProposal(this.parameters.id);
	}

	render() {
		if (!this.proposal.validation) {
			setTimeout(() => this.reload(), 1000);
		}

		return <ui-proposal>
			<ui-context>
				{this.proposal.context}
			</ui-context>

			{this.proposal.validation ? <ui-validation>
				{this.proposal.valid ? <ui-valid>
					Valid
				</ui-valid> : <ui-invalid>
					Invalid
				</ui-invalid>}

				<ui-reason>
					{this.proposal.validation}
				</ui-reason>

				<ui-actions>
					<ui-action ui-click={() => {
						localStorage.setItem(WriteLoreProposalPage.titleStorageKey, this.proposal.title);
						localStorage.setItem(WriteLoreProposalPage.contextStorageKey, this.proposal.context);

						this.navigate('../write');
					}}>
						Rewrite proposal
					</ui-action>

					{this.proposal.valid && <ui-action ui-click={async () => {
						await new LoreService().acceptProposal(this.proposal.id);
					}}>
						Add to lore
					</ui-action>}
				</ui-actions>
			</ui-validation> : <ui-validating>
				Your proposal is being validated...
			</ui-validating>}
		</ui-proposal>
	}
}
