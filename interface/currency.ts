export const convertToCurrency = (price: number) => {
	if (price === null || isNaN(price)) {
		return `?E`;
	}

	return `${price}E`;
}
