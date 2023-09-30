import { world } from "../map/elements/map";
import { Point } from "../map/point";
import { Component } from "@acryps/page";

export class MapPreviewComponent extends Component {
	margin = 20;

	constructor(
		private shape: Point[]
	) {
		super();
	}

	render() {
		let canvas: HTMLCanvasElement;

		let margin = this.margin + Point.bounds(this.shape).height;
		const box = Point.bounds(this.shape, margin);

		requestAnimationFrame(() => {
			canvas.width = box.width;
			canvas.height = box.height;

			let context = canvas.getContext('2d');
			context.fillStyle = '#fff8';

			context.moveTo(this.shape[0].x - box.x.min + 0.5, this.shape[0].y - box.y.min + 0.5);

			for (let index = 1; index < this.shape.length; index++) {
				context.lineTo(this.shape[index].x - box.x.min + 0.5, this.shape[index].y - box.y.min + 0.5);
			}

			context.closePath();
			context.stroke();

			const image = new Image();

			image.onload = () => {
				context.drawImage(image, 0, 0);

				context.stroke();
				context.fill();
			}

			image.src = `/images/area/${box.x.min - world.offset.x}/${box.y.min - world.offset.y}/${box.width}/${box.height}`;
		})

		return <ui-map-preview>
			{canvas = <canvas></canvas>}

			<ui-map-expand ui-href={`/map/${Math.floor(box.x.min + box.width / 2)}/${Math.floor(box.y.min + box.height / 2)}/3`}>+</ui-map-expand>
		</ui-map-preview>;
	}
}