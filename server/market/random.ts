import { createHash } from "crypto";

export class HashRandom {
	static random(identifiers: string[] | string, minimum = 0, maximum = 1) {
		const input = JSON.stringify(identifiers);
		const hash = createHash("sha256").update(input).digest();

		const normalized = hash.readUInt32BE(0) / 0x100000000;
		return minimum + normalized * (maximum - minimum);
	}
}
