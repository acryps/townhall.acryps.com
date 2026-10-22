import { ViewModel } from "vlserver";
import { CommoditySymbolTickerView } from "../../managed/database";

export class CommoditySymbolTickerViewModel extends ViewModel<CommoditySymbolTickerView> {
	symbol;
	price;
	direction;
}
