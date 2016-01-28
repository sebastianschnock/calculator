import getOperator from './operators';

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

	const tokens = postfix.split(' ');
	for(let token of tokens) {

		if(Number.isInteger(operand = parseInt(token))) {
			operandStack.push(operand);
		}

		else if((operator = getOperator(token)) !== undefined) {
			var operands = operandStack.splice(-operator.numberOfOperands, operator.numberOfOperands);
			operandStack.push(operator.evaluate(...operands));
		}
	}

	return operandStack[0];
}

export default evaluate;