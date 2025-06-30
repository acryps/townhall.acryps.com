import { Component } from "@acryps/page";
import { TrainRouteViewModel, TrainService, TrainStationViewModel } from "../managed/services";
import { routeColor } from "./index.style";
import { hex } from "@acryps/style";
import { TrainRouteIconComponent } from "../shared/train-route";
import { routeInterchangeIcon } from "../assets/icons/managed";
import { convertToLegalCompanyName } from "../../interface/company";
import { LegalEntityComponent } from "../shared/legal-entity";
import { RailwayNetworkComponent } from "./network";
import { MetaTrainTrip } from "@acryps/metadata";

export class TrainsPage extends Component {
	routes: TrainRouteViewModel[];
	stations: TrainStationViewModel[];

	async onload() {
		this.routes = await new TrainService().getRoutes();
		this.stations = await new TrainService().getStations();
	}

	render(child) {
		if (child) {
			return <ui-trains>
				{child}
			</ui-trains>;
		}

		return <ui-trains>
			{new RailwayNetworkComponent()}

			{this.routes.map(route => <ui-train-route ui-href={`route/${route.code}`} style={routeColor.provide(hex(route.color))}>
				<ui-header>
					{new TrainRouteIconComponent(route)}

					<ui-name>
						{route.name}
					</ui-name>
				</ui-header>

				<ui-description>
					{route.description}
				</ui-description>

				{route.operator && <ui-operator>
					Operated by {new LegalEntityComponent(route.operator)}
				</ui-operator>}

				<ui-stops>
					{route.stops.map(stop => {
						const station = this.stations.find(station => station.id == stop.stationId);

						return <ui-stop>
							<ui-name>
								{station.name ?? station.property.name}
							</ui-name>

							{this.renderInterchange(route, station)}
						</ui-stop>
					})}
				</ui-stops>
			</ui-train-route>)}
		</ui-trains>;
	}

	renderInterchange(base: TrainRouteViewModel, station: TrainStationViewModel) {
		const interchangePeers = this.findInterchangePeers(base, station);

		return interchangePeers.length != 0 && <ui-interchange>
			{routeInterchangeIcon()}

			<ui-routes>
				{interchangePeers.map(peer => new TrainRouteIconComponent(peer))}
			</ui-routes>
		</ui-interchange>;
	}

	findInterchangePeers(base: TrainRouteViewModel, station: TrainStationViewModel) {
		return this.findStationRoutes(station).filter(route => route.id != base.id);
	}

	findStationRoutes(station: TrainStationViewModel) {
		const routes: TrainRouteViewModel[] = [];

		for (let route of this.routes) {
			if (route.stops.find(stop => stop.stationId == station.id)) {
				routes.push(route);
			}
		}

		return routes;
	}
}
