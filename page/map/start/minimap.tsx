import { Component } from "@acryps/page";
import { getMinimapBounds, minimapScale } from "../../../interface/minimap";
import { Application } from "../..";
import { CityService, CityViewModel } from "../../managed/services";
import { px } from "@acryps/style";
import { BoundingBox, Point } from "../../../interface/point";
import { MapStartPage } from ".";
import { calculateDanwinstonShapePath } from "../../../interface/line";

export class MinimapComponent extends Component {
	declare rootNode: HTMLElement;
	declare parent: MapStartPage;

	cities: CityViewModel[];
	bounds: BoundingBox;

	async onload() {
		this.cities = await new CityService().getCities();
		this.bounds = getMinimapBounds(Application.boroughs);
	}

	render() {
		const cursor: HTMLElement = <ui-cursor></ui-cursor>;

		const canvas = document.createElement('canvas');
		canvas.width = this.bounds.width * minimapScale;
		canvas.height = this.bounds.height * minimapScale;

		const context = canvas.getContext('2d');

		requestAnimationFrame(() => {
			if (matchMedia('(hover: hover)').matches) {
				this.rootNode.onmousemove = event => {
					cursor.style.left = px(event.clientX).toValueString();
					cursor.style.top = px(event.clientY).toValueString();

					const point = this.translateToMapPosition(event.clientX, event.clientY);
					const borough = this.getBorough(point);

					context.clearRect(0, 0, this.bounds.width * minimapScale, this.bounds.height * minimapScale);

					if (borough) {
						cursor.textContent = borough.name;

						const bounds = Point.unpack(borough.bounds);

						context.beginPath();
						context.fillStyle = borough.color;

						for (let index = 0; index < bounds.length; index++) {
							const point = bounds[index];

							context[index ? 'lineTo' : 'moveTo'](
								(point.x - this.bounds.x.min) * minimapScale,
								(point.y - this.bounds.y.min) * minimapScale
							);
						}

						context.closePath();
						context.fill();
					} else {
						cursor.textContent = point.toString();
					}
				};
			}

			this.rootNode.onclick = event => {
				const point = this.translateToMapPosition(event.clientX, event.clientY);

				this.navigate(this.parent.go(point.x, point.y));
			}
		});

		return <ui-minimap>
			<img src='/minimap' />
			{canvas}

			{cursor}

			<ui-labels>
				{this.cities.map(city => <ui-label style={[

				].join(';')}>
					{city.name}
				</ui-label>)}
			</ui-labels>
		</ui-minimap>;
	}

	getBorough(target: Point) {
		for (let borough of Application.boroughs) {
			if (Point.contains(Point.unpack(borough.bounds), target)) {
				return borough;
			}
		}
	}

	translateToMapPosition(x: number, y: number) {
		const containerAspect = innerWidth / innerHeight;
		const imageAspect = this.bounds.width / this.bounds.height;

		let scale;
		let offsetX = 0;
		let offsetY = 0;

		if (imageAspect > containerAspect) {
			scale = innerHeight / this.bounds.height;
			const displayWidth = this.bounds.width * scale;
			offsetX = (displayWidth - innerWidth) / 2;
		} else {
			scale = innerWidth / this.bounds.width;
			const displayHeight = this.bounds.height * scale;
			offsetY = (displayHeight - innerHeight) / 2;
		}

		return new Point(
			((x + offsetX) / scale) + this.bounds.x.min,
			((y + offsetY) / scale) + this.bounds.y.min
		).floor();
	}
}
