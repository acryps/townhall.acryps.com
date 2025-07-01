import { Time } from ".";
import { Epoch } from "../../server/managed/database";

type EpochLike = {
	start;
	end;

	rate;
	offset;
}

export class ScheduledEpoch {
	static epochs: ScheduledEpoch[];

	rate = this.source.rate;
	duration = this.source.end ? +this.source.end - +this.source.start : Infinity;

	constructor(
		public source: EpochLike,
		public base: number,

		// shifts gaps in the timeline
		public shift: number
	) {}

	static import(sourceEpochs: EpochLike[]) {
		sourceEpochs.sort((a, b) => a.start > b.start ? 1 : -1);

		let base = 0;
		let skipped = 0;
		let lastEnd = sourceEpochs[0].start;

		this.epochs = [];

		for (let source of sourceEpochs) {
			base += source.offset;

			skipped += +source.start - +lastEnd;
			lastEnd = source.end;

			const epoch = new ScheduledEpoch(source, base, skipped);
			this.epochs.push(epoch);

			base += epoch.duration * source.rate;
		}
	}

	static find(real: Date) {
		// dates before first epoch
		if (+real < this.epochs[0].source.start) {
			return this.epochs[0];
		}

		// dates in epochs
		for (let epoch of [...this.epochs].reverse()) {
			if (epoch.source.start <= real) {
				return epoch;
			}
		}

		// dates in the future
		return this.epochs.at(-1);
	}

	static reverseFind(simulated: Date) {
		for (let epoch of this.epochs) {
			const end = new Time(epoch.source.end);

			if (end.simulated > simulated) {
				return epoch;
			}
		}

		// dates in the future
		return this.epochs.at(-1);
	}
}
