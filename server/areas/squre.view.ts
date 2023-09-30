import { ViewModel } from "vlserver";
import { Square } from "../managed/database";
import { BoroughSummaryModel } from "./borough.summary";

export class SquareViewModel extends ViewModel<Square> {
	id;

	name;
	bounds;

	borough: BoroughSummaryModel;
}