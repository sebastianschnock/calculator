import getOperator from './operators';
import { isNumeric } from './helpers';

/**
 * Evaluates a mathematical expression in postfix notation.
 *
 * @method     evaluate
 * @param      {String}	postfix  an expression in postfix notation
 * @returns    {Number}	the result of the evaluation
 * 
 * Note: the different tokens in the expression must be separated by whitespace.
 * For example: "1 2 +" instead of "1 2+"
 */
function evaluate(postfix) {

	let operandStack = [];
	let operand;
	let operator;

	for(let token of postfix.split(' ')) {

		// collect numbers
		if(isNumeric(operand = Number.parseFloat(token))) {
			operandStack.push(operand);
		}

		// evaluate operators
		else if((operator = getOperator(token)) !== null) {
			var operands = operandStack.splice(-operator.numOperands, operator.numOperands);
			var operationResult = operator.evaluate(...operands);
			operandStack.push(operationResult);
		}
	}

	// after everything there should be only one number - the result
	return operandStack[0];
}

export default evaluate;