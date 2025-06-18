import { ChangeFrameViewModel } from "../../managed/services";

export class ChangePhase {
	endGap: number;

	constructor(
		public frames: ChangeFrameViewModel[],
		public gap: number = null
	) {}

	get start() {
		return this.frames[0].captured;
	}

	get end() {
		return this.frames.at(-1).captured;
	}

	get length() {
		return +this.end - +this.start;
	}

	offset(frame: ChangeFrameViewModel) {
		if (this.frames.length == 1) {
			return 0.5;
		}

		return 1 / (+this.end - +this.start) * (+frame.captured - +this.start);
	}

	static split(timeline: ChangeFrameViewModel[], maxGap = 1000 * 60 * 60) {
		if (timeline.length <= 1) {
			return [new ChangePhase(timeline)];
		}

		const phases: ChangePhase[] = [];
		let stack = [timeline[0]];

		for (let frame of timeline.slice(1)) {
			const gap = +frame.captured - +stack.at(-1).captured;

			if (gap > maxGap) {
				phases.push(new ChangePhase(stack, gap));

				stack = [];
			}

			stack.push(frame);
		}

		phases.push(new ChangePhase(stack));

		return phases;
	}
}
