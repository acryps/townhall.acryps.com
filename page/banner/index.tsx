import { Component } from "@acryps/page";
import { HistoryEntryViewModel } from "../managed/services";
import { Hex, Rgb, rgb } from "@acryps/style";
import { renderBanner } from "../../interface/banner/render";
import { Banner } from "../../interface/banner";

export class BannerComponent extends Component {
	static maxLayerCount = 7;

	static patterns: Promise<HTMLImageElement>;
	static cache = new Map<string, Promise<string>>();

	constructor(
		public banner: Banner
	) {
		super();

		if (!BannerComponent.patterns) {
			BannerComponent.patterns = new Promise(done => {
				const image = new Image();
				image.src = '/assets/banner/index.webp';

				image.onload = () => done(image);
			});
		}
	}

	render() {
		requestAnimationFrame(async () => {
			const image = await BannerComponent.patterns;
			const cached = BannerComponent.cache.get(this.banner.pack());

			if (cached) {
				const image = new Image();
				image.src = await cached;

				this.rootNode.appendChild(image);

				return;
			}

			const task = new Promise<string>(async done => {
				const rendered = renderBanner(
					(width, height) => new OffscreenCanvas(width, height),
					this.banner,
					await BannerComponent.patterns
				);

				done(URL.createObjectURL(await rendered.convertToBlob()));
			});

			task.then(blob => {
				const bannerImage = new Image();
				bannerImage.src = blob;

				this.rootNode.appendChild(bannerImage);
			});

			BannerComponent.cache.set(this.banner.pack(), task);
		});

		return <ui-banner></ui-banner>;
	}
}
