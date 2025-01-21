import { Component } from "@acryps/page";
import { ResidentPage } from "..";
import { LifeService, ResidentRelationViewModel, ResidentSummaryModel } from "../../managed/services";
import { toSimulatedAge, toSimulatedTime } from "../../../interface/time";
import { relationIcon } from "../../assets/icons/managed";

export class RelationsPage extends Component {
	declare parent: ResidentPage;

	relations: ResidentRelationViewModel[];

	async onload() {
		this.relations = await new LifeService().getRelations(this.parent.resident.id);
	}

	render() {
		return <ui-relations>
			<ui-hint>
				All relations were {this.parent.resident.givenName} is involved.
				A relation always has an initiator (left), and a peer (right).
				Sometimes, the relations are a bit messy and do not really add up.
				Don't take the age differences as advice for real live, sometimes they are really, really odd.
				The story why the people bonded is green, while a red text indicates the conflict that lead them to break the bond.
			</ui-hint>

			{this.relations.map(relation => <ui-relation>
				<ui-link>
					{this.renderParticipant(relation.initiator)}

					{relationIcon()}

					{this.renderParticipant(relation.peer)}
				</ui-link>

				<ui-purpose>
					{relation.purpose}
				</ui-purpose>

				{relation.ended ? <ui-time>
					Bonded {toSimulatedAge(relation.bonded)} years ago, ended {toSimulatedAge(relation.ended)}
				</ui-time> : <ui-time>
					Bonded {toSimulatedAge(relation.bonded)} years ago
				</ui-time>}

				<ui-connection>
					{relation.connection}
				</ui-connection>

				{relation.conflict && <ui-conflict>
					{relation.conflict}
				</ui-conflict>}
			</ui-relation>)}
		</ui-relations>;
	}

	renderParticipant(resident: ResidentSummaryModel) {
		return <ui-resident ui-self={resident.id == this.parent.resident.id} ui-href={`/resident/${resident.tag}`}>
			<img src={`/resident/image/${resident.tag}`} />

			<ui-name>
				{resident.givenName} {resident.familyName}
			</ui-name>

			<ui-age>
				{toSimulatedAge(resident.birthday)}
			</ui-age>
		</ui-resident>;
	}
}
