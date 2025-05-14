import { ViewModel } from "vlserver";
import { City } from "../../managed/database";

export class CityViewModel extends ViewModel<City> {
	id;

	name;
	incorporated;

	mainImpressionId;

	centerX;
	centerY;
}
