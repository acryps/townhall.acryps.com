import { Component } from "@acryps/page";
import { LawHouseService, LawHouseSessionSummaryModel, LawHouseSessionViewModel } from "../managed/services";

export class LawHousePage extends Component {
	sessions: LawHouseSessionSummaryModel[];

	async onload() {
		this.sessions = await new LawHouseService().getSessions();
	}

	render(child) {
		if (child) {
			return <ui-law-house>
				{child}
			</ui-law-house>
		}

		return <ui-law-house>
			<img src='/assets/impressions/law-house.jpg' />

			<ui-title>
				Law House - Home of everything legal
			</ui-title>

			<ui-description>
				Every legal decision in Pilegron is made within the law house in Hornaby.
				The structure houses multiple cabinets where legal proceedings can take place.
			</ui-description>

			<ui-description>
				Regularly, each legal district hosts a session, in which all pending legal tasks get worked on.
				Tasks include election verification, consensus counting and ballot mailing.
				Random residents are picked (sessionaries) to host the sessions, to keep the results balanced.
				They are compensated for this work.
			</ui-description>

			{this.renderSessionList('Active Sessions', this.sessions.filter(session => !session.ended))}
			{this.renderSessionList('Finished Sessions', this.sessions.filter(session => session.ended))}
		</ui-law-house>;
	}

	renderSessionList(title: string, sessions: LawHouseSessionSummaryModel[]) {
		if (!sessions.length) {
			return [];
		}

		return <ui-sessions>
			<ui-title>
				{title}
			</ui-title>

			<ui-sessions>
				{sessions.map(session => <ui-session ui-href={`session/${session.id}`}>
					<ui-time>
						{session.started.toLocaleDateString()}
					</ui-time>

					<ui-scope>
						{session.scope.name}
					</ui-scope>
				</ui-session>)}
			</ui-sessions>
		</ui-sessions>;
	}
}
