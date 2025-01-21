import { ViewModel } from "vlserver";
import { Bill, BillHonestium } from "../../managed/database";
import { DistrictViewModel } from "./district";

export class BillViewModel extends ViewModel<Bill> {
	id;
	tag;
	title;
	description;
	summary;

	certified;
	pro;

	scope: DistrictViewModel;
	honestiums: HonestiumViewModel[];
}

export class HonestiumViewModel extends ViewModel<BillHonestium> {
	id;

	pro;

	question;
	answer;
	answered;
}
