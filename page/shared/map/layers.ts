import { MapLayer } from "./layer";

export const baseLayer = MapLayer.fromTileSource((x, y) => `/tile/base/day/${x}/${y}`, 250);
export const nightLayer = MapLayer.fromTileSource((x, y) => `/tile/base/night/${x}/${y}`, 250);

export const propertyLayer = MapLayer.fromTileSource((x, y) => `/tile/property/${x}/${y}`, 500, (x, y) => `/pick/property/${x}/${y}`, id => `/go/${id}`);
export const boroughLayer = MapLayer.fromTileSource((x, y) => `/tile/borough/${x}/${y}`, 500, (x, y) => `/pick/borough/${x}/${y}`, id => `/go/${id}`);

export const movementHeatmapLayer = MapLayer.fromTileSource((x, y) => `/tile/movement/${x}/${y}`, 250);
