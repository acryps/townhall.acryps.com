import { Component } from "@acryps/page";
import { SearchComponent } from ".";
import { ResidentViewModel } from "../../managed/services";
import { Time } from "../../../interface/time";

export class SearchResultsComponent extends Component {
	results: ResidentViewModel[] = [];

	render() {
		return <ui-results>
			{this.results.map(result => <ui-result ui-href={`/resident/${result.tag}`}>
				<ui-name>
					{result.givenName} {result.familyName}
				</ui-name>

				<ui-detail>
					<ui-age>
						{new Time(result.birthday).age()}
					</ui-age>
				</ui-detail>
			</ui-result>)}
		</ui-results>
	}
}
