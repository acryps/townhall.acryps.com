import { Borough, ItemContextLinkRank } from "../../managed/database";
import { ItemContextFragmentComposer } from "../composer";

export class BoroughPropertyFragmentComposer extends ItemContextFragmentComposer<Borough> {
	async compose(borough: Borough) {
		for (let propery of await borough.properties.where(property => property.deactivated == null).toArray()) {
			this.link(2, propery.id, `Property in ${borough.name}`);
		}
	}
}
