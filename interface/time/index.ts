import { ScheduledEpoch } from "./epoch";

export class Time {
	static now() {
		return new Time(new Date());
	}

	static get currentEpoch() {
		return this.epoch(new Date());
	}

	static get paused() {
		return !this.currentEpoch;
	}

	static epoch(real: Date) {
		return ScheduledEpoch.find(real);
	}

	// TODO
	static from(year: number, month: number, day: number) {
		const simulated = new Date(year, month, day);
		const epoch = ScheduledEpoch.reverseFind(simulated);
		const offset = +simulated - +new Time(epoch.source.start).simulated;

		return new Time(new Date(+epoch.source.start + offset / epoch.rate));
	}

	epoch: ScheduledEpoch;

	constructor(
		public real: Date
	) {
		this.epoch = Time.epoch(real);
	}

	get simulated() {
		// dates before epoch
		if (this.real < this.epoch.source.start) {
			return new Date(this.epoch.base);
		}

		return new Date(this.epoch.base + Math.min(+this.real - +this.epoch.source.start, this.epoch.duration) * this.epoch.rate);
	}

	get year() {
		return this.simulated.getFullYear();
	}

	age(reference = Time.now()) {
		return reference.year - this.year;
	}

	toString() {
		return this.simulated.toLocaleString();
	}

	toTimeString() {
		return this.simulated.toLocaleTimeString();
	}

	toDateString() {
		return this.simulated.toLocaleDateString();
	}
}
