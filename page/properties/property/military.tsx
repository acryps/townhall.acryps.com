import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { MiliatryService, MilitaryFacilityViewModel, MilitaryUnitSummaryModel } from "../../managed/services";
import { BannerComponent } from "../../banner";
import { Banner } from "../../../interface/banner";
import { fail } from "assert";

export class PropertyMilitaryTab extends Component {
	units: MilitaryUnitSummaryModel[];

	constructor(
		private page: PropertyPage
	) {
		super();
	}

	async onload() {
		this.units = await new MiliatryService().getUnits();
	}

	render() {
		return <ui-military>
			{this.page.property.militaryFacilities.map(facility => {
				const banner = new BannerComponent(this.createBanner(facility));

				return <ui-military-facility>
					<ui-unit ui-href={`/military/unit/${facility.unit?.id}`}>
						{banner}
					</ui-unit>

					<ui-detail>
						<ui-field>
							<label>
								Name
							</label>

							<input
								$ui-value={facility.name}
								ui-change={() => this.save(facility, banner)}
								placeholder={this.page.property.name}
							/>
						</ui-field>

						<ui-field>
							<label>
								Unit
							</label>

							<select $ui-value={facility.unit}
								ui-change={() => this.save(facility, banner)}
							>
								<option ui-value={null}>
									No Stationary Unit
								</option>

								<option disabled></option>

								{this.units.filter(unit => !unit.parentId).flatMap(army => this.renderUnitOptions(army))}
							</select>
						</ui-field>
					</ui-detail>
				</ui-military-facility>
			})}
		</ui-military>
	}

	renderUnitOptions(unit: MilitaryUnitSummaryModel, parents: MilitaryUnitSummaryModel[] = []) {
		const children = this.units.filter(peer => peer.parentId == unit.id);
		const hierarchiy = [...parents, unit];

		return [
			<option ui-value={unit} disabled={!!unit.disbanded}>
				{hierarchiy.map(unit => unit.code).join('-')} {unit.name}
			</option>,

			...children.flatMap(child => this.renderUnitOptions(child, hierarchiy))
		]
	}

	async save(facility: MilitaryFacilityViewModel, banner: BannerComponent) {
		await new MiliatryService().updateFacility(
			facility.id,
			facility.name,
			facility.unit?.id ?? null
		);

		banner.banner = this.createBanner(facility);
		banner.update();
	}

	createBanner(facility: MilitaryFacilityViewModel) {
		if (!facility.unit) {
			return new Banner('white')
		}

		return Banner.unpack(facility.unit.banner)
	}
}
