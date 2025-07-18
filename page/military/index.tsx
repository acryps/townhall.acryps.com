import { Component } from "@acryps/page";
import { MiliatryService, MilitaryUnitSummaryModel } from "../managed/services";
import { BannerComponent } from "../banner";
import { Banner } from "../../interface/banner";
import { militaryIcon } from "../assets/icons/managed";

export class MilitaryPage extends Component {
	units: MilitaryUnitSummaryModel[];

	async onload() {
		this.units = await new MiliatryService().getUnits();
	}

	render(child) {
		if (child) {
			return <ui-military>
				<ui-header ui-href='/military'>
					{militaryIcon()} Military
				</ui-header>

				{child}
			</ui-military>
		}

		return <ui-military>
			<ui-title>
				Military
			</ui-title>

			<ui-guide>
				Explore the military units and structure of the armed forces.
				Beware that most details are classified and not visible.
			</ui-guide>

			{this.units.filter(unit => !unit.parentId).map(unit => <ui-army>
				{this.renderUnit(unit)}
			</ui-army>)}
		</ui-military>;
	}

	renderUnit(unit: MilitaryUnitSummaryModel, highlight?: MilitaryUnitSummaryModel) {
		const subunits = this.units
			.filter(subunit => subunit.parentId == unit.id)
			.sort((a, b) => a.code.localeCompare(b.code));

		return <ui-unit-hierarchy ui-disbanded={!!unit.disbanded} ui-highlight={highlight?.id == unit.id}>
			<ui-header ui-href={`unit/${unit.id}`}>
				{new BannerComponent(Banner.unpack(unit.banner))}

				<ui-code>
					{unit.code}
				</ui-code>

				<ui-name>
					{unit.name}
				</ui-name>
			</ui-header>

			{subunits.length != 0 && <ui-subunits>
				{subunits.map(unit => this.renderUnit(unit, highlight))}
			</ui-subunits>}
		</ui-unit-hierarchy>
	}
}
