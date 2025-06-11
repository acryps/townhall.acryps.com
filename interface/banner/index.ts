export class Banner {
	private readonly generatorFunctionSignature = 'layerGenerator';

	static readonly width = 20;
	static readonly height = 40;

	// from https://www.planetminecraft.com/banner/
	static readonly colors: Record<string, [number, number, number]> = {
		white: [249, 255, 254],
		lightGray: [157, 157, 151],
		gray: [71, 79, 82],
		black: [29, 29, 33],
		yellow: [254, 216, 61],
		orange: [249, 128, 29],
		red: [176, 46, 38],
		brown: [131, 84, 50],
		lime: [128, 199, 31],
		green: [94, 124, 22],
		lightBlue: [58, 179, 218],
		cyan: [22, 156, 156],
		blue: [60, 68, 170],
		pink: [243, 139, 170],
		magenta: [199, 78, 189],
		purple: [137, 50, 184]
	};

	layers: { offset: number, color: string }[] = [];

	constructor(
		public baseColor: string
	) {}

	static unpack(source: string) {
		if (!source) {
			return this.createEmptyBanner();
		}

		const packed = JSON.parse(decodeURIComponent(atob(source)));
		const banner = new Banner(packed[0]);

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

	static createEmptyBanner() {
		return new Banner('white');
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
