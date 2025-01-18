import { ViewModel } from "vlserver";
import { Bill, BillHonestium } from "../../managed/database";

export class BillViewModel extends ViewModel<Bill> {
	id;
	tag;
	title;
	description;

	certified;
	pro;

	honestiums: HonestiumViewModel[];
}

export class HonestiumViewModel extends ViewModel<BillHonestium> {
	id;

	pro;

	question;
	answer;
	answered;
}
