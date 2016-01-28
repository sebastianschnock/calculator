import { expect } from 'chai';
import { evaluate } from '../src/js/evaluate-postfix';

describe('The postfix evaluation', () => {

	it('should evaluate the "+" operator', () => {

		const postfix = '1 2 +';
		let result = evaluate(postfix);

		expect(result).to.equal(3);
	});

})