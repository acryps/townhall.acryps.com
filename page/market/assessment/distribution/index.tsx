import { Component } from "@acryps/page";
import { LifeService, ResidentAssessmentParameterMetricViewModel } from "../../../managed/services";
import { rangePeak, rangeValue } from "./index.style";

export class AssessmentParameterDistributionPage extends Component {
	assessmentParameters: ResidentAssessmentParameterMetricViewModel[];

	async onload() {
		this.assessmentParameters = await new LifeService().getAssessmentParameterMetrics();
	}

	render() {
		return <ui-assessment-parameter-distribution>
			<ui-title>
				Assessment Distribution
			</ui-title>

			<ui-description>
				View how the population is generally assessed over the {this.assessmentParameters.length} parameters.
				A total of {Math.max(...this.assessmentParameters.map(parameter => parameter.assessmentCount))} assessments have been generated so far.
			</ui-description>

			<ui-parameters>
				{this.assessmentParameters.map(parameter => {
					const ranges = JSON.parse(parameter.ranges) as number[];

					return <ui-parameter>
						<ui-header>
							<ui-prompt>
								{parameter.prompt}
							</ui-prompt>

							<ui-count>
								{parameter.assessmentCount} Assessments
							</ui-count>
						</ui-header>

						<ui-distribution>
							<ui-ranges style={rangePeak.provide(Math.max(...ranges))}>
								{ranges.map(range => <ui-range style={rangeValue.provide(range)}></ui-range>)}
							</ui-ranges>

							<ui-low>
								{parameter.low}
							</ui-low>

							<ui-high>
								{parameter.high}
							</ui-high>
						</ui-distribution>
					</ui-parameter>
				})}
			</ui-parameters>
		</ui-assessment-parameter-distribution>;
	}
}
