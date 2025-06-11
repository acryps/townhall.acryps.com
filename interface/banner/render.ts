import { Banner } from ".";
import { BannerComponent } from "../../page/banner";

export const renderBanner = (
	createCanvas: (width: number, height: number) => OffscreenCanvas,
	banner: Banner,
	patterns: CanvasImageSource & { naturalHeight: number, naturalWidth: number }
) => {
	if (patterns.naturalHeight != Banner.height) {
		throw new Error('Invalid banner source image height');
	}

	const sourceCanvas = createCanvas(patterns.naturalWidth, patterns.naturalHeight);
	const sourceContext = sourceCanvas.getContext('2d');
	sourceContext.drawImage(patterns, 0, 0);

	const sourceData = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

	const bannerCanvas = createCanvas(Banner.width, Banner.height);
	const bannerContext = bannerCanvas.getContext('2d');
	bannerContext.fillStyle = `rgb(${Banner.colors[banner.baseColor]})`;
	bannerContext.fillRect(0, 0, Banner.width, Banner.height);

	const placingCanvas = createCanvas(Banner.width, Banner.height);
	const placingContext = placingCanvas.getContext('2d');

	for (let layer of banner.layers) {
		placingContext.clearRect(0, 0, Banner.width, Banner.height);

		// use disused source canvas to convert color string to bitmap color value
		const color = Banner.colors[layer.color];
		const image = new ImageData(Banner.width, Banner.height);

		for (let x = 0; x < Banner.width; x++) {
			for (let y = 0; y < Banner.height; y++) {
				const intensity = 0xff - sourceData.data[(y * sourceCanvas.width + x + layer.offset * Banner.width) * 4 + 3];

				image.data[(y * Banner.width + x) * 4 + 0] = +color[0];
				image.data[(y * Banner.width + x) * 4 + 1] = +color[1];
				image.data[(y * Banner.width + x) * 4 + 2] = +color[2];
				image.data[(y * Banner.width + x) * 4 + 3] = intensity;
			}
		}

		placingContext.putImageData(image, 0, 0);
		bannerContext.drawImage(placingCanvas, 0, 0);
	}

	return bannerCanvas;
}
