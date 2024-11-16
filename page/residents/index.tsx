import { Component } from "@acryps/page";
import { LifeService, ResidentSummaryModel } from "../managed/services";
import { toSimulatedAge, toSimulatedTime } from "../../interface/time";

export class ResidentsPage extends Component {
	residents: ResidentSummaryModel[];

	page = 0;
	loadingNextPage = false;

	async onload() {
		this.residents = await new LifeService().listResidents(0);
	}

	async loadNextPage() {
		if (this.loadingNextPage) {
			return;
		}

		this.loadingNextPage = true;
		this.page++;

		const nextPage = await new LifeService().listResidents(this.page);

		if (nextPage.length == 0) {
			return;
		}

		this.residents.push(...nextPage);
		this.loadingNextPage = false;

		this.update();
	}

	render() {
		const loadMoreTracker: HTMLElement = <ui-load-more></ui-load-more>;

		requestAnimationFrame(() => {
			document.addEventListener('scroll', () => {
				if (this.loaded) {
					if (loadMoreTracker.getBoundingClientRect().y < innerHeight) {
						this.loadNextPage();
					}
				}
			});
		})

		return <ui-residents>
			{this.residents.map(resident => <ui-resident ui-href={resident.id}>
				<ui-name>
					<ui-given-name>
						{resident.givenName}
					</ui-given-name>

					<ui-family-name>
						{resident.familyName}
					</ui-family-name>
				</ui-name>

				<ui-age>
					{toSimulatedAge(resident.birthday)} years old
				</ui-age>
			</ui-resident>)}

			{loadMoreTracker}
		</ui-residents>
	}
}
