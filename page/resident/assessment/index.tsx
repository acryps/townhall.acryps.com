import { Component } from "@acryps/page";
import { ResidentPage } from "..";
import { LifeService, ResidentAssessmentMatchViewModel } from "../../managed/services";
import { assessmentMarkerValue } from "../index.style";

export class ResidentAssessmentPage extends Component {
	declare parent: ResidentPage;

	matches: ResidentAssessmentMatchViewModel[];

	async onload() {
		this.matches = await new LifeService().getAssessmentMatches(this.parent.resident.id);
	}

	render() {
		return <ui-assessment>
			<ui-title>
				Assessment
			</ui-title>

			<ui-description>
				Every resident is assessed by our AI system.
				This assessment into multiple parameters allows for market simulations to apply purchasing decisions to hounderds of residents at once.
				The simulation would never be able to be executed with current LLM inference speeds without this optimization technique.
			</ui-description>

			<ui-section>
				<ui-title>
					Assessment Scores
				</ui-title>

				<ui-description>
					Result of the assessment.
					Sorted by confidence.
				</ui-description>

				<ui-assessments>
					{this.parent.resident.assessments.toSorted((a, b) => a.confidence > b.confidence ? -1 : 1).map(assessment => <ui-assessment>
						<ui-prompt>
							{assessment.parameter.prompt}
						</ui-prompt>

						<ui-range>
							<ui-marker style={assessmentMarkerValue.provide(assessment.value)}></ui-marker>

							<ui-low>
								{assessment.parameter.low}
							</ui-low>

							<ui-high>
								{assessment.parameter.high}
							</ui-high>
						</ui-range>
					</ui-assessment>)}
				</ui-assessments>
			</ui-section>

			<ui-section>
				<ui-title>
					Matches
				</ui-title>

				<ui-description>
					Residents closest to {this.parent.resident.givenName} {this.parent.resident.familyName} in terms of assessment results.
					Some might have very high scores, but only one or few parameters match.
				</ui-description>

				<ui-matches>
					{this.matches.map((match, index) => {
						const source = match.sourceResidentId == this.parent.resident.id;

						return <ui-match ui-href={`/resident/${source ? match.targetResidentTag : match.sourceResidentTag}`}>
							<ui-index>
								#{index + 1}
							</ui-index>

							<ui-name>
								<ui-given>
									{source ? match.targetResidentGivenName : match.sourceResidentGivenName}
								</ui-given>

								<ui-family>
									{source ? match.targetResidentFamilyName : match.sourceResidentFamilyName}
								</ui-family>
							</ui-name>

							<ui-distance>
								{match.distance.toFixed(5)}
							</ui-distance>

							<ui-parameters>
								{match.sharedParameters}
							</ui-parameters>
						</ui-match>
					})}
				</ui-matches>
			</ui-section>
		</ui-assessment>;
	}
}
