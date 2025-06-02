import { Component } from "@acryps/page";
import { TrainsPage } from ".";
import { NetworkGraphNode } from "../shared/network-graph/graph";
import { Point } from "../../interface/point";
import { TrainRouteIconComponent } from "../shared/train-route";
import { TrainStationViewModel } from "../managed/services";
import { px } from "@acryps/style";
import { drawDanwinstonLine } from "../../interface/line";
import { TrainRouteSegment, TrainRouteStopSegment, TrainRouteTrackSegment } from "./route/segment";

export class RailwayNetworkComponent extends Component {
	declare parent: TrainsPage;

	stationNodes: NetworkGraphNode[] = [];
	routes: [NetworkGraphNode, NetworkGraphNode][] = [];

	canvas = document.createElement('canvas');
	context = this.canvas.getContext('2d');

	width: number;
	height: number;

	scale = 1;
	center = new Point(0, 0);

	packing = 10;

	async onload() {
		const stationNodes = new Map<string, NetworkGraphNode>();

		for (let route of this.parent.routes) {
			let lastStation: NetworkGraphNode;

			const stations = TrainRouteSegment.split(route, this.parent.stations)
				.filter(segment => segment instanceof TrainRouteStopSegment);

			if (stations.length > 1) {
				for (let segment of stations) {
					let station = stationNodes.get(segment.station.id);

					if (!station) {
						station = new NetworkGraphNode(
							<ui-station ui-href={`/property/${segment.station.property.id}`}></ui-station>,

							Point.center(Point.unpack(segment.station.property.activePlotBoundary.shape))
						);

						stationNodes.set(segment.station.id, station);
					}

					if (lastStation) {
						this.routes.push([
							lastStation,
							station
						]);
					}

					lastStation = station;
				}
			}
		}

		this.stationNodes = [...stationNodes.values()];
	}

	bake() {
		NetworkGraphNode.simulate(this.stationNodes, this.routes);

		const packed = new Map<NetworkGraphNode, Point>();

		for (let node of this.stationNodes) {
			packed.set(node, node.position.scale(1 / this.packing).floor().scale(this.packing));
		}

		const points = this.stationNodes.map(node => node.position);
		const bounds = Point.bounds(points);

		this.center = Point.center(points);

		this.scale = Math.max(
			bounds.width / this.width,
			bounds.height / this.height
		);

		for (let [node, position] of packed) {
			const center = position.subtract(this.center).scale(1 / this.scale);

			node.element.style.left = px(center.x + this.width / 2).toValueString();
			node.element.style.top = px(center.y + this.height / 2).toValueString();
		}

		this.context.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

		this.context.strokeStyle = 'black';

		for (let relation of this.routes) {
			let a = packed.get(relation[0]);
			let b = packed.get(relation[1]);

			drawDanwinstonLine(
				this.context,
				a.subtract(this.center).scale(1 / this.scale).floor(),
				b.subtract(this.center).scale(1 / this.scale).floor()
			);
		}

		requestAnimationFrame(() => {
			if (document.contains(this.rootNode)) {
				this.bake();
			}
		});
	}

	render() {
		requestAnimationFrame(() => {
			const bounds = container.getBoundingClientRect();

			this.width = this.canvas.width = bounds.width * this.scale;
			this.height = this.canvas.height = bounds.height * this.scale;
			this.context.translate(this.width / 2, this.height / 2);

			this.center = new Point(-this.width / 2, -this.height / 2);

			this.bake();
		});

		const container: HTMLElement = <ui-network-graph>
			{this.canvas}

			{this.stationNodes.map(station => station.element)}
		</ui-network-graph>;

		return container;
	}
}
