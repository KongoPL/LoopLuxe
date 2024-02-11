/**
 * Transforms natural number into a pretty format.
 * @example 100 -> 100
 * @example 999 -> 999
 * @example 1000 -> 1k
 * @example 1080 -> 1,08k
 * @example 1119 -> 1,11k
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
	let unitIndex = 0;
	let divider = 1000;

	while(number >= divider * 1000 && unitIndex < units.length - 1) {
		unitIndex++;
		divider = divider * 1000
	}

	const shortenedValue = number / divider;
	const reminderValue = number % divider;

	let precision = (
		shortenedValue < 10 ? 2 :
		(shortenedValue < 100 ? 1 : 0)
	);

	if(reminderValue === 0) {
		precision = 0;
	}

	return `${shortenedValue.toFixed(precision)}${units[unitIndex]}`;
}
