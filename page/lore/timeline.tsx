import { Component } from "@acryps/page";
import { LoreService, LoreSummaryViewModel } from "../managed/services";
import { Time } from "../../interface/time";

export class LoreTimelineComponent extends Component {
	timeline: LoreSummaryViewModel[] = [];

	async onload() {
		await this.loadNextPage();
	}

	async loadNextPage() {
		const timeline = await new LoreService().getTimeline(this.timeline.at(-1)?.timestamp ?? new Date());

		this.timeline.push(...timeline);
		this.timeline.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
	}

	render() {
		return <ui-timeline>
			{this.timeline.map(lore => <ui-lore ui-href={lore.id}>
				<ui-tagline>
					{new Time(lore.timestamp).toString()}
				</ui-tagline>

				<ui-title>
					{lore.title}
				</ui-title>

				<ui-facts>
					{lore.facts}
				</ui-facts>
			</ui-lore>)}

			<ui-actions>
				<ui-action ui-click={async () => {
					await this.loadNextPage();

					this.update();
				}}>
					Load more
				</ui-action>
			</ui-actions>
		</ui-timeline>
	}
}
