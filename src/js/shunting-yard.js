import getOperator from './operators';

/**
 * Converts a string in infix notation to postfix oder Reverse Polish notation.
 * eg: "1 + 2" would be converted to "1 2 +"
 * This function uses the "Shunting-yard algorithm".
 * 
 * @method     convertInfixToPostfix
 * @param      {String}	infix   the string in infix to convert
 * @return     {String}	the converted string in postfix notation
 */
function convertInfixToPostfix(infix) {

	let outputQueue = [];
	let operatorStack = [];
	let operator;

	const tokens = infix.split(' ');
	for(let token of tokens) {

		if(Number.isInteger(parseInt(token))) {
			outputQueue.push(token);
		}

		else if((operator = getOperator(token)) !== undefined) {
			while(operatorStack.length > 0 &&
				((operator.leftAssociative && operator.precedence <= operatorStack[operatorStack.length-1].precedence) ||
				 (!operator.leftAssociative && operator.precedence < operatorStack[operatorStack.length-1]))) {
				outputQueue.push(operatorStack.pop().symbol);
			}

			operatorStack.push(operator);
		}
	}

	// add the rest of operator stack to the output queue
	outputQueue.push(...operatorStack.map(o => o.symbol).reverse());

	return outputQueue.join(' ');
}

export default convertInfixToPostfix;