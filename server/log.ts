export class Logger {
	accessory: () => string;

	constructor(
		private name: string,
		private parent?: Logger
	) {}

	private get parentChain(): string[] {
		if (this.parent) {
			return [...this.parent.parentChain, this.name];
		}

		return [this.name];
	}

	private static color(identifier: string, text: string) {
		let color = 0;

		for (let i = 0; i < identifier.length; i++) {
			color = identifier.charCodeAt(i) + ((color << 5) - color);
		}

		return `\x1b[38;5;${Math.abs(color % 208) + 20}m${text}\x1b[39m`;
	}

	protected write(color: number, prefix: string, message: any[], stream: NodeJS.WriteStream = process.stdout) {
		process.stdout.write(`\x1b[4${color}m ${
			prefix
		} ${
			new Date().toISOString().substring(0, 19).replace('T', ' ')
		} ${
			this.parentChain.map(unit => Logger.color(unit, unit)).join(' ')
		}${
			this.accessory ? ` (${this.accessory()})` : ''
		} \x1b[49m ${
			message.join(' ')
		}\n`);
	}

	task(name: string) {
		return new TaskLogger(name, this);
	}

	debug(...message: any[]) {
		this.write(4, 'D', message);
	}

	log(...message: any[]) {
		this.write(0, 'L', message);
	}

	warn(...message: any[]) {
		this.write(3, 'W', message);
	}

	error(...message: any[]) {
		this.write(1, 'E', message, process.stderr);
	}
}

export class TaskLogger extends Logger {
	finish(...message: any[]) {
		this.write(0, 'F', message)
	}
}
