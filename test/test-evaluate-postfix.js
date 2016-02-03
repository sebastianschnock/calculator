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

	it('should evaluate the "÷" operator', () => {
		let result = evaluate('6 2 ÷');
		expect(result).to.equal(3);
	});

	it('should evaluate the "×" operator', () => {
		let result = evaluate('3 2 ×');
		expect(result).to.equal(6);
	});

	it('should evaluate the "^" operator', () => {
		let result = evaluate('3 2 ^');
		expect(result).to.equal(9);
	});

	it('should support negative numbers', () => {
		let result = evaluate('0 2 -');
		expect(result).to.equal(-2);
	});

	it('should throw an exception when there is a wrong number of operands in the expression', () => {
		expect(evaluate.bind({}, '1 ^')).to.throw("Not enough operands");
	});

	it('should throw an exception when there is a wrong number of operands in the expression', () => {
		expect(evaluate.bind({}, '1 2')).to.throw("Too many operands");
	});

	it('should throw an exception when there is an unkown token in the expression', () => {
		expect(evaluate.bind({}, '1 2 ?')).to.throw("Unknown token");
	});
})