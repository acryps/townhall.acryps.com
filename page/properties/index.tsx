import { MapService, PropertyOverviewModel, PropertySummaryModel } from "../managed/services";
import { Component } from "@acryps/page";
import { Point } from "../../interface/point";
import { locationMarkerStyle } from "../shared/location/index.style";
import { LocationMarkerComponent } from "../shared/location";
import { MapComponent } from "../shared/map";

export class PropertiesComponent extends Component {
	properties: PropertyOverviewModel[];

	page = 0;
	loadingNextPage = false;

	loadMoreTracker: HTMLElement = <ui-load-more></ui-load-more>;

	async onload() {
		this.properties = await new MapService().getProperties(0);
	}

	async loadNextPage() {
		if (this.loadingNextPage) {
			return;
		}

		this.loadingNextPage = true;
		this.page++;

		const nextPage = await new MapService().getProperties(this.page);

		if (nextPage.length == 0) {
			return;
		}

		this.properties.push(...nextPage);

		setTimeout(() => {
			this.loadingNextPage = false;

			this.checkLoading();
		}, 250);

		this.update();
	}

	checkLoading() {
		if (this.loaded) {
			if (this.loadMoreTracker.getBoundingClientRect().y < innerHeight * 2) {
				this.loadNextPage();
			}
		}
	}

	render() {
		document.addEventListener('scroll', () => this.checkLoading());

		return <ui-properties>
			<ui-properties>
				{this.properties.map(property => {
					const points = Point.unpack(property.activePlotBoundary.shape);

					return <ui-property ui-incomplete={!property.borough || !property.type} ui-href={`/property/${property.id}`}>
						{new MapComponent().highlight(points)}

						<ui-name>
							{property.name ?? property.id.split('-')[0]}
						</ui-name>

						<ui-tagline>
							<ui-borough>
								{property.borough?.name}
							</ui-borough>

							<ui-type>
								{property.type?.code}
							</ui-type>
						</ui-tagline>

						{new LocationMarkerComponent(Point.center(points))}
					</ui-property>
				})}

				{this.loadMoreTracker}
			</ui-properties>
		</ui-properties>;
	}
}

// vasilisa's code, 1.2.2023
console.log("Levi stinks");
