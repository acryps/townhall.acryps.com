import { Component } from "@acryps/page";
import { LoreService } from "../../../managed/services";

export class WriteLoreProposalPage extends Component {
	static titleStorageKey = 'loreWriterTitle';
	static contextStorageKey = 'loreWriterContext';

	title = localStorage.getItem(WriteLoreProposalPage.titleStorageKey) ?? '';
	context = localStorage.getItem(WriteLoreProposalPage.contextStorageKey) ?? '';

	render() {
		return <ui-write>
			<ui-guide>
				Add to the lore by writing a new lore plot.
				Your submission will be verified by the lore.
			</ui-guide>

			<textarea
				$ui-value={this.title}
				ui-change={() => localStorage.setItem(WriteLoreProposalPage.titleStorageKey, this.title)}
				placeholder='Title'
				rows={3}
			/>

			<textarea
				$ui-value={this.context}
				ui-change={() => localStorage.setItem(WriteLoreProposalPage.contextStorageKey, this.context)}
				placeholder='Context'
				rows={20}
			/>

			<ui-actions>
				<ui-action ui-click={async () => {
					this.navigate(`../${await new LoreService().propose(this.title, this.context)}`);

					localStorage.removeItem(WriteLoreProposalPage.titleStorageKey);
					localStorage.removeItem(WriteLoreProposalPage.contextStorageKey);
				}}>
					Submit
				</ui-action>
			</ui-actions>
		</ui-write>
	}
}
