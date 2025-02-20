import { ViewModel } from "vlserver";
import { Impression } from "../../managed/database";

export class ImpressionViewModel extends ViewModel<Impression> {
	id;
	title;
}
