import { Component } from "@acryps/page";
import { TrainRouteViewModel, TrainService, TrainStationViewModel } from "../managed/services";
import { routeColor } from "./index.style";
import { hex } from "@acryps/style";
import { TrainRouteIconComponent } from "../shared/train-route";
import { routeInterchangeIcon } from "../assets/icons/managed";
import { convertToLegalCompanyName } from "../../interface/company";

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

				{route.operator && <ui-operator ui-href={`/company-office/company/${route.operator.tag}`}>
					Operated by {convertToLegalCompanyName(route.operator)}
				</ui-operator>}

				<ui-stops>
					{route.stops.map(stop => {
						const station = this.stations.find(station => station.id == stop.stationId);
						const interchangePeers = this.findInterchangePeers(route, station);

						return <ui-stop>
							<ui-name>
								{station.name}
							</ui-name>

							{interchangePeers.length != 0 && <ui-interchange>
								{routeInterchangeIcon()}

								<ui-routes>
									{interchangePeers.map(peer => new TrainRouteIconComponent(peer))}
								</ui-routes>
							</ui-interchange>}
						</ui-stop>
					})}
				</ui-stops>
			</ui-train-route>)}
		</ui-trains>;
	}

	findInterchangePeers(base: TrainRouteViewModel, station: TrainStationViewModel) {
		const peers = [];

		for (let route of this.routes) {
			if (base.code != route.code) {
				if (route.stops.find(stop => stop.stationId == station.id)) {
					peers.push(route);
				}
			}
		}

		return peers;
	}
}
