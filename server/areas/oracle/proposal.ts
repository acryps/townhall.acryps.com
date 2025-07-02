import { ViewModel } from "vlserver";
import { OracleProposal } from "../../managed/database";
import { LegalEntityViewModel } from "../legal-entity";

export class OracleProposalSummaryModel extends ViewModel<OracleProposal> {
	id;

	lore;
}

export class OracleProposalViewModel extends OracleProposalSummaryModel {
	entity: LegalEntityViewModel;
}
