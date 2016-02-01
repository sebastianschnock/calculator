import { expect } from 'chai';
import calculate from '../src/js/calculator';

describe('The calculator', () => {

	it('should support addition', () => {
		let result = calculate('1 + 2');
		expect(result).to.equal(3);
	});

	it('should support subtraction', () => {
		let result = calculate('6 - 2');
		expect(result).to.equal(4);
	});

	it('should support division', () => {
		let result = calculate('14 ÷ 2');
		expect(result).to.equal(7);
	});

	it('should support multiplication', () => {
		let result = calculate('2 × 8');
		expect(result).to.equal(16);
	});

	it('should support exponentiation', () => {
		let result = calculate('5 ^ 3');
		expect(result).to.equal(125);
	});

	it('should work with point before line precedence', () => {
		let result = calculate('2 + 3 × 4');
		expect(result).to.equal(14);
	});

	it('should support negative numbers', () => {
		let result = calculate('-2 - 2');
		expect(result).to.equal(-4);
	});

	it('should work when an expression begins with "-"', () => {
		expect(calculate('- 2 - 2')).to.equal(-4);
	});

	it('should normalize floating point numbers', () => {
		expect(calculate('.1 + .2')).to.equal(0.3);
	});
})