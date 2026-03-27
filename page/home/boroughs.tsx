import { Component } from "@acryps/page";
import { hex, rad } from "@acryps/style";
import { Application } from "..";
import { Banner } from "../../interface/banner";
import { Point } from "../../interface/point";
import { BannerComponent } from "../banner";
import { boroughColor, boroughMapBaseColor, boroughMapCompassDirection, boroughMapItemColor } from "./index.style";
import { getMinimapBounds } from "../../interface/minimap";
import { BoroughSummaryModel } from "../managed/services";
import { calculateDanwinstonShapePath } from "../../interface/line";
import { minimapCompassIcon } from "../assets/icons/managed";

export class HomeBoroughListComponent extends Component {
	bounds = getMinimapBounds(Application.boroughs);

	mapSize = 100;
	mapScale = this.mapSize / this.bounds.width;

	render() {
		const canvas = document.createElement('canvas');
		canvas.height = canvas.width = this.mapSize;

		const context = canvas.getContext('2d');

		context.beginPath();

		for (let borough of Application.boroughs) {
			const points = Point.unpack(borough.bounds);

			for (let index = 0; index < points.length; index++) {
				context[index ? 'lineTo' : 'moveTo'](...this.translate(points[index], -0.5 / this.mapScale));
			}

			context.closePath();
		}

		context.fillStyle = boroughMapBaseColor.toValueString();
		context.fill();

		const base = context.getImageData(0, 0, canvas.width, canvas.height);

		return <ui-boroughs>
			{Application.boroughs.toOrdered(borough => Point.center(Point.unpack(borough.bounds)).distance(Application.center)).map(borough => <ui-borough ui-href={`/borough/${borough.tag}`} style={boroughColor.provide(hex(borough.color))}>
				{borough.banner ? new BannerComponent(Banner.unpack(borough.banner)) : <ui-banner-placeholder />}

				<ui-detail>
					<ui-name>
						{borough.name}
					</ui-name>

					<ui-tagline>
						{borough.contextTagline}
					</ui-tagline>

					{borough.incorporation ? <ui-incorporation>
						Incorporated: {borough.incorporation.toLocaleDateString()}
					</ui-incorporation> : <ui-incorporation ui-none>
						Not officially incorporated
					</ui-incorporation>}

					<ui-area>
						Area: {Point.area(Point.unpack(borough.bounds)).toLocaleString()} b²
					</ui-area>
				</ui-detail>

				{this.renderMinimap(borough, canvas, context, base)}
			</ui-borough>)}
		</ui-boroughs>;
	}

	renderMinimap(borough: BoroughSummaryModel, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, base: ImageData) {
		const points = Point.unpack(borough.bounds);
		const center = Point.center(points);

		if (center.x < this.bounds.x.min || center.x > this.bounds.x.max || center.y < this.bounds.y.min || center.y > this.bounds.y.max) {
			const direction = Math.atan2(
				center.y - (this.bounds.y.max + this.bounds.y.min) / 2,
				center.x - (this.bounds.x.max + this.bounds.x.min) / 2,
			);

			return <ui-map>
				<img src={canvas.toDataURL('image/png')} />

				<ui-compass style={boroughMapCompassDirection.provide(rad(direction))}>{minimapCompassIcon()}</ui-compass>
			</ui-map>
		}

		context.beginPath();

		for (let index = 0; index < points.length; index++) {
			context[index ? 'lineTo' : 'moveTo'](...this.translate(points[index], -0.5 / this.mapScale));
		}

		context.closePath();

		context.fillStyle = boroughMapItemColor.toValueString();
		context.fill();

		// add a dot to show small boroughs
		context.beginPath();
		context.arc(...this.translate(Point.center(points)), 1, 0, Math.PI * 2);
		context.fill();

		const image = canvas.toDataURL('image/png');
		context.putImageData(base, 0, 0);

		return <ui-map>
			<img src={image} />
		</ui-map>
	}

	translate(point: Point, offset = 0) {
		return [
			Math.floor((point.x - this.bounds.x.min - offset) * this.mapScale),
			Math.floor((point.y - this.bounds.y.min - offset) * this.mapScale),
		] as [number, number]
	};
}
