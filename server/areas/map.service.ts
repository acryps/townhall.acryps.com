import { Service } from "vlserver";
import { DbContext } from "../managed/database";
import { BoroughViewModel } from "./borough.view";
import { PropertyViewModel } from "./property.view";

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
        return PropertyViewModel.from(this.db.property);
    }

    async getProperty(id: string) {
        return new PropertyViewModel(await this.db.property.find(id));
    }
}