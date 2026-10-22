import { Component } from "@acryps/page";
import { DraftReviewViewModel, PublicationService } from "../../../managed/services";

export class WriteDraftPage extends Component {
	declare parameters: { id: string };

	draft: DraftReviewViewModel;

	async onload() {
		this.draft = await new PublicationService().getDraftReview(this.parameters.id);
	}

	render() {
		return <ui-write-article>
			<ui-guide>
				Write a rough draft idea for {this.draft.publication.name}.
				Typos and unclear references are fine, the interpreter will ask you about anything it needs clarified and write the article itself.
			</ui-guide>

			<textarea
				$ui-value={this.draft.draft}
				placeholder='What happened?'
				ui-change={() => this.save()}
				rows={10}
			/>

			<ui-actions>
				<ui-action ui-click={async () => {
					await new PublicationService().interpretDraft(this.draft.id);

					history.back();
				}}>
					Submit Draft
				</ui-action>
			</ui-actions>
		</ui-write-article>;
	}

	save() {
		new PublicationService().saveDraft(this.draft.id, this.draft.draft);
	}
}
