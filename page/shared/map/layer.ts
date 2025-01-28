import { Pc } from "@acryps/style";
import { Point, PackedPoint } from "../../../interface/point";
import { mapOverdraw } from "./index.style";

export class MapLayer {
	// null tiles are loading - or failed to load
	tiles = new Map<PackedPoint, CanvasImageSource | Promise<CanvasImageSource>>();

	canvas: OffscreenCanvas;
	context: OffscreenCanvasRenderingContext2D;

	constructor(
		private source: (x: number, y: number) => Promise<CanvasImageSource>,
		private size: number,
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
				loader.then(image => this.tiles.set(tileHash, image))
			}
		}

		// might never be awaited, if new updates caused new loads
		await Promise.all(tasks);
	}

	private getTiles(center: Point, width: number, height: number) {
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

	render(center: Point, width: number, height: number) {
		const left = Math.floor(center.x - width / 2);
		const top = Math.floor(center.y - height / 2);

		this.canvas.width = width;
		this.canvas.height = height;

		for (let tile of this.getTiles(center, width, height)) {
			const image = this.tiles.get(tile.pack());

			if (image && !(image instanceof Promise)) {
				const x = tile.x * this.size;
				const y = tile.y * this.size;

				this.context.drawImage(image, x - left, y - top, this.size, this.size);
			}
		}

		return this.canvas;
	}

	static fromTileSource(source: (x: number, y: number) => string, size: number, pick?: (x: number, y: number) => string, itemLink?: (item: string) => string) {
		return new MapLayer(
			async (x, y) => {
				const image = new Image();
				image.src = source(x, y);

				await new Promise<void>(done => image.onload = () => done());

				return image;
			},
			size,
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
