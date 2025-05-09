export const convertToCurrency = (price: number) => {
	if (price === null || isNaN(price)) {
		return `?E`;
	}

	const decimal = price - Math.floor(price);
	const integer = Math.floor(price);

	return `${integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}.${decimal.toFixed(2).substring(2)} E`;
}
