import { ViewModel } from "vlserver";
import { HistoricListingGrade } from "../../managed/database";

export class HistoricListingGradeViewModel extends ViewModel<HistoricListingGrade> {
	id;

	grade;
	name;
	description;
}