import { Component } from "@acryps/page";
import { DistrictViewModel, LawHouseService, LawHouseSessionSummaryModel, LawHouseSessionViewModel } from "../managed/services";
import { lawIcon } from "../assets/icons/managed";

export class LawHousePage extends Component {
	sessions: LawHouseSessionSummaryModel[];

	async onload() {
		this.sessions = await new LawHouseService().getSessions();
	}

	render(child) {
		if (child) {
			return <ui-law-house>
				<ui-header ui-href='/law-house'>
					{lawIcon()} Law House
				</ui-header>

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

		let lastDate: string;

		const days: LawHouseSessionSummaryModel[][]  = [];
		let stack = [];

		for (let session of sessions) {
			const date = session.started.toDateString();

			if (date == lastDate) {
				stack.push(session);
			} else {
				days.push(stack);
				stack = [session];
				lastDate = date;
			}
		}

		days.push(stack);

		return <ui-sessions>
			<ui-title>
				{title}
			</ui-title>

			<ui-calendar>
				{days.filter(day => day.length).map(day => this.renderDay(day))}
			</ui-calendar>
		</ui-sessions>;
	}

	renderDay(day: LawHouseSessionSummaryModel[]) {
		const districts: DistrictViewModel[] = [];

		for (let session of day) {
			if (!districts.find(district => district.id == session.scope.id)) {
				districts.push(session.scope);
			}
		}

		districts.sort((a, b) => a.name.localeCompare(b.name));

		return <ui-day>
			<ui-date>
				{day[0].started.toLocaleDateString()}
			</ui-date>

			<ui-districts>
				{districts.map(district => <ui-district>
					<ui-name>
						{district.name}
					</ui-name>

					<ui-sessions>
						{day.filter(session => session.scope.id == district.id).map(session => <ui-session ui-href={`session/${session.id}`}>
							{session.started.getHours().toString().padStart(2, '0')}:{session.started.getMinutes().toString().padStart(2, '0')} ({Math.ceil((+(session.ended ?? new Date()) - +session.started) / 1000 / 60)}')
						</ui-session>)}
					</ui-sessions>
				</ui-district>)}
			</ui-districts>
		</ui-day>
	}
}
