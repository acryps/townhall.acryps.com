import { Component } from "@acryps/page";
import { LoreService, LoreViewModel } from "../../managed/services";
import { Time } from "../../../interface/time";

export class LoreItemPage extends Component {
	declare parameters: { id };

	lore: LoreViewModel;

	async onload() {
		this.lore = await new LoreService().getLore(this.parameters.id);
	}

	render(child) {
		if (child) {
			return <ui-lore>
				<ui-timestamp>
					{new Time(this.lore.timestamp).toString()}
				</ui-timestamp>

				<ui-title>
					{this.lore.title}
				</ui-title>

				{child}
			</ui-lore>
		}

		return <ui-lore>
			<ui-timestamp>
				{new Time(this.lore.timestamp).toString()}
			</ui-timestamp>

			<ui-title>
				{this.lore.title}
			</ui-title>

			<ui-actions>
				{this.lore.source && <ui-action ui-click={() => open(`/go/${this.lore.source}`)}>
					View Source
				</ui-action>}

				<ui-action ui-href='expand'>
					Expand Lore
				</ui-action>
			</ui-actions>

			<ui-context>
				{this.lore.context}
			</ui-context>

			<ui-facts>
				{this.lore.facts}
			</ui-facts>
		</ui-lore>
	}
}
