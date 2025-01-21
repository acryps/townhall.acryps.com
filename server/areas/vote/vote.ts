import { ViewModel } from "vlserver";
import { Vote } from "../../managed/database";

export class VoteViewModel extends ViewModel<Vote> {
	id;

	pro;
	reason;
	submitted;
}

export class VoteTickerViewModel extends ViewModel<Vote> {
	pro;
	submitted;
}
