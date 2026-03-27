import { Component } from "@acryps/page";
import { BoroughService, BoroughViewModel, OfficeViewModel, PropertySummaryModel } from "../managed/services";
import { BoundaryComponent } from "../properties/property/boundary";
import { Point } from "../../interface/point";
import { Time } from "../../interface/time";
import { convertToLegalCompanyName } from "../../interface/company";
import { MapComponent } from "../shared/map";

export class BoroughOfficesTab extends Component {
	readonly maxOfferListLength = 8;

	offices: OfficeViewModel[];

	constructor(
		private borough: BoroughViewModel
	) {
		super();
	}

	async onload() {
		this.offices = await new BoroughService().listOffices(this.borough.id);
	}

	render() {
		return <ui-offices>
			{this.offices.map(office => <ui-office ui-href={`/company-office/office/${office.id}`}>
				<ui-detail>
					<ui-company>
						{convertToLegalCompanyName(office.company)}
					</ui-company>

					<ui-office>
						{office.name}
					</ui-office>

					<ui-purpose>
						{office.company.purpose}
					</ui-purpose>

					<ui-offers>
						{office.workOffers.slice(0, this.maxOfferListLength).toSorted((a, b) => a.title.localeCompare(b.title)).map(offer => <ui-offer>
							<ui-count>
								{offer.count}
							</ui-count>

							<ui-title>
								{offer.title}
							</ui-title>
						</ui-offer>)}
					</ui-offers>

					{office.workOffers.length > this.maxOfferListLength && <ui-more>
						+ {office.workOffers.length - this.maxOfferListLength} more...
					</ui-more>}
				</ui-detail>

				<ui-map>
					{new MapComponent().highlight(Point.unpack(office.property.activePlotBoundary.shape))}
				</ui-map>
			</ui-office>)}
		</ui-offices>
	}
}
