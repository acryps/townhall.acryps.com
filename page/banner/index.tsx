import { Component } from "@acryps/page";
import { HistoryEntryViewModel } from "../managed/services";
import { Rgb, rgb } from "@acryps/style";

export class BannerComponent extends Component {
	private readonly generatorFunctionSignature = 'layerGenerator';

	readonly width = 20;
	readonly height = 40;

	// from https://www.planetminecraft.com/banner/
	static readonly colors: Record<string, Rgb> = {
		white: rgb(249, 255, 254),
		lightGray: rgb(157, 157, 151),
		gray: rgb(71, 79, 82),
		black: rgb(29, 29, 33),
		yellow: rgb(254, 216, 61),
		orange: rgb(249, 128, 29),
		red: rgb(176, 46, 38),
		brown: rgb(131, 84, 50),
		lime: rgb(128, 199, 31),
		green: rgb(94, 124, 22),
		lightBlue: rgb(58, 179, 218),
		cyan: rgb(22, 156, 156),
		blue: rgb(60, 68, 170),
		pink: rgb(243, 139, 170),
		magenta: rgb(199, 78, 189),
		purple: rgb(137, 50, 184)
	};

	static maxLayerCount = 7;

	static source: Promise<HTMLImageElement>;
	static cache = new Map<string, Promise<string>>();

	layers: { offset: number, color: string }[] = [];

	constructor(
		public baseColor: string
	) {
		super();

		if (!BannerComponent.source) {
			BannerComponent.source = new Promise(done => {
				const image = new Image();
				image.src = '/assets/banner/index.webp';

				image.onload = () => done(image);
			});
		}
	}

	render() {
		requestAnimationFrame(async () => {
			const image = await BannerComponent.source;
			const cached = BannerComponent.cache.get(this.pack());

			if (cached) {
				const image = new Image();
				image.src = await cached;

				this.rootNode.appendChild(image);

				return;
			}

			if (image.naturalHeight != this.height) {
				throw new Error('Invalid banner source image height');
			}

			const task = new Promise<string>(async done => {
				const sourceCanvas = new OffscreenCanvas(image.naturalWidth, image.naturalHeight);
				const sourceContext = sourceCanvas.getContext('2d');
				sourceContext.drawImage(image, 0, 0);

				const sourceData = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

				const bannerCanvas = new OffscreenCanvas(this.width, this.height);
				const bannerContext = bannerCanvas.getContext('2d');
				bannerContext.fillStyle = BannerComponent.colors[this.baseColor]?.toValueString();
				bannerContext.fillRect(0, 0, this.width, this.height);

				const placingCanvas = new OffscreenCanvas(this.width, this.height);
				const placingContext = placingCanvas.getContext('2d');

				for (let layer of this.layers) {
					// use disused source canvas to convert color string to bitmap color value
					const color = BannerComponent.colors[layer.color];
					const image = new ImageData(this.width, this.height);

					for (let x = 0; x < this.width; x++) {
						for (let y = 0; y < this.height; y++) {
							const intensity = 0xff - sourceData.data[(y * sourceCanvas.width + x + layer.offset * this.width) * 4 + 3];

							image.data[(y * this.width + x) * 4 + 0] = +color.red;
							image.data[(y * this.width + x) * 4 + 1] = +color.green;
							image.data[(y * this.width + x) * 4 + 2] = +color.blue;
							image.data[(y * this.width + x) * 4 + 3] = intensity;
						}
					}

					placingContext.putImageData(image, 0, 0);
					bannerContext.drawImage(placingCanvas, 0, 0);
				}

				done(URL.createObjectURL(await bannerCanvas.convertToBlob()))
			});

			task.then(blob => {
				const bannerImage = new Image();
				bannerImage.src = blob;

				this.rootNode.appendChild(bannerImage);
			});

			BannerComponent.cache.set(this.pack(), task);
		});

		return <ui-banner></ui-banner>;
	}

	static unpack(source: string) {
		const packed = JSON.parse(decodeURIComponent(atob(source)));
		const banner = new BannerComponent(packed[0]);

		for (let layer of packed[1]) {
			banner.layers.push({
				offset: layer[0],
				color: layer[1]
			});
		}

		return banner;
	}

	pack() {
		return btoa(encodeURIComponent(JSON.stringify([
			this.baseColor,
			this.layers.map(layer => [layer.offset, layer.color])
		])));
	}

	static get emptyBanner() {
		return new BannerComponent('white');
	}

	get layerTypes() {
		const types: { add: Function, offset: number }[] = [];

		for (let key in this) {
			if (typeof this[key] == 'function' && this.generatorFunctionSignature in this[key]) {
				types.push({
					add: this[key],
					offset: this[key][this.generatorFunctionSignature] as number
				});
			}
		}

		return types;
	}

	// order must be order from source image
	layerOffset = 2;

	addBordure = this.makeLayer();
	addFieldMasoned = this.makeLayer();
	addRoundel = this.makeLayer();
	addCreeperCharge = this.makeLayer();
	addSaltire = this.makeLayer();
	addBordureIndented = this.makeLayer();
	addPerBendSinister = this.makeLayer();
	addPerBend = this.makeLayer();
	addFlowerCharge = this.makeLayer();
	addGradient = this.makeLayer();
	addPerFess = this.makeLayer();
	addPerPale = this.makeLayer();
	addThing = this.makeLayer();
	addLozenge = this.makeLayer();
	addSkullCharge = this.makeLayer();
	addPaly = this.makeLayer();
	addBaseDexterCanton = this.makeLayer();
	addBaseSinisterCanton = this.makeLayer();
	addChiefDexterCanton = this.makeLayer();
	addChiefSinisterCanton = this.makeLayer();
	addCross = this.makeLayer();
	addBase = this.makeLayer();
	addPale = this.makeLayer();
	addBendSinister = this.makeLayer();
	addBend = this.makeLayer();
	addPaleDexter = this.makeLayer();
	addFess = this.makeLayer();
	addPaleSinister = this.makeLayer();
	addChief = this.makeLayer();
	addBaseIndented = this.makeLayer();
	addChiefIndented = this.makeLayer();
	addChevron = this.makeLayer();
	addInvertedChevron = this.makeLayer();
	addPerBendInverted = this.makeLayer();
	addPerBendSinisterInverted = this.makeLayer();
	addBaseGradient = this.makeLayer();
	addPerFessInverted = this.makeLayer();
	addPerPaleInverted = this.makeLayer();
	addGlobe = this.makeLayer();
	addSnout = this.makeLayer();
	addFlow = this.makeLayer();
	addGuster = this.makeLayer();

	private makeLayer() {
		const banner = this;
		const offset = this.layerOffset++;

		const generator = (color: string) => {
			banner.layers.push({
				offset,
				color
			});

			return banner;
		};

		generator[this.generatorFunctionSignature] = offset;

		return generator;
	}
}
