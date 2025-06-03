import { MapLayer } from "./layer/index";

export const baseLayer = MapLayer.fromTileSource((x, y) => `/tile/base/day/${x}/${y}`, 250, 'source-over');
export const nightLayer = MapLayer.fromTileSource((x, y) => `/tile/base/night/${x}/${y}`, 250, 'source-over');

export const timeMachineLayer = (date: Date) => MapLayer.fromTileSource((x, y) => `/tile/time-machine/${x}/${y}/${+date}`, 250, 'source-over');

export const propertyLayer = MapLayer.fromShapeSource((x, y) => `/tile/property/${x}/${y}`, 500, 'source-over', true);
export const boroughLayer = MapLayer.fromShapeSource((x, y) => `/tile/borough/${x}/${y}`, 500, 'source-over', true);
export const propertyUsageLayer = MapLayer.fromShapeSource((x, y) => `/tile/usage/${x}/${y}`, 500, 'source-over', true);
export const streetLayer = MapLayer.fromShapeSource((x, y) => `/tile/street/${x}/${y}`, 500, 'source-over', true);

export const trainRoutesLayer = MapLayer.fromShapeSource((x, y) => `/tile/train-routes/${x}/${y}`, 500, 'source-over');
export const trainRouteLayer = (code: string) => MapLayer.fromShapeSource((x, y) => `/tile/train-route/${code}/${x}/${y}`, 500, 'source-over');

export const movementHeatmapLayer = MapLayer.fromTileSource((x, y) => `/tile/movement/${x}/${y}`, 250, 'source-over');
export const propertyValueHeatmapLayer = MapLayer.fromTileSource((x, y) => `/tile/property-value/${x}/${y}`, 200, 'color');
