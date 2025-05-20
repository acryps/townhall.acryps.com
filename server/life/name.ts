import { Gender, male } from "./gender";
import { Language } from "./language";

export type NameType = 'given' | 'family';

export class NameGenerator {
	private language = new Language('fast');

	readonly stockSize = 100;
	readonly minimumStockSize = 20;
	readonly selectionSize = 10;

	private stock = [];

	constructor(
		public type: NameType,
		private used: string[],
		public gender?: Gender
	) { }

	async selection() {
		const names = [];

		for (let index = 0; index < this.selectionSize; index++) {
			names.push(await this.next());
		}

		return names;
	}

	async next() {
		while (this.stock.length < this.minimumStockSize) {
			await this.refill();
		}

		return this.stock.shift();
	}

	async refill() {
		console.log(`[name generator] refilling stock (${this.stock.length})...`)

		const characterSeed = this.randomLetters(3);
		const prompt = this.language.createNames(this.stockSize - this.stock.length, this.type, this.gender, [...this.used].sort(() => Math.random() - 0.5).slice(0, 100), characterSeed);

		const source = await this.language.respondTextArray(prompt);
		const names = [];

		for (let name of source) {
			name = name.trim();

			if (!NameGenerator.valid(name)) {
				continue;
			}

			if (!this.stock.includes(name) || Math.random() > 0.9) {
				names.push(name);
			}
		}

		this.stock.push(...names);
		this.used.push(...names);

		console.log(`+ ${names.join(' ')}`);
	}

	static valid(name: string) {
		name = name.trim();

		if (!name) {
			return false;
		}

		if (name.includes(' ')) {
			return false;
		}

		if (!/^[a-zA-Z]+$/.test(name)) {
			return false;
		}

		return true;
	}

	private randomLetters(length: number) {
		const frequencies: Record<string, number> = {
			a: 8.2,
			b: 1.5,
			c: 2.8,
			d: 4.3,
			e: 12.7,
			f: 2.2,
			g: 2.0,
			h: 6.1,
			i: 7.0,
			j: 0.15,
			k: 0.77,
			l: 4.0,
			m: 2.4,
			n: 6.7,
			o: 7.5,
			p: 1.9,
			q: 0.095,
			r: 6.0,
			s: 6.3,
			t: 9.1,
			u: 2.8,
			v: 0.98,
			w: 2.4,
			x: 0.15,
			y: 2.0,
			z: 0.074
		};

		const characters = Object.keys(frequencies);
		const totalWeight = Object.values(frequencies).reduce((sum, weight) => sum + weight, 0);

		const output: string[] = [];

		for (let index = 0; index < length; index++) {
			let distance = totalWeight * Math.random();
			let characterIndex = -1;

			while (distance > 0) {
				characterIndex++;

				distance -= frequencies[characters[characterIndex]];
			}

			output.push(characters[characterIndex]);
		}

		return output;
	}
}
