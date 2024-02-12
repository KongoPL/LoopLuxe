/**
 * Transforms natural number into a pretty format.
 * @example 100 -> 100
 * @example 999 -> 999
 * @example 1000 -> 1k
 * @example 1080 -> 1,08k
 * @example 1119 -> 1,12k
 * @example 10250 -> 10,2k
 * @param number Input number
 * @returns pretty number
 */
export const displayPrettyNumber = (number: number): string => {
	if(number < 0) {
		throw new Error("Value is negative!");
	}

	if(number < 1000) {
		return `${number}`;
	}

	const units = ['k', 'M', 'B'];
	const numberAsString = number.toString();

	if(number >= 1000**4) {
		// Edge-case for value of 1000B and more
		return `${numberAsString.substring(0, numberAsString.length - 9)}${units[2]}`
	}

	// Only part of the input number will be displayed, so get only this part
	const significantNumberPart = numberAsString.substring(0, 3);

	const unitIndex = Math.min(
		Math.ceil(numberAsString.length / 3) - 2,
		2
	);
	let integerLength = numberAsString.length % 3;

	// If number is divisible by 3, then it should be displayed as a whole
	if (integerLength === 0) {
		return `${significantNumberPart}${units[unitIndex]}`;
	} else {
		const integerPart = significantNumberPart.substring(0, integerLength);
		const decimalPart = significantNumberPart.substring(integerLength);

		return `${integerPart}${+decimalPart > 0 ? `.${decimalPart}` : ''}${
			units[unitIndex]
		}`;
	}
}
