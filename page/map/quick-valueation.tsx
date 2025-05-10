import { Component } from "@acryps/page";
import { Action } from "../action";
import { MapPage } from ".";
import { Point } from "../../interface/point";
import { MapLayer } from "../shared/map/layer";
import { PropertyService } from "../managed/services";

export class QuickValueationAction extends Action {
	declare parent: MapPage;

	plotPrice = 100;
	buildingPrice = 480;

	async activate() {
		const propertyOwnershipLayer = MapLayer.fromShapeSource((x, y) => `/tile/property-ownership/${x}/${y}`, 500, 'source-over', true, async shape => {
			await new PropertyService().assignValuation(shape.id, this.plotPrice, this.buildingPrice);

			propertyOwnershipLayer.reset();
			this.parent.map.updateLayers();
		});

		requestAnimationFrame(() => {
			this.parent.toolbar.toggleLayer(propertyOwnershipLayer);
		});
	}

	renderPanel() {
		return <ui-quick-valueation>
			<input $ui-value={this.plotPrice}></input>
			<input $ui-value={this.buildingPrice}></input>
		</ui-quick-valueation>
	}
}
