import { Component } from "@acryps/page";
import { Action } from "../action";
import { MapPage } from ".";
import { MapLayer } from "../shared/map/layer";
import { PropertyDwellingViewModel, PropertyService } from "../managed/services";
import { Time } from "../../interface/time";

export class RelocateTenancyAction extends Action {
	declare parent: MapPage;
	declare parameters: { dwellingId: string };

	dwelling: PropertyDwellingViewModel;

	async activate() {
		this.dwelling = await new PropertyService().getDwelling(this.parameters.dwellingId);

		const emptyDwellingLayer = MapLayer.fromShapeSource((x, y) => `/tile/relocate-tenancy/${this.parameters.dwellingId}/${x}/${y}`, 500, 'source-over', true, async shape => {
			await new PropertyService().relocateTenancyToProperty(this.parameters.dwellingId, shape.id);

			history.back();
		});

		requestAnimationFrame(() => {
			this.parent.toolbar.toggleLayer(emptyDwellingLayer);
		});
	}

	renderPanel() {
		if (!this.dwelling) {
			return [];
		}

		const activeTenants = this.dwelling.tenants.filter(tenant => !tenant.end);
		const primary = activeTenants[0];

		return <ui-relocate-tenancy>
			<ui-title>
				Relocate #{primary?.id.split('-')[0]}
			</ui-title>

			<ui-subtitle>
				{activeTenants.length} {activeTenants.length == 1 ? 'resident' : 'residents'}
			</ui-subtitle>

			<ui-tenants>
				{activeTenants.map(tenant => <ui-tenant ui-href={`/resident/${tenant.inhabitant.tag}`}>
					<img src={`/resident/image/${tenant.inhabitant.tag}`} />

					<ui-detail>
						<ui-name>
							{tenant.inhabitant.givenName} {tenant.inhabitant.familyName}
						</ui-name>

						<ui-info>
							{new Time(tenant.inhabitant.birthday).age()} years old, here since {new Time(tenant.start).age()} years
						</ui-info>
					</ui-detail>
				</ui-tenant>)}
			</ui-tenants>
		</ui-relocate-tenancy>;
	}
}
