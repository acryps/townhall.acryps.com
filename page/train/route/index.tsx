import { Component } from "@acryps/page";
import { TrainRouteViewModel, TrainService } from "../../managed/services";
import { TrainRouteIconComponent } from "../../shared/train-route";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";
import { calculateDanwinstonShapePath } from "../../../interface/line";
import { trainRouteLayer } from "../../shared/map/layers";

export class TrainRoutePage extends Component {
	declare parameters: { code };

	trainRoute: TrainRouteViewModel;

	async onload() {
		this.trainRoute = await new TrainService().getRoute(this.parameters.code);
	}

	render() {
		const path = calculateDanwinstonShapePath(Point.unpack(this.trainRoute.path), false);

		const map = new MapComponent();
		map.show(path[0], 0.5);

		map.layers.push(
			trainRouteLayer(this.trainRoute.code)
		);

		let pixelIndex = 1;
		let direction = 1;

		const nextPixel = () => {
			map.move(path[pixelIndex]);

			if (pixelIndex == path.length - 1 || pixelIndex == 0) {
				direction = -direction;
			}

			pixelIndex += direction;

			if (document.contains(this.rootNode)) {
				setTimeout(() => nextPixel(), 20);
			}
		};

		map.onInitialRenderComplete = () => nextPixel();

		return <ui-route>
			<ui-header>
				{new TrainRouteIconComponent(this.trainRoute)}

				<ui-name>
					{this.trainRoute.name}
				</ui-name>
			</ui-header>

			{map}

			<ui-path>
			</ui-path>
		</ui-route>
	}
}
