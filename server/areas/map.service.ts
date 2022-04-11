import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { Proxy } from "../proxy";
import { BoroughViewModel } from "./borough.view";
import { HistoryEntryViewModel } from "./history.view";
import { PropertyTypeViewModel } from "./property-type.view";
import { PropertySummaryModel } from "./property.summary";
import { PropertyViewModel } from "./property.view";
import { SquareViewModel } from "./squre.view";
import { StreetViewModel } from "./street.view";
import { WaterBodyViewModel } from "./water-body.view";

export class MapService extends Service {
    constructor(
        private db: DbContext
    ) {
        super();
    }

    getBoroughs() {
        return BoroughViewModel.from(this.db.borough);
    }

    getProperties() {
        return PropertySummaryModel.from(this.db.property);
    }

    getStreets() {
        return StreetViewModel.from(this.db.street);
    }

    getSquares() {
        return SquareViewModel.from(this.db.square);
    }

    getWaterBodies() {
        return WaterBodyViewModel.from(this.db.waterBody);
    }

    async getHistory() {
        return HistoryEntryViewModel.from(await Proxy.getHistory());
    }

    async getTubes() {
        return await Proxy.getTubes();
    }

    async getPropertyTypes() {
        return PropertyTypeViewModel.from(this.db.propertyType.orderByAscending(type => type.code));
    }

    async getProperty(id: string) {
        return new PropertyViewModel(await this.db.property.find(id));
    }

    async createProperty(propertyViewModel: PropertyViewModel) {
        const property = await propertyViewModel.toModel();

        await property.create();
    }

    async createBorough(boroughViewModel: BoroughViewModel) {
        const borough = await boroughViewModel.toModel();

        await borough.create();
    }

    async createSquare(squareViewModel: SquareViewModel) {
        const square = await squareViewModel.toModel();

        await square.create();
    }

    async createWaterBody(waterBodyViewModel: WaterBodyViewModel) {
        const waterBody = await waterBodyViewModel.toModel();

        await waterBody.create();
    }

    async saveProperty(propertyViewModel: PropertySummaryModel) {
        const property = await propertyViewModel.toModel();

        await property.update();
    }
}