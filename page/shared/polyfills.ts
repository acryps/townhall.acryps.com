declare global {
	interface Array<T> {
		toOrdered(rank: (item: T) => number, reversed?: boolean): Array<T>;
	}

	interface Number {
		toLocaleString(): string;
	}
}

Array.prototype.toOrdered = function <T>(rank, reversed = false) {
	const ranked = (this as Array<T>).map(item => ({ item, rank: rank(item) }));

	if (reversed) {
		ranked.sort((a, b) => b.rank - a.rank);
	} else {
		ranked.sort((a, b) => a.rank - b.rank);
	}

	return ranked.map(ranked => ranked.item);
}

Number.prototype.toLocaleString = function () {
	return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export { };
