import { Component } from "@acryps/page";
import { TrainRouteViewModel, TrainService, TrainStationViewModel, TrainStopViewModel } from "../../managed/services";
import { TrainRouteIconComponent } from "../../shared/train-route";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";
import { calculateDanwinstonShapePath } from "../../../interface/line";
import { propertyLayer, trainRouteLayer } from "../../shared/map/layers";
import { TrainsPage } from "..";
import { TrainRouteSegment, TrainRouteStopSegment, TrainRouteTrackSegment } from "./segment";
import { addIcon, drawIcon } from "../../assets/icons/managed";
import { LegalEntitySelectorComponent } from "../../shared/legal-entity/select";
import { LegalEntityComponent } from "../../shared/legal-entity";
import { MetaOrganization, MetaPlace, MetaTrainTrip } from "@acryps/metadata";
import { convertToLegalCompanyName } from "../../../interface/company";

export class TrainRoutePage extends Component {
	declare parameters: { code };
	declare parent: TrainsPage;

	trainRoute: TrainRouteViewModel;
	segments: TrainRouteSegment[];

	editing = false;

	async onload() {
		this.trainRoute = await new TrainService().getRoute(this.parameters.code);

		this.segments = TrainRouteSegment.split(this.trainRoute, this.parent.stations);

		const stops = this.segments.filter(segment => segment instanceof TrainRouteStopSegment)
		const start = stops[0];
		const end = stops.at(-1);

		if (start && end) {
			new MetaTrainTrip({
				name: this.trainRoute.name,
				trainName: this.trainRoute.code,
				departureStation: new MetaPlace({ name: start.station.name ?? start.station.property.name }),
				arrivalStation: new MetaPlace({ name: end.station.name ?? end.station.property.name }),
				provider: new MetaOrganization({ name: this.trainRoute.operator?.company?.name ?? this.trainRoute.operator?.borough?.name }),
				itinerary: stops.map(stop => new MetaPlace({ name: stop.station.name ?? stop.station.property.name })) as any
			}).apply();
		}
	}

	render() {
		const map = new MapComponent();
		map.highlight(Point.unpack(this.trainRoute.activePath.path), false);
		map.layers.push(trainRouteLayer(this.trainRoute.code));
		map.cursorColor = this.trainRoute.textColor;

		let pixelIndex = 1;
		let direction = 1;

		if (!this.editing) {
			const path = calculateDanwinstonShapePath(Point.unpack(this.trainRoute.activePath.path), false);
			let lastSegment = this.segments[0];

			const nextPixel = () => {
				if (document.contains(map.rootNode)) {
					const point = path[pixelIndex];

					map.move(point);

					const currentSegment = this.segments.find(segment => segment.path.find(peer => peer.pack() == point.pack()));

					if (currentSegment != lastSegment) {
						segmentElements.get(lastSegment).removeAttribute('ui-active');
						segmentElements.get(currentSegment).setAttribute('ui-active', '');

						lastSegment = currentSegment;
					}

					if (this.trainRoute.looping) {
						if (pixelIndex == path.length - 1) {
							pixelIndex = 0;
						}
					} else {
						if (pixelIndex == path.length - 1 || pixelIndex == 0) {
							direction = -direction;
						}
					}

					pixelIndex += direction;

					if (currentSegment instanceof TrainRouteStopSegment && point.pack() == currentSegment.center.pack()) {
						setTimeout(() => nextPixel(), 1000);
					} else {
						requestAnimationFrame(() => nextPixel());
					}
				}
			};

			map.onInitialRenderComplete = () => {
				map.zoom(0.5); // reset zoom

				nextPixel();
			}
		}

		const segmentElements = new Map<TrainRouteSegment, HTMLElement>();

		return <ui-route>
			<ui-header>
				{new TrainRouteIconComponent(this.trainRoute)}

				<ui-name>
					{this.trainRoute.name}
				</ui-name>
			</ui-header>

			<ui-operator>
				Operated by {new LegalEntityComponent(this.trainRoute.operator)}
			</ui-operator>

			{this.editing ? <ui-detail>
				<ui-field>
					<label>Code (Unique)</label>

					<input $ui-value={this.trainRoute.code} ui-change={() => new TrainService().saveRoute(this.trainRoute)}></input>
				</ui-field>

				<ui-field>
					<label>Main Color (Hex)</label>

					<input $ui-value={this.trainRoute.color} ui-change={() => new TrainService().saveRoute(this.trainRoute)}></input>
				</ui-field>

				<ui-field>
					<label>Text Color (Hex)</label>

					<input $ui-value={this.trainRoute.textColor} ui-change={() => new TrainService().saveRoute(this.trainRoute)}></input>
				</ui-field>

				<ui-field>
					<label>Name</label>

					<input $ui-value={this.trainRoute.name} ui-change={() => new TrainService().saveRoute(this.trainRoute)}></input>
				</ui-field>

				<ui-field>
					<label>Description</label>

					<textarea $ui-value={this.trainRoute.description} rows={8} ui-change={() => new TrainService().saveRoute(this.trainRoute)}></textarea>
				</ui-field>

				<ui-field>
					<label>Operator</label>

					{new LegalEntitySelectorComponent(this.trainRoute.operator)
					.onSelect(operator => {
						this.trainRoute.operator = operator;

						new TrainService().setOperator(this.trainRoute.id, operator.id);
					})}
				</ui-field>
			</ui-detail> : map}

			<ui-route>
				<ui-segments>
					{this.segments.map((segment, segmentIndex) => {
						let element: HTMLElement;

						if (segment instanceof TrainRouteStopSegment) {
							element = <ui-segment>
								<ui-station ui-href={`/property/${segment.station.property.id}`}>
									<ui-name>
										{segment.station.name ?? segment.station.property.name}
									</ui-name>

									<ui-length>
										{segment.length}b
									</ui-length>
								</ui-station>

								{this.parent.renderInterchange(this.trainRoute, segment.station)}

								{this.editing && <ui-actions>
									<ui-action ui-href={`/map/${segment.center.x}/${segment.center.y}/5/train-route/edit-route/${this.trainRoute.code}/${segmentIndex}`}>
										Edit Route
									</ui-action>

									<ui-action ui-click={async () => {
										await new TrainService().removeStop(segment.stop.id);

										this.reload();
									}}>
										Remove Stop
									</ui-action>
								</ui-actions>}
							</ui-segment>;
						} else if (segment instanceof TrainRouteTrackSegment) {
							element = <ui-segment>
								<ui-track>
									{segment.length}b Track
								</ui-track>

								{this.editing && <ui-actions>
									<ui-action ui-href={`/map/${segment.center.x}/${segment.center.y}/5/train-route/edit-route/${this.trainRoute.code}/${segmentIndex}`}>
										Edit Route
									</ui-action>

									<ui-action ui-href={`/map/${segment.center.x}/${segment.center.y}/5/train-route/insert-stop/${this.trainRoute.code}/${segmentIndex}`}>
										Insert Stop
									</ui-action>
								</ui-actions>}
							</ui-segment>
						}

						segmentElements.set(segment, element);

						return element;
					})}
				</ui-segments>

				{!this.editing && <ui-action ui-click={() => {
					this.editing = true;

					this.update();
				}}>
					{drawIcon()} Edit Route
				</ui-action>}
			</ui-route>

			<ui-path>

			</ui-path>
		</ui-route>
	}
}
