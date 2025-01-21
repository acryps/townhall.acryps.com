import { Component } from "@acryps/page";
import { LifeService, ResidentSummaryModel } from "../../managed/services";
import { toSimulatedAge } from "../../../interface/time";
import { SearchResultsComponent } from "./results";

export class SearchComponent extends Component {
	query = '';

	results = new SearchResultsComponent();

	render() {
		const field: HTMLInputElement = <input type='search' $ui-value={this.query} />
		let latest: Promise<any>;

		field.onkeyup = () => {
			this.query = field.value;

			const task = latest = new LifeService().search(this.query).then(results => {
				if (latest != task) {
					return;
				}

				this.results.results = results;
				this.results.update();
			});
		};

		return <ui-search>
			{field}

			{this.results}
		</ui-search>;
	}
}
