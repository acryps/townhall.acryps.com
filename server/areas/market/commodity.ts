import { ViewModel } from "vlserver";
import { Commodity } from "../../managed/database";
import { View } from "vlquery";

export class CommoditySummaryModel extends ViewModel<Commodity> {
	id;
	name;
}
