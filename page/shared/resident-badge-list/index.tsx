import { Component } from "@acryps/page";
import { ResidentSummaryModel } from "../../managed/services";

export class ResidentBadgeListComponent extends Component {
	constructor(
		private residents: ResidentSummaryModel[]
	) {
		super();
	}

	render() {
		return <ui-resident-badge-list>
			{this.residents.map(resident => <ui-resident ui-href={`/resident/${resident.tag}`}>
				<img src={`/resident/image/${resident.tag}`} />

				<ui-name>
					{resident.givenName} {resident.familyName}
				</ui-name>
			</ui-resident>)}
		</ui-resident-badge-list>
	}
}
