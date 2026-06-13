import { Component } from "@acryps/page";
import { LoreProposalViewModel, LoreService } from "../../../managed/services";
import { LoreItemPage } from "..";

export class ExpandLorePage extends Component {
	declare parent: LoreItemPage;

	proposals: LoreProposalViewModel[] = [];

	async onload() {
		new LoreService().expand(this.parent.lore.id).then(proposals => {
			this.proposals = proposals;

			this.update();
		});
	}

	render() {
		return <ui-expand>
			{this.proposals.length ? <ui-proposals>
				{this.proposals.map(proposal => <ui-proposal>
					<ui-title>
						{proposal.title}
					</ui-title>

					<ui-context>
						{proposal.context}
					</ui-context>

					<ui-actions>
						<ui-action ui-click={async () => {
							this.navigate(`../../${await new LoreService().acceptProposal(proposal.id)}`);
						}}>
							Add to lore
						</ui-action>
					</ui-actions>
				</ui-proposal>)}
			</ui-proposals> : <ui-expanding>
				Lore expansions are being proposed...
			</ui-expanding>}
		</ui-expand>
	}
}
