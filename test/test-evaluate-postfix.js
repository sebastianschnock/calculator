import { expect } from 'chai';
import evaluate from '../src/js/evaluate-postfix';

describe('The postfix evaluation', () => {

	it('should evaluate the "+" operator', () => {
		let result = evaluate('1 2 +');
		expect(result).to.equal(3);
	});

	it('should evaluate the "-" operator', () => {
		let result = evaluate('5 2 -');
		expect(result).to.equal(3);
	});

	it('should evaluate the "/" operator', () => {
		let result = evaluate('6 2 /');
		expect(result).to.equal(3);
	});

	it('should evaluate the "*" operator', () => {
		let result = evaluate('3 2 *');
		expect(result).to.equal(6);
	});

	it('should evaluate the "^" operator', () => {
		let result = evaluate('3 2 ^');
		expect(result).to.equal(9);
	});

})