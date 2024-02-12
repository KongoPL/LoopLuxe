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
	let unitIndex = 0;
	let divider = 1000;

	while(number >= divider * 1000 && unitIndex < units.length - 1) {
		unitIndex++;
		divider = divider * 1000
	}

	const shortenedValue = number / divider;

	// "toFixed" is the best method, however it rounds our value,
	// so final precision have to be calculated on rounded value:
	const roundedValue = +shortenedValue.toFixed(2);
	const reminderValue = Math.round(roundedValue % 1 * 100);

	// 1.00 -> 1, 1.012 -> 1.01, 10.24 -> 10.2
	let precision = (
		reminderValue < 1 ? 0 : (
			roundedValue < 10 ? 2 :
			(roundedValue < 100 ? 1 : 0)
		)
	);

	return `${roundedValue.toFixed(precision)}${units[unitIndex]}`;
}
