import { Component } from "@acryps/page";
import { Point } from "../../../interface/point";
import { ChangeFrameViewModel, ChangeService, PlotBoundaryShapeModel } from "../../managed/services";
import { frameMarker, frameTime, phaseLength } from "./index.style";
import { ChangePhase } from "./phase";
import { Length } from "@acryps/style";
import { Time } from "../../../interface/time";

export class ChangeFramesComponent extends Component {
	frames: ChangeFrameViewModel[];
	images = new Map<ChangeFrameViewModel, Promise<HTMLImageElement>>;

	gaps: [];

	constructor(
		private plot: PlotBoundaryShapeModel
	) {
		super();
	}

	async onload() {
		const bounds = Point.bounds(Point.unpack(this.plot.shape), 5);

		this.frames = await new ChangeService().getChanges(bounds.x.min, bounds.y.min, bounds.x.max, bounds.y.max);
		this.frames.sort((a, b) => a.captured > b.captured ? 1 : -1);

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
		const frameElements: HTMLElement[] = [];

		const first = Math.min(...this.frames.map(frame => +frame.captured));
		const last = Math.max(...this.frames.map(frame => +frame.captured));

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

				frameElements[currentFrame].removeAttribute('ui-active');

				// timeline.style.setProperty(frameMarker.propertyName, toTimeOffset(frame.captured).toString());

				if (++currentFrame == this.frames.length) {
					currentFrame = 0;
				}

				frameElements[currentFrame].setAttribute('ui-active', '');

				setTimeout(() => nextFrame(), 100);
			};

			nextFrame();
		});

		const phases = ChangePhase.split(this.frames);

		return <ui-change-frames>
			{canvas}

			<ui-timeline>
				<ui-phases>
					{phases.map((phase, index) => [
						index > 0 && <ui-elapsed>
							{new Time(phase.start).age(new Time(phases[index].end))}y
						</ui-elapsed>,

						<ui-phase style={phaseLength.provide(phase.length)}>
							{phase.frames.map((frame, index) => {
								const element = <ui-frame style={frameTime.provide(phase.offset(frame))} ui-click={() => currentFrame = index}></ui-frame>

								frameElements.push(element);

								return element;
							})}
						</ui-phase>
					])}
				</ui-phases>

				<ui-references>
					<ui-start>
						{new Date(first).toLocaleDateString()}
					</ui-start>

					<ui-end>
						{new Date(last).toLocaleDateString()}
					</ui-end>
				</ui-references>
			</ui-timeline>
		</ui-change-frames>
	}
}
