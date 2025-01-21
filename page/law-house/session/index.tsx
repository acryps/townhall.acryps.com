import { Component } from "@acryps/page";
import { LawHouseService, LawHouseSessionViewModel } from "../../managed/services";
import { ResidentBadgeListComponent } from "../../shared/resident-badge-list";

export class LawHouseSessionPage extends Component {
	declare parameters: { id };

	session: LawHouseSessionViewModel;

	async onload() {
		this.session = await new LawHouseService().getSession(this.parameters.id);
	}

	render() {
		return <ui-session>
			<ui-scope>
				{this.session.scope.name}
			</ui-scope>

			<ui-date>
				Started {this.session.started.toLocaleString()}
			</ui-date>

			{this.session.ended && <ui-date>
				Ended {this.session.started.toLocaleString()}
			</ui-date>}

			<ui-sessionaries>
				{new ResidentBadgeListComponent(this.session.sessionaries.map(sessionary => sessionary.resident))}
			</ui-sessionaries>

			<ui-protocol>
				{this.session.protocol}
			</ui-protocol>
		</ui-session>;
	}
}
