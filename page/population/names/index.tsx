import { Component } from "@acryps/page";
import { LifeService, NameFrequencyViewModel } from "../../managed/services";

export class ResidentNamesPage extends Component {
	given: NameFrequencyViewModel[];
	family: NameFrequencyViewModel[];

	async onload() {
		this.given = await new LifeService().listGivenNameFrequencies();
		this.family = await new LifeService().listFamilyNameFrequencies();
	}

	render() {
		return <ui-name-frequencies>
			{this.renderFrequencies(this.given)}
			{this.renderFrequencies(this.family)}
		</ui-name-frequencies>
	}

	renderFrequencies(frequencies: NameFrequencyViewModel[]) {
		return <ui-frequencies>
			{frequencies.sort((a, b) => {
				if (a.count == b.count) {
					return a.name.localeCompare(b.name);
				}

				return b.count - a.count;
			}).map(frequency => <ui-frequency>
				<ui-name>
					{frequency.name}
				</ui-name>

				<ui-count>
					{frequency.count}
				</ui-count>
			</ui-frequency>)}
		</ui-frequencies>
	}
}
