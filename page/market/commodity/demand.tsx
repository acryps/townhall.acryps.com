import { Component } from "@acryps/page";
import { CommodityViewModel, DemandViewModel, MarketService } from "../../managed/services";
import { Time } from "../../../interface/time";
import { formatTradingUnit } from "../../../interface/trading-unit";

export class CommodityDemandTab extends Component {
	timeline: DemandViewModel[];

	constructor(
		public commodity: CommodityViewModel
	) {
		super();
	}

	async onload() {
		this.timeline = await new MarketService().getDemand(this.commodity.id);
	}

	render() {
		return <ui-demand>
			<ui-description>
				The demand lists how much residents want to own a commodity.
				Values are targets, representing how much someone would like to have at home / on them.
				Companies will try to meet the demand.

				Demand may shift at any time and point, because sometimes, consumer habits change.
			</ui-description>

			<ui-timeline>
				{this.timeline.map(demand => <ui-demand ui-active={demand.active}>
					<ui-activates>
						{new Time(demand.activates).toDateString()}
					</ui-activates>

					<ui-target>
						{formatTradingUnit(this.commodity.tradingUnit, demand.target)}
					</ui-target>
				</ui-demand>)}
			</ui-timeline>
		</ui-demand>;
	}
}
