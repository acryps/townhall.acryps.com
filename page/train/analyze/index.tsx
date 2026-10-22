import { Component } from "@acryps/page";
import { TrafficAnalysisSampleViewModel, TrainService } from "../../managed/services";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";

export class AnalyzeTrainTrafficPage extends Component {
	samples: TrafficAnalysisSampleViewModel[];

	async onload() {
		this.samples = await new TrainService().getTrafficSamples();
	}

	render() {
		return <ui-analyze>
			<ui-header>
				Traffic Analysis
			</ui-header>

			<ui-samples>
				{this.samples.map(sample => <ui-sample>
					{new MapComponent().highlight(Point.unpack(sample.path), false)}

					<ui-resident ui-href={`/resident/${sample.tag}`}>
						<img src={`/resident/image/${sample.tag}`} />

						<ui-name>
							{sample.givenName} {sample.familyName}
						</ui-name>
					</ui-resident>

					<ui-purpose>
						{sample.purpose}
					</ui-purpose>
				</ui-sample>)}
			</ui-samples>
		</ui-analyze>;
	}
}
