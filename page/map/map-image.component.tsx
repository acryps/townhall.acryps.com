import { Component } from "@acryps/page/built/component";
import { world } from "./elements/map";
import { MapComponent } from "./map.component"

export class MapImageComponent extends Component {
	declare parent: MapComponent;

	source: string;

	size = 250;
	preload = 1;

	tiles = new Map<string, Promise<void>>();

	render() {
		this.parent.onScroll.push(() => {
			this.loadMissingTiles();
		});

		return <ui-map-image style={`--tile-size: ${this.size}; --world-size: ${world.size}`}></ui-map-image>;
	}

	load(source: string) {
		this.source = source;

		// TODO add reloading indicator

		this.tiles = new Map<string, Promise<void>>();
		this.loadMissingTiles();
	}

	async loadMissingTiles() {
		const box = this.parent.rootNode.getBoundingClientRect();

		const left = ((this.parent.x - world.offset.x - box.width / 2 / this.parent.zoom) / this.size) - this.preload;
		const top = ((this.parent.y - world.offset.y - box.height / 2 / this.parent.zoom) / this.size) - this.preload;

		const x = ((this.parent.x - world.offset.x) / this.size) - this.preload;
		const y = ((this.parent.y - world.offset.y) / this.size) - this.preload;		

		const tiles = this.findMissingTiles(Math.max(left, 0), Math.max(top, 0), true, true);
		let unique: { x, y, distance }[] = [];

		for (let tile of tiles) {
			let exists = false;

			for (let existing of unique) {
				if (existing.x == tile.x && existing.y == tile.y) {
					exists = true;
				}
			}

			if (!exists) {
				unique.push({
					...tile,
					distance: Math.sqrt((x - tile.x) ** 2 + (y - tile.y) ** 2)
				});
			}
		}

		unique = unique.sort((a, b) => a.distance - b.distance);

		for (let tile of unique) {
			await this.loadTile(tile.x, tile.y);
		}
	}

	findMissingTiles(x: number, y: number, moveX: boolean, moveY: boolean) {
		if (x < 0 || y < 0 || x > world.size / this.size || y > world.size / this.size) {
			return [];
		}

		const box = this.parent.rootNode.getBoundingClientRect();

		// left
		if (x + this.preload + 1 < (this.parent.x - world.offset.x - box.width / 2 / this.parent.zoom) / this.size) {
			return [];
		}

		// right
		if (x - this.preload - 1 > (this.parent.x - world.offset.x + box.width / 2 / this.parent.zoom) / this.size) {
			return [];
		}
		
		// top
		if (y + this.preload + 1 < (this.parent.y - world.offset.y - box.height / 2 / this.parent.zoom) / this.size) {
			return [];
		}

		// bottom
		if (y - this.preload - 1 > (this.parent.y - world.offset.y + box.height / 2 / this.parent.zoom) / this.size) {
			return [];
		}

		const tiles = [{ 
			x: Math.round(x), 
			y: Math.round(y)
		}];

		if (moveX) {
			tiles.push(...this.findMissingTiles(x + 1, y, true, false));
		}

		if (moveY) {
			tiles.push(...this.findMissingTiles(x, y + 1, false, true));
		}

		if (moveX && moveY) {
			tiles.push(...this.findMissingTiles(x + 1, y + 1, true, true));
		}

		return tiles;
	}

	loadTile(x: number, y: number) {
		const source = this.source;

		if (this.tiles[[x, y].join()]) {
			return;
		}

		return this.tiles[[x, y].join()] = fetch(`${this.source}/${x}/${y}`).then(res => res.blob()).then(res => {
			if (source == this.source) {
				const image = new Image();

				image.onload = () => {
					if (source == this.source) {
						const canvas = document.createElement('canvas');
						canvas.width = this.size;
						canvas.height = this.size;

						canvas.style.setProperty('--x', x.toString());
						canvas.style.setProperty('--y', y.toString());

						this.rootNode.appendChild(canvas);

						const context = canvas.getContext('2d');
						context.drawImage(image, 0, 0);
					}
				};

				image.src = URL.createObjectURL(res);
			}
		});
	}
}