import { Component } from "@acryps/page";
import { Application } from "..";
import { BannerComponent } from "../banner";
import { Banner } from "../../interface/banner";
import { MapComponent } from "../shared/map";
import { Point } from "../../interface/point";

export class BoroughsPage extends Component {
	render() {
		return <ui-boroughs>
			{Application.boroughs.map(borough => {
				const boundary = Point.unpack(borough.activeBoundary.shape);
				const center = Point.center(boundary);

				const map = new MapComponent();
				map.highlight(boundary);
				//map.show(center, 0.5);

				return <ui-borough>
					<ui-preview>
						{map}

						{borough.banner && new BannerComponent(Banner.unpack(borough.banner))}
					</ui-preview>

					<ui-detail>
						<ui-name>
							{borough.name}
						</ui-name>

						{borough.district && <ui-district>
							{borough.district.name}
						</ui-district>}
					</ui-detail>
				</ui-borough>;
			})}
		</ui-boroughs>
	}
}
