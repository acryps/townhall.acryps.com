import { Component } from "@acryps/page";
import { SearchComponent } from ".";
import { toSimulatedAge } from "../../../interface/time";
import { ResidentViewModel } from "../../managed/services";

export class SearchResultsComponent extends Component {
	results: ResidentViewModel[] = [];

	render() {
		return <ui-results>
			{this.results.map(result => <ui-result ui-href={`/resident/${result.tag}`}>
				<ui-name>
					{result.givenName} {result.familyName}
				</ui-name>

				<ui-age>
					{toSimulatedAge(result.birthday)}
				</ui-age>
			</ui-result>)}
		</ui-results>
	}
}
