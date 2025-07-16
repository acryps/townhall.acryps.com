import { createHash, Hash } from "crypto";
import { DbContext, MapTile, MapType } from "./managed/database";
import { Canvas, loadImage } from "skia-canvas";
import { mapBaseTileSize } from "../interface/tile";

const sharp = require('sharp');

export const tilecomplete = async (database: DbContext) => {
	const tiles = await database.mapTile.where(tile => tile.complete == null).toArray();

	const findHoles = (imageData: ImageData) => {
		for (let index = 0; index < imageData.data.length; index += 4 * 64) {
			if (imageData.data[index + 3] == 0) {
				return true;
			}
		}
	}

	for (let tile of tiles) {
		const image = await loadImage(tile.image);

		const canvas = new Canvas(image.width, image.height);
		const context = canvas.getContext('2d');

		context.drawImage(image, 0, 0);

		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

		tile.complete = !findHoles(imageData);
		await tile.update();
	}
}

export const tileimport = async (database: DbContext) => {
	const versions = await fetch('http://minecraft.acryps.com:9941/').then(response => response.text());

	console.log(versions)

	const hashes = [];
	let newest = new Date('2023-12-12 17:06:41'); // last import on old macbook

	for (let tile of await database.mapTile.includeTree({ hash: true, captured: true }).toArray()) {
		hashes.push(tile.hash);

		if (+newest < +tile.captured) {
			newest = tile.captured;
		}
	}

	console.log(hashes);

	const tile = mapBaseTileSize;
	const size = 8000;

	const regions = size / tile;

	// rewind a bit
	newest = new Date(+newest - 1000 * 60 * 60 * 4);

	for (let link of versions.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}%3A[0-9]{2}%3A[0-9]{2}%2B[0-9]{2}%3A[0-9]{2}/g)) {
		const date = new Date(decodeURIComponent(link));

		if (+date > +newest) {
			console.group(date);

			for (let type of ['map', 'night']) {
				try {
					const source = await fetch(`http://minecraft.acryps.com:9941/${link}/${type}.png`).then(response => response.arrayBuffer());
					const canvas = await sharp(Buffer.from(source));

					for (let x = 12; x < 20; x++) {
						for (let y = 14; y < 23; y++) {
							const image = await canvas.extract({
								width: tile,
								height: tile,
								top: y * tile,
								left: x * tile
							}).toBuffer();

							const hash = createHash('sha1').update(image).digest('base64');
							console.log(hashes.includes(hash) ? '.' : '+', type, x, y, hash);

							if (!hashes.includes(hash)) {
								const entry = new MapTile();
								entry.image = image;
								entry.regionX = x - regions / 2;
								entry.regionY = y - regions / 2;
								entry.captured = date;
								entry.hash = hash;
								entry.type = type == 'night' ? MapType.night : MapType.overworld;

								await entry.create();

								hashes.push(hash);
							}
						}
					}
				} catch (error) {
					console.error('ERROR: ', error);
				}
			}

			console.groupEnd();
		}
	}
}
