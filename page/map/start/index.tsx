import { Component } from "@acryps/page";
import { CityService, CityViewModel } from "../../managed/services";

export class MapStartPage extends Component {
	cities: CityViewModel[];

	async onload() {
		this.cities = await new CityService().getCities();
	}

	render() {
		return <ui-map-start>
			<ui-cities>
				{this.cities.map(city => <ui-city ui-href={`/map/${city.centerX}/${city.centerY}/5`}>
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
}
