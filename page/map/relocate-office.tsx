import { Component } from "@acryps/page";
import { Action } from "../action";
import { MapPage } from ".";
import { MapLayer } from "../shared/map/layer";
import { CompanyOfficeService, CompanyViewModel, OfficeViewModel } from "../managed/services";
import { convertToLegalCompanyName } from "../../interface/company";

export class RelocateOfficeAction extends Action {
	declare parent: MapPage;
	declare parameters: { officeId: string };

	office: OfficeViewModel;
	company: CompanyViewModel;

	async activate() {
		this.office = await new CompanyOfficeService().getOffice(this.parameters.officeId);
		this.company = await new CompanyOfficeService().find(this.office.company.tag);

		const relocateOfficeLayer = MapLayer.fromShapeSource((x, y) => `/tile/relocate-office/${this.parameters.officeId}/${x}/${y}`, 500, 'source-over', true, async shape => {
			await new CompanyOfficeService().relocateOfficeToProperty(this.parameters.officeId, shape.id);

			history.back();
		});

		requestAnimationFrame(() => {
			this.parent.toolbar.toggleLayer(relocateOfficeLayer);
		});
	}

	renderPanel() {
		if (!this.office || !this.company) {
			return [];
		}

		return <ui-relocate-office>
			<ui-title>
				{convertToLegalCompanyName(this.office.company)}
			</ui-title>

			{this.company.description && <ui-purpose>
				{this.company.description}
			</ui-purpose>}
		</ui-relocate-office>;
	}
}
