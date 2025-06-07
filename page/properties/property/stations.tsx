import { Component } from "@acryps/page";
import { PropertyPage } from ".";
import { deleteIcon } from "../../assets/icons/managed";
import { PropertyTrainStationViewModel, TrainService, TrainStationViewModel } from "../../managed/services";
import { TrainRouteIconComponent } from "../../shared/train-route";
import { LegalEntityComponent } from "../../shared/legal-entity";

export class PropertyStationsTab extends Component {
	stations: TrainStationViewModel[];

	constructor(
		private page: PropertyPage,
		private station: PropertyTrainStationViewModel
	) {
		super();
	}

	async onload() {
		this.stations = await new TrainService().getStations();
	}

	render() {
		return <ui-station>
			<ui-field>
				<label>
					Name
				</label>

				<input $ui-value={this.station.name} placeholder={this.page.property.name || 'Name'}></input>
			</ui-field>

			<ui-stops>
				{this.station.stops.sort((a, b) => a.closed ? 1 : a.route.code.localeCompare(b.route.code)).map(stop => {
					const stationNames = stop.route.stops.map(stop => {
						if (stop.name) {
							return stop.name;
						}

						const station = this.stations.find(station => station.id == stop.stationId);

						return station.name || station.property.name;
					});

					return <ui-stop ui-closed={!!stop.closed}>
						<ui-route>
							{new TrainRouteIconComponent(stop.route)}

							{stop.route.name}
						</ui-route>

						<ui-operator>
							{new LegalEntityComponent(stop.route.operator)}
						</ui-operator>

						<ui-stops>
							<ui-end>
								{stationNames[0]}
							</ui-end>

							to

							<ui-end>
								{stationNames.at(-1)}
							</ui-end>
						</ui-stops>

						<ui-field>
							<label>
								Stop Name
							</label>

							<input $ui-value={stop.name} placeholder={this.station.name || this.page.property.name} />
						</ui-field>

						<ui-platforms>
							<ui-field>
								<label>
									Forward Platform
								</label>

								<input $ui-value={stop.upPlatform}></input>
							</ui-field>

							<ui-field>
								<label>
									Reverse Platform
								</label>

								<input $ui-value={stop.downPlatform}></input>
							</ui-field>
						</ui-platforms>
					</ui-stop>
				})}
			</ui-stops>

			<ui-actions>
				<ui-action>
					{deleteIcon()} Decomission Station
				</ui-action>
			</ui-actions>
		</ui-station>;
	}
}
