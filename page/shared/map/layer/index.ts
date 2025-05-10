import { PackedPoint, Point } from "../../../../interface/point";
import { Shape } from "../../../../interface/shape";
import { Label } from "./label";

export class MapLayer {
	canvas: OffscreenCanvas;
	context: OffscreenCanvasRenderingContext2D;

	// null tiles are loading - or failed to load
	tiles = new Map<PackedPoint, CanvasImageSource | Promise<CanvasImageSource>>();

	labels: Label[] = [];

	constructor(
		protected source: (x: number, y: number) => Promise<CanvasImageSource>,
		protected size: number,
		public blendMode: GlobalCompositeOperation,
		public pick: (x: number, y: number) => Promise<string>
	) {
		this.canvas = new OffscreenCanvas(1, 1);
		this.context = this.canvas.getContext('2d');
	}

	async update(center: Point, width: number, height: number) {
		const tasks: Promise<any>[] = [];

		for (let tile of this.getTiles(center, width, height)) {
			const tileHash = tile.pack();

			if (this.tiles.has(tileHash)) {
				// we must still wait for loading tiles from previous update calls to complete this update task
				const loader = this.tiles.get(tileHash);

				if (loader instanceof Promise) {
					tasks.push(loader);
				}
			} else {
				const loader = this.source(tile.x, tile.y);
				tasks.push(loader);

				// marks tile as loading
				this.tiles.set(tileHash, loader);

				// load the tile, then save it
				loader.then(image => this.tiles.set(tileHash, image));
			}
		}

		// might never be awaited, if new updates caused new loads
		await Promise.all(tasks);
	}

	protected getTiles(center: Point, width: number, height: number) {
		const tiles: Point[] = [];

		const minX = Math.floor((center.x - width / 2 - this.size / 2) / this.size);
		const maxX = Math.ceil((center.x + width / 2 + this.size / 2) / this.size);

		const minY = Math.floor((center.y - height / 2 - this.size / 2) / this.size);
		const maxY = Math.ceil((center.y + height / 2 + this.size / 2) / this.size);

		for (let x = minX; x < maxX; x++) {
			for (let y = minY; y < maxY; y++) {
				tiles.push(new Point(x, y));
			}
		}

		return tiles;
	}

	render(center: Point, width: number, height: number, superscale: number) {
		const left = Math.floor(center.x - width / 2);
		const top = Math.floor(center.y - height / 2);

		this.canvas.width = width * superscale;
		this.canvas.height = height * superscale;

		this.context.imageSmoothingEnabled = false;

		for (let tile of this.getTiles(center, width, height)) {
			const image = this.tiles.get(tile.pack());

			if (image && !(image instanceof Promise)) {
				const x = tile.x * this.size;
				const y = tile.y * this.size;

				this.context.drawImage(image,
					(x - left) * superscale,
					(y - top) * superscale,
					this.size * superscale,
					this.size * superscale
				);
			}
		}

		return this.canvas;
	}

	static fromShapeSource(source: (x: number, y: number) => string, size: number, blendMode: GlobalCompositeOperation, pick?: (x: number, y: number) => string, itemLink?: (item: string) => string) {
		const canvas = new OffscreenCanvas(size, size);
		const context = canvas.getContext('2d');

		const layer = new MapLayer(
			async (x, y) => {
				const shapes: Shape[] = await fetch(source(x, y)).then(response => response.json());
				context.clearRect(0, 0, size, size);

				const offset = new Point(x * size, y * size);

				for (let shape of shapes) {
					Shape.render(shape, offset, context as any);

					if (shape.name) {
						const center = Point.center(Point.unpack(shape.bounds));

						if (center.x >= x * size && center.y >= y * size && center.x <= x * size + size && center.y <= y * size + size) {
							layer.labels.push(new Label(center, shape.name));
						}
					}
				}

				return canvas.transferToImageBitmap();
			},
			size,
			blendMode,
			async (x, y) => {
				if (!pick) {
					return;
				}

				const id = await fetch(pick(x, y)).then(response => response.json());

				if (!id) {
					return;
				}

				return itemLink(id);
			}
		);

		return layer;
	}

	static fromTileSource(source: (x: number, y: number) => string, size: number, blendMode: GlobalCompositeOperation, pick?: (x: number, y: number) => string, itemLink?: (item: string) => string) {
		return new MapLayer(
			async (x, y) => {
				const image = new Image();
				image.src = source(x, y);

				await new Promise<void>(done => image.onload = () => done());

				return image;
			},
			size,
			blendMode,
			async (x, y) => {
				if (!pick) {
					return;
				}

				const id = await fetch(pick(x, y)).then(response => response.json());

				if (!id) {
					return;
				}

				return itemLink(id);
			}
		)
	}
}
