import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { ChangeFrameViewModel, ChangeService, PlotBoundaryShapeModel } from "../../managed/services";
import { frameMarker, frameTime } from "./index.style";

export class ChangeFramesComponent extends Component {
	frames: ChangeFrameViewModel[];
	images = new Map<ChangeFrameViewModel, Promise<HTMLImageElement>>;

	constructor(
		private plot: PlotBoundaryShapeModel
	) {
		super();
	}

	async onload() {
		const bounds = Point.bounds(Point.unpack(this.plot.shape), 5);

		this.frames = await new ChangeService().getChanges(bounds.x.min, bounds.y.min, bounds.x.max, bounds.y.max);
		this.frames.sort((a, b) => a.captured > b.captured ? 1 : -1)

		for (let frame of this.frames) {
			const image = new Image();

			this.images.set(frame, new Promise<HTMLImageElement>(done => {
				image.onload = () => {
					done(image);
				}

				image.src = `/change-frame/${frame.hash}`;
			}));
		}
	}

	renderLoader() {
		return <ui-change-frames>
			<ui-loading>
				Analyzing Changes...
			</ui-loading>
		</ui-change-frames>
	}

	render() {
		let timeline: HTMLElement;

		const first = Math.min(...this.frames.map(frame => +frame.captured));
		const last = Math.max(...this.frames.map(frame => +frame.captured));

		const toTimeOffset = (time: Date) => 1 / (last - first) * (+time - first);

		const canvas = document.createElement('canvas');
		let context: CanvasRenderingContext2D;
		let currentFrame = 0;

		requestAnimationFrame(() => {
			const nextFrame = async () => {
				const frame = this.frames[currentFrame];
				const imageLoader = this.images.get(frame);

				const image = await imageLoader;

				if (!context) {
					canvas.width = image.naturalWidth;
					canvas.height = image.naturalHeight;

					context = canvas.getContext('2d');
				}

				context.drawImage(image, 0, 0);

				timeline.style.setProperty(frameMarker.propertyName, toTimeOffset(frame.captured).toString());

				if (++currentFrame == this.frames.length) {
					currentFrame = 0;
				}

				setTimeout(() => nextFrame(), 100);
			};

			nextFrame();
		});

		return <ui-change-frames>
			{canvas}

			{timeline = <ui-timeline>
				<ui-line>
					{this.frames.map((frame, index) => <ui-frame style={frameTime.provide(toTimeOffset(frame.captured))} ui-click={() => currentFrame = index}></ui-frame>)}
				</ui-line>

				<ui-references>
					<ui-start>
						{new Date(first).toLocaleDateString()}
					</ui-start>

					<ui-end>
						{new Date(last).toLocaleDateString()}
					</ui-end>
				</ui-references>
			</ui-timeline>}
		</ui-change-frames>
	}
}
