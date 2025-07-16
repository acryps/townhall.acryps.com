import { Point } from "./point";

export const mapBaseTileSize = 250;

export const getTiles = (center: Point, width: number, height: number, size: number) => {
	const tiles: Point[] = [];

	const minX = Math.floor((center.x - width / 2 - size / 2) / size);
	const maxX = Math.ceil((center.x + width / 2 + size / 2) / size);

	const minY = Math.floor((center.y - height / 2 - size / 2) / size);
	const maxY = Math.ceil((center.y + height / 2 + size / 2) / size);

	for (let x = minX; x < maxX; x++) {
		for (let y = minY; y < maxY; y++) {
			tiles.push(new Point(x, y));
		}
	}

	return tiles;
};
