import { ViewModel } from "vlserver";
import { ResidentAssessmentParameterDistributionView } from "../../managed/database";

export class ResidentAssessmentParameterDistributionViewModel extends ViewModel<ResidentAssessmentParameterDistributionView> {
	id;

	prompt;
	low;
	high;

	assessmentCount;

	ranges;
}
