import { Component } from "@acryps/page";
import { LifeService, PropertyViewModel } from "./managed/services";
import { MapPreviewComponent } from "./shared/map.preview";
import { Point } from "./map/point";

export class AssertHomePage extends Component {
	property: PropertyViewModel;

	async onload() {
		this.property = await new LifeService().getNextEmptyProperty();

		onkeypress = async event => {
			if (event.key == 'x') {
				open(`/property/${this.property.id}`);
			}

			let number = +event.key;

			if (event.key == 'q') {
				number = 4 * 9
			}

			if (!isNaN(number)) {
				await new LifeService().dwell(this.property.id, number);

				this.reload();
			}
		};
	}

	render() {
		return <ui-dwell>
			<style>
				{'img { width: 100%; image-rendering: pixelated }'}
			</style>

			{new MapPreviewComponent(Point.unpack(this.property.bounds))}
		</ui-dwell>
	}
}
