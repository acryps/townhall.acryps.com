import { Component } from "@acryps/page";
import { OracleService } from "../../managed/services";

export class AboutComponent extends Component {
	summary: string;

	constructor(
		private id: string
	) {
		super();
	}

	onload() {
		new OracleService().about(this.id).then(summary => {
			this.summary = summary;

			this.update();
		});
	}

	render() {
		return <ui-about>
			<ui-summary>
				{this.summary}
			</ui-summary>

			<ui-hint>
				Generated summary based on item details and news articles referencing this item.
			</ui-hint>

			<ui-id>
				{this.id}
			</ui-id>
		</ui-about>
	}
}
