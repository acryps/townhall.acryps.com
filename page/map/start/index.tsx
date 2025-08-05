import { Component } from "@acryps/page";
import { CityService, CityViewModel, MapService } from "../../managed/services";
import { Point } from "../../../interface/point";
import { getMinimapBounds } from "../../../interface/minimap";
import { Application } from "../..";
import { MinimapComponent } from "./minimap";

export class MapStartPage extends Component {
	static readonly lastLocationStorageKey = 'lastLocation';

	render() {
		const lastLocation = localStorage.getItem(MapStartPage.lastLocationStorageKey) && Point.unpackSingle(localStorage.getItem(MapStartPage.lastLocationStorageKey));

		return <ui-map-start>
			{new MinimapComponent()}

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
		</ui-map-start>
	}

	go(x: number, y: number) {
		return `/map/${x}/${y}/5`;
	}
}
