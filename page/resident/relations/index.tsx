import { Component } from "@acryps/page";
import { ResidentPage } from "..";
import { LifeService, ResidentRelationViewModel, ResidentSummaryModel } from "../../managed/services";
import { toSimulatedAge, toSimulatedTime } from "../../../interface/time";
import { relationIcon } from "../../assets/icons/managed";
import { Point } from "../../../interface/point";
import { drawDanwinstonLine } from "../../../interface/line";
import { registerInteraction } from "../../shared/map/interaction";
import { px } from "@acryps/style";
import { NetworkGraphNode } from "../../shared/network-graph/graph";

export class RelationsPage extends Component {
	declare parent: ResidentPage;
	declare rootNode: HTMLElement;

	relations: ResidentRelationViewModel[] = [];
	nodes = new Map<string, NetworkGraphNode>();

	canvas = document.createElement('canvas');
	context = this.canvas.getContext('2d');

	width: number;
	height: number;

	scale = 0.2;
	center: Point;

	async expand(id: string) {
		const relations = await new LifeService().getRelations(id);
		const anchor = this.nodes.get(id)?.position ?? new Point(0, 0);

		this.relations.push(...relations);

		for (let relation of relations) {
			for (let member of [relation.initiator, relation.peer]) {
				if (!this.nodes.has(member.id)) {
					let expanded = id == member.id;

					const node: NetworkGraphNode = {
						element: <ui-resident ui-expanded={expanded} ui-click={async () => {
							if (expanded) {
								open(`/resident/${member.tag}`);
							}

							await this.expand(member.id);

							expanded = true;
							node.element.setAttribute('ui-expanded', '');
						}}>
							<ui-given-name>
								{member.givenName}
							</ui-given-name>

							<ui-family-name>
								{member.familyName}
							</ui-family-name>

							<ui-age>
								{toSimulatedTime(member.birthday).toLocaleDateString()} - {toSimulatedAge(member.birthday)}
							</ui-age>
						</ui-resident>,

						position: new Point(
							Math.random() * this.width - this.width / 2,
							Math.random() * this.height - this.height / 2
						).add(anchor),
						velocity: new Point(0, 0)
					};

					this.rootNode.appendChild(node.element);
					this.nodes.set(member.id, node);
				}
			}
		}
	}

	next() {
		NetworkGraphNode.simulate(
			[...this.nodes.values()],
			this.relations.map(relation => [
				this.nodes.get(relation.initiator.id),
				this.nodes.get(relation.peer.id)
			])
		);

		for (let node of this.nodes.values()) {
			const center = node.position.subtract(this.center).scale(1 / this.scale);

			node.element.style.left = px(center.x).toValueString();
			node.element.style.top = px(center.y).toValueString();
		}

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.strokeStyle = 'black';

		for (let relation of this.relations) {
			let a = this.nodes.get(relation.initiator.id);
			let b = this.nodes.get(relation.peer.id);

			drawDanwinstonLine(
				this.context,
				a.position.subtract(this.center).floor(),
				b.position.subtract(this.center).floor()
			);
		}

		requestAnimationFrame(() => this.next());
	}

	render() {
		requestAnimationFrame(() => {
			const bounds = container.getBoundingClientRect();

			this.width = this.canvas.width = bounds.width * this.scale;
			this.height = this.canvas.height = bounds.height * this.scale;
			this.center = new Point(-this.width / 2, -this.height / 2);

			this.next();

			registerInteraction(this, (destination: Point) => {
				this.center = destination;
			}, () => { }, () => { }, () => { });

			this.expand(this.parent.resident.id);
		});

		const container: HTMLElement = <ui-relation-graph>
			{this.canvas}
		</ui-relation-graph>;

		return container;
	}

	// empty functions for interaction
	// TODO split interaction
	zoom() {}
	move() {}
	translate(target) { return new Point(0, 0); }
}
