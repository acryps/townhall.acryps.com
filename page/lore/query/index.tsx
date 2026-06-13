import { Component } from "@acryps/page";
import { LoreQueryViewModel, LoreService } from "../../managed/services";
import { Time } from "../../../interface/time";

export class LoreQueryPage extends Component {
	declare parameters: { id };

	query: LoreQueryViewModel;

	async onload() {
		this.query = await new LoreService().getAnswer(this.parameters.id);
	}

	render() {
		if (!this.query.answer) {
			setTimeout(() => this.reload(), 1000);
		}

		return <ui-query>
			<ui-question>
				<ui-header>
					Question
				</ui-header>

				{this.query.question}
			</ui-question>

			{this.query.answer ? <ui-answer>
				<ui-answer>
					<ui-header>
						Answer
					</ui-header>

					{this.query.answer}
				</ui-answer>

				{this.query.sources.length != 0 && <ui-sources>
					<ui-header>
						Sources
					</ui-header>

					{this.query.sources.map(source => <ui-source>
						<ui-relation>
							{source.relation}
						</ui-relation>

						<ui-lore ui-href={`../../${source.lore.id}`}>
							<ui-tagline>
								{new Time(source.lore.timestamp).toString()}
							</ui-tagline>

							<ui-title>
								{source.lore.title}
							</ui-title>
						</ui-lore>
					</ui-source>)}
				</ui-sources>}
			</ui-answer> : <ui-answering>
				Question is being answered...
			</ui-answering>}
		</ui-query>
	}
}
