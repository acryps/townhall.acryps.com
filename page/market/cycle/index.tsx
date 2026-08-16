import { Component } from "@acryps/page";
import { MarketCycleSummaryModel, MarketCycleViewModel, MarketService } from "../../managed/services";
import { downAllIcon, downIcon, upIcon } from "../../assets/icons/managed";
import { Time } from "../../../interface/time";
import { MarketPage } from "..";

export class MarketCyclePage extends Component {
	declare parameters: { id };

	cycle: MarketCycleViewModel;
	currentCycle: MarketCycleSummaryModel;
	neighbors: MarketCycleSummaryModel[];

	async onload() {
		this.cycle = await new MarketService().getCycle(this.parameters.id);
		this.currentCycle = await new MarketService().getCurrentCycle();
		this.neighbors = await new MarketService().getCycleNeighbors(this.cycle.opened);
	}

	render() {
		return <ui-cycle>
			{this.renderNeighbors(
				upIcon,
				this.neighbors.filter(neighbor => neighbor.opened < this.cycle.opened)
			)}

			<ui-name>
				Market Cycle #{this.cycle.id.split('-')[0]}
			</ui-name>

			<ui-context>
				{this.cycle.context}
			</ui-context>

			{this.renderNeighbors(
				downIcon,
				this.neighbors.filter(neighbor => neighbor.opened > this.cycle.opened),
			)}

			{!this.neighbors.find(neighbor => neighbor.id == this.currentCycle.id) && this.cycle.id != this.currentCycle.id && this.renderNeighbors(
				downAllIcon,
				[this.currentCycle]
			)}
		</ui-cycle>
	}

	private renderNeighbors(icon: () => HTMLElement, neighbors: MarketCycleSummaryModel[]) {
		return <ui-neighbors>
			{neighbors.map(neighbor => <ui-neighbor ui-href={`../${neighbor.id}`}>
				{icon()}

				<ui-name>
					Market Cycle #{neighbor.id.split('-')[0]}
				</ui-name>

				<ui-opened>
					{new Time(neighbor.opened).toString()}
				</ui-opened>
			</ui-neighbor>)}
		</ui-neighbors>
	}
}
