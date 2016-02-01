import { expect } from 'chai';
import convertInfixToPostfix from '../src/js/shunting-yard';

describe('The Shunting-yard converter', () => {

	it('should convert "+" operator', () => {
		let postfix = convertInfixToPostfix('1 + 2');
		expect(postfix).to.equal('1 2 +');
	});

	it('should convert "-" operator', () => {
		let postfix = convertInfixToPostfix('2 - 1');
		expect(postfix).to.equal('2 1 -');
	});

	it('should convert "÷" operator', () => {
		let postfix = convertInfixToPostfix('4 ÷ 2');
		expect(postfix).to.equal('4 2 ÷');
	});

	it('should convert "×" operator', () => {
		let postfix = convertInfixToPostfix('1 × 2');
		expect(postfix).to.equal('1 2 ×');
	});

	it('should convert "^" operator', () => {
		let postfix = convertInfixToPostfix('2 ^ 3');
		expect(postfix).to.equal('2 3 ^');
	});

	it('should honor precedence of "×" before "+', () => {
		let postfix = convertInfixToPostfix('2 × 3 + 4');
		expect(postfix).to.equal('2 3 × 4 +');
	});

})