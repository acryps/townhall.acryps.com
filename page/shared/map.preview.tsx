import { brightness, contrast, grayscale } from "@acryps/style";
import { Point } from "../map/point";
import { Component } from "@acryps/page";

export class MapPreviewComponent extends Component {
	readonly backgroundFilter = [contrast(0.25), brightness(1.5), grayscale(1)].join(' ');

	constructor(
		private shape: Point[]
	) {
		super();
	}

	render() {
		// render output to image instead of canvas to allow saving by user
		const outputImage = new Image();

		const margin = Math.max(10, Math.floor(Point.size(this.shape).max / 5));
		const box = Point.bounds(this.shape, margin);

		requestAnimationFrame(async () => {
			const canvas = new OffscreenCanvas(box.width, box.height);

			let context = canvas.getContext('2d');
			context.moveTo(this.shape[0].x - box.x.min, this.shape[0].y - box.y.min);

			for (let index = 1; index < this.shape.length; index++) {
				context.lineTo(this.shape[index].x - box.x.min, this.shape[index].y - box.y.min);
			}

			context.closePath();
			context.fillStyle = '#888';
			context.fill();
			context.stroke();

			outputImage.src = URL.createObjectURL(await canvas.convertToBlob());

			const image = new Image();

			image.onload = async () => {
				context.save();

				if ('filter' in context as any) {
					context.filter = this.backgroundFilter;
					context.drawImage(image, 0, 0);
				} else {
					// safari does not support filter
					context.drawImage(image, 0, 0);

					const imageData = context.getImageData(0, 0, box.width, box.height);
					let index = 0;

					while (index < imageData.data.length) {
						// make it a big brighter
						const gray = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 4 + 0xff / 2;

						imageData.data[index++] = gray;
						imageData.data[index++] = gray;
						imageData.data[index++] = gray;
						index++; // alpha
					}

					context.putImageData(imageData, 0, 0);
				}

				context.restore();
				context.lineWidth = 2;
				context.strokeStyle = '#000';
				context.stroke();

				context.clip();
				context.drawImage(image, 0, 0);

				outputImage.src = URL.createObjectURL(await canvas.convertToBlob());
			}

			image.src = `/images/area/${box.x.min - world.offset.x}/${box.y.min - world.offset.y}/${box.width}/${box.height}`;
		})

		return <ui-map-preview>
			{outputImage}

			<ui-map-expand ui-href={`/map/${Math.floor(box.x.min + box.width / 2)}/${Math.floor(box.y.min + box.height / 2)}/3`}>+</ui-map-expand>
		</ui-map-preview>;
	}
}
