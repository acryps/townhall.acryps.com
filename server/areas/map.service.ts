import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { Proxy } from "../proxy";
import { BoroughViewModel } from "./borough.view";
import { HistoryEntryViewModel } from "./history.view";
import { PropertySummaryModel } from "./property.summary";
import { PropertyViewModel } from "./property.view";
import { StreetViewModel } from "./street.view";

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

    async getHistory() {
        return HistoryEntryViewModel.from(await Proxy.getHistory());
    }

    async getTubes() {
        return await Proxy.getTubes();
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
}