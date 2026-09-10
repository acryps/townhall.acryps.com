import { Component } from "@acryps/page";
import { CityService, CityViewModel, GameService, MapService, PlayerPositionViewModel } from "../../managed/services";
import { Point } from "../../../interface/point";
import { getMinimapBounds } from "../../../interface/minimap";
import { Application } from "../..";
import { MinimapComponent } from "./minimap";
import { exploreIcon, goIcon } from "../../assets/icons/managed";
import { Tabs } from "../../shared/tabs";

export class MapStartPage extends Component {
	static readonly lastLocationStorageKey = 'lastLocation';

	cities: CityViewModel[];
	players: PlayerPositionViewModel[];

	async onload() {
		this.cities = await new CityService().getCities();
		this.players = await new GameService().getPlayerPositions();
	}

	render() {
		const lastLocation = localStorage.getItem(MapStartPage.lastLocationStorageKey) && Point.unpackSingle(localStorage.getItem(MapStartPage.lastLocationStorageKey));

		return <ui-map-start>
			<ui-actions>
				{lastLocation && <ui-action ui-href={this.go(lastLocation.x, lastLocation.y)}>
					Last Viewed
				</ui-action>}

				<ui-action ui-click={async () => {
					const point = Point.unpackSingle(await new MapService().getLastChangeLocation());

					this.navigate(this.go(point.x, point.y));
				}}>
					Last Change
				</ui-action>
			</ui-actions>

			{new Tabs()
				.addTab('Cities', <ui-cities>
					{this.cities.map(city => <ui-city ui-href={`${city.centerX}/${city.centerY}/6`}>
						<img src={`/impression/image/${city.mainImpressionId}`} />

						<ui-label>
							<ui-name>
								{city.name}
							</ui-name>

							<ui-location>
								{city.centerX} / {city.centerY}
							</ui-location>
						</ui-label>

						<ui-detail>
							<ui-description>
								{city.description}
							</ui-description>

							{exploreIcon()}
						</ui-detail>
					</ui-city>)}
				</ui-cities>)
				.addTab('Players', <ui-players>
					{this.players.map(player => {
						const lastSeen = Math.floor((Date.now() - +player.time) / (1000 * 60 * 60 * 24));

						return <ui-player>
							<img src={`/player/head/${player.id}`} />

							<ui-label>
								<ui-name>
									{player.username}
								</ui-name>

								{lastSeen ? <ui-last-seen>
									Last seen {lastSeen} days ago
								</ui-last-seen> : <ui-last-seen>
									Last seen today
								</ui-last-seen>}
							</ui-label>
						</ui-player>
					})}
				</ui-players>)
			}
		</ui-map-start>
	}

	go(x: number, y: number) {
		return `/map/${x}/${y}/5`;
	}
}
