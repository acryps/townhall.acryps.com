import { Component } from "@acryps/page";
import { PropertyPage } from "..";
import { ValuationComponent } from "../../../shared/valuation";
import { Time } from "../../../../interface/time";
import { LegalEntityComponent } from "../../../shared/legal-entity";

export class PropertyOwnershipPage extends Component {
	declare parent: PropertyPage;

	render(child) {
		if (child) {
			return <ui-ownership-structure>
				{child}
			</ui-ownership-structure>;
		}

		return <ui-ownership-structure>
			{this.parent.property.owners.toSorted((a, b) => +a.aquired - +b.aquired).map(owner => <ui-owner ui-inactive={!!owner.sold}>
				<ui-entity>
					{new LegalEntityComponent(owner.owner)}

					<ui-share>
						{(owner.share * 100).toFixed(1)}%
					</ui-share>
				</ui-entity>

				<ui-aquired>
					<ui-time>
						Aquired {owner.aquired.toLocaleString()}, {new Time(owner.aquired).age()} years ago
					</ui-time>

					{new ValuationComponent(owner.aquiredValuation)}
				</ui-aquired>

				{owner.sold ? <ui-sold>
					<ui-time>
						Sold {owner.sold.toLocaleString()}, {new Time(owner.sold).age()} years ago
					</ui-time>
				</ui-sold> : <ui-actions>
					<ui-action ui-href={`revalue/${owner.id}`}>
						Revalue
					</ui-action>

					<ui-action>
						Sell (MISSING)
					</ui-action>

					<ui-action>
						Inherit (MISSING)
					</ui-action>
				</ui-actions>}
			</ui-owner>)}
		</ui-ownership-structure>
	}
}
