import getOperator from './operators';
import { isNumeric } from './helpers';

/**
 * Evaluates a mathematical expression in postfix notation.
 *
 * @method     evaluate
 * @param      {String}	postfix  an expression in postfix notation
 * @returns    {Number}	the result of the evaluation
 */
function evaluate(postfix) {

	let operandStack = [];
	let operand;
	let operator;

	for(let token of postfix.split(' ')) {

		if(isNumeric(operand = parseFloat(token))) {
			operandStack.push(operand);
		}

		else if((operator = getOperator(token)) !== undefined) {
			var operands = operandStack.splice(-operator.numOperands, operator.numOperands);
			operandStack.push(operator.evaluate(...operands));
		}
	}

	return operandStack[0];
}

export default evaluate;