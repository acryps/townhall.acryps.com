export const convertToCurrency = (price: number) => {
	if (price === null) {
		return `?E`;
	}

	return `${price}E`;
}
