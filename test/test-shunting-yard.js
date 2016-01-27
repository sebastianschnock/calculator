import { expect } from 'chai';
import { convertInfixToRPN } from '../src/js/shunting-yard';

describe('The Shunting-yard converter', () => {

	it('should convert "+" operator', function() {

		const infix = '1 + 2';
		let rpn = convertInfixToRPN(infix);

		expect(rpn).to.equal('1 2 +');
	})
})