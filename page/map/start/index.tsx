import { Component } from "@acryps/page";
import { CityService, CityViewModel, MapService } from "../../managed/services";
import { Point } from "../../../interface/point";

export class MapStartPage extends Component {
	static readonly lastLocationStorageKey = 'lastLocation';

	cities: CityViewModel[];

	async onload() {
		this.cities = await new CityService().getCities();
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

			<ui-cities>
				{this.cities.map(city => <ui-city ui-href={this.go(city.centerX, city.centerY)}>
					{city.mainImpressionId && 	<img ui-current src={`/impression/image/${city.mainImpressionId}`} />}

					<ui-detail>
						<ui-name>
							{city.name}
						</ui-name>

						<ui-incorporation>
							Incorporated {city.incorporated.toLocaleDateString()}
						</ui-incorporation>
					</ui-detail>
				</ui-city>)}
			</ui-cities>
		</ui-map-start>
	}

	go(x: number, y: number) {
		return `/map/${x}/${y}/5`;
	}
}
