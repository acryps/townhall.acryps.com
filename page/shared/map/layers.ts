import { MapLayer } from "./layer/index";

export const baseLayer = MapLayer.fromTileSource((x, y) => `/tile/base/day/${x}/${y}`, 250);
export const nightLayer = MapLayer.fromTileSource((x, y) => `/tile/base/night/${x}/${y}`, 250);

export const propertyLayer = MapLayer.fromShapeSource((x, y) => `/tile/property/${x}/${y}`, 500, (x, y) => `/pick/property/${x}/${y}`, id => `/go/${id}`);
export const boroughLayer = MapLayer.fromShapeSource((x, y) => `/tile/borough/${x}/${y}`, 500, (x, y) => `/pick/borough/${x}/${y}`, id => `/go/${id}`);
export const propertyUsageLayer = MapLayer.fromShapeSource((x, y) => `/tile/usage/${x}/${y}`, 500, (x, y) => `/pick/usage/${x}/${y}`, id => `/go/${id}`);
export const streetLayer = MapLayer.fromShapeSource((x, y) => `/tile/street/${x}/${y}`, 500);

export const movementHeatmapLayer = MapLayer.fromTileSource((x, y) => `/tile/movement/${x}/${y}`, 250);
