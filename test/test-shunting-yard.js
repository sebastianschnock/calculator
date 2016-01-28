import { expect } from 'chai';
import convertInfixToPostfix from '../src/js/shunting-yard';

describe('The Shunting-yard converter', () => {

	it('should convert "+" operator', () => {

		const infix = '1 + 2';
		let postfix = convertInfixToPostfix(infix);

		expect(postfix).to.equal('1 2 +');
	});

	it('should convert "-" operator', () => {
		
		const infix = '2 - 1';
		let postfix = convertInfixToPostfix(infix);

		expect(postfix).to.equal('2 1 -');
	});

	it('should convert "/" operator', () => {
		
		const infix = '4 / 2';
		let postfix = convertInfixToPostfix(infix);

		expect(postfix).to.equal('4 2 /');
	});

	it('should convert "*" operator', () => {
		
		const infix = '1 * 2';
		let postfix = convertInfixToPostfix(infix);

		expect(postfix).to.equal('1 2 *');
	});

	it('should convert "^" operator', () => {

		const infix = '2 ^ 3';
		let postfix = convertInfixToPostfix(infix);

		expect(postfix).to.equal('2 3 ^');
	});
})