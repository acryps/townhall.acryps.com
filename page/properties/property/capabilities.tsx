import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { MiliatryService, TrainService } from "../../managed/services";

export class PropertyCapabilitiesTab extends Component {
	constructor(
		private page: PropertyPage
	) {
		super();
	}

	render() {
		return <ui-capabilities>
			<ui-capability>
				<ui-register>
					<ui-name>
						Railway Station / Stop
					</ui-name>

					<ui-description>
						Register as a station that can be inserted as a railway station.
						A property can have multiple stations registered to it.
						Even a normal house can have a station registered to it, for example if it contains a metro exit.
					</ui-description>

					<ui-actions>
						<ui-action ui-click={async () => {
							this.page.property.trainStations.push(await new TrainService().registerStation(this.page.property.id));

							this.update();
						}}>
							Register Station
						</ui-action>
					</ui-actions>
				</ui-register>

				<ui-registrations>
					{this.page.property.trainStations.map(station => <ui-registration>
						<ui-name>
							{station.name ?? this.page.property.name}
						</ui-name>

						{station.stops.filter(stop => !stop.closed).length == 0 && <ui-action>
							Decomission Station
						</ui-action>}
					</ui-registration>)}
				</ui-registrations>
			</ui-capability>

			<ui-capability>
				<ui-register>
					<ui-name>
						Military Facility
					</ui-name>

					<ui-description>
						Mark this property as a military facility to be able to host military units here.
						Marking a property as a military facility will blur the area on the map.
					</ui-description>

					<ui-actions>
						<ui-action ui-click={async () => {
							this.page.property.militaryFacilities.push(await new MiliatryService().assignFacility(this.page.property.id));

							this.update();
						}}>
							Register Facility
						</ui-action>
					</ui-actions>
				</ui-register>

				<ui-registrations>
					{this.page.property.militaryFacilities.map(facility => <ui-registration ui-inactive={!!facility.closed}>
						<ui-name>
							{facility.name ?? this.page.property.name}
						</ui-name>

						<ui-action ui-click={async () => {
							await new MiliatryService().closeFacility(facility.id);
							facility.closed = new Date();

							this.update();
						}}>
							Close Facility
						</ui-action>
					</ui-registration>)}
				</ui-registrations>
			</ui-capability>
		</ui-capabilities>
	}
}
