import { displayPrettyNumber } from "./displayPrettyNumber";

describe('displayPrettyNumber', () => {
	test.each([
		// Low-value tests:
		[0, '0'],
		[1, '1'],
		[999, '999'],

		// unit-tests:
		[1000, '1k'],
		[1000 * 1000, '1M'],
		[1000 * 1000 * 1000, '1B'],

		// precision tests:
		[1001, '1k'],
		[1010, '1.01k'],
		[9999, '9.99k'],
		[10000, '10k'],
		[10001, '10k'],
		[10099, '10k'],
		[10100, '10.1k'],
		[10999, '10.9k'],
		[100000, '100k'],
		[100999, '100k'],
		[101000, '101k'],

		// edge-case tests:
		[1000 * 1000 * 1000 * 1000, '1000B'],
	])(
		"For number %p returns %s",
		(value, result) => {
			expect(displayPrettyNumber(value)).toBe(result);
		}
	)

	it('throws an error for negative value', () => {
		expect(() => { displayPrettyNumber(-1); }).toThrow();
	});

	// test('performance', () => {
	// 	const cases = Array(10000000).fill('').map((v,i) => (i * 100 + i));

	// 	const start = (new Date().getTime());
	// 	for(let i = 0; i < cases.length; i++) {
	// 		displayPrettyNumber(cases[i]);
	// 	}
	// 	const end = (new Date().getTime());

	// 	console.log(end - start);
	// });
});
