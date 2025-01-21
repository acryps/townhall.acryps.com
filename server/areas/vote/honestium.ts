import { ViewModel } from "vlserver";
import { BillHonestium } from "../../managed/database";
import { BillViewModel } from "./bill";

export class OpenHonestiumViewModel extends ViewModel<BillHonestium> {
	id;

	pro;

	question;
	answer;

	bill: BillViewModel;
}
