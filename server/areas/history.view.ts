import { ViewModel } from "vlserver";
import { HistoryEntry } from "../history";

export class HistoryEntryViewModel extends ViewModel<HistoryEntry> {
	name;

	date;
}