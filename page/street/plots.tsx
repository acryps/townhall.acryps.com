import { Component } from "@acryps/page";
import { PlotBoundaryShapeModel, StreetService, StreetViewModel } from "../managed/services";
import { calcualteDanwinstonLine } from "../../interface/line";
import { Point } from "../../interface/point";
import { Shape } from "../../interface/shape";
import { ColorValue, deg, hex, Hsl, hsl, percentage } from "@acryps/style";
import { StreetPage } from ".";

export class StreetPlotsPage extends Component {
	declare parent: StreetPage;

	colors: Hsl[] = [];
	peerPlots: PlotBoundaryShapeModel[];

	async onload() {
		this.peerPlots = await new StreetService().getPeerPlots(this.parent.street.id);

		for (let angle = 0; angle < 360; angle += 20) {
			this.colors.push(hsl(deg(angle), percentage(100), percentage(50)));
		}
	}

	renderLoader() {
		return <ui-plots>
			<ui-progress>
				Calculating Plots...
			</ui-progress>
		</ui-plots>
	}

	render() {
		const path = Point.unpack(this.parent.currentRoute.path);

		const boundary = Point.bounds(path, this.parent.street.size);
		const topLeft = new Point(boundary.x.min, boundary.y.min);

		const canvas = document.createElement('canvas');
		const width = canvas.width = boundary.width;
		const height = canvas.height = boundary.height;

		const context = canvas.getContext('2d');

		for (let plot of this.peerPlots) {
			Shape.render({ bounds: plot.shape, stroke: '#000', fill: '#eee' }, topLeft, context);
		}

		const occupiedPoints: string[] = [];
		const filled = new Map<string, Point>();

		const data = context.getImageData(0, 0, width, height);

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (data.data[(x + y * width) * 4 + 3]) {
					occupiedPoints.push(topLeft.copy(x, y).pack());
				}
			}
		}

		const searchField = Point.searchMap(this.parent.street.size);

		for (let segmentIndex = 1; segmentIndex < path.length; segmentIndex++) {
			const start = path[segmentIndex - 1];
			const end = path[segmentIndex];

			const points = calcualteDanwinstonLine(start, end);

			for (let point of points) {
				for (let offset of searchField) {
					const target = point.add(offset);
					const packed = target.pack();

					if (!occupiedPoints.includes(packed)) {
						if (!filled.has(packed)) {
							filled.set(packed, target);
						}
					}
				}
			}
		}

		const shapes = Point.groupShapes(filled);

		for (let shape of shapes) {
			const boundary = Point.bounds([...shape.values()]);

			if (boundary.width > 1 && boundary.height > 1) {
				const outline = Point.outline(shape);

				const color = this.colors.pop().toValueString()!;

				Shape.render({
					bounds: Point.pack(outline),
					fill: color,
					stroke: color
				}, topLeft, context);
			}
		}

		return <ui-plots>
			{canvas}
		</ui-plots>;
	}
}
