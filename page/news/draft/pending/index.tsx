import { Component } from "@acryps/page";
import { DraftSummaryModel, PublicationService } from "../../../managed/services";

export class PendingDraftsPage extends Component {
	drafts: DraftSummaryModel[];

	async onload() {
		this.drafts = await new PublicationService().listPendingDrafts();
	}

	render() {
		return <ui-pending-drafts>
			<ui-guide>
				These drafts have questions waiting for your answers.
			</ui-guide>

			{this.drafts.map(draft => <ui-draft ui-href={`../draft/review/${draft.id}`}>
				<ui-title>{draft.title || draft.draft}</ui-title>
				<ui-publication>{draft.publication.name}</ui-publication>
			</ui-draft>)}
		</ui-pending-drafts>;
	}
}
