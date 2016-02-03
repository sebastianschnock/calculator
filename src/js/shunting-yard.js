import getOperator from './operators';
import { isNumeric } from './helpers';

/**
 * Converts a string in infix notation to postfix oder Reverse Polish notation.
 * eg: "1 + 2" would be converted to "1 2 +"
 * This function uses the "Shunting-yard algorithm".
 * 
 * @method     convertInfixToPostfix
 * @param      {String}	infix   the string in infix to convert
 * @return     {String}	the converted string in postfix notation
 * 
 * Note: the different tokens in the expression must be separated by whitespace.
 * For example: "1 + 2" instead of "1+2". The whitespace separation is taken over to the result.
 */
function convertInfixToPostfix(infix) {

	let output = [];
	let oprStack = [];
	let opr;

	for(let token of infix.split(' ')) {

		// write numbers first
		if(isNumeric(Number.parseFloat(token))) {
			output.push(token);
		}

		// collect operators to write later
		else if((opr = getOperator(token)) !== null) {
			// higher precedence operators should be written earlier
			while(oprStack.length > 0 &&
				((opr.leftAssociative && opr.precedence <= oprStack[oprStack.length-1].precedence) ||
				(!opr.leftAssociative && opr.precedence < oprStack[oprStack.length-1]))) {

				output.push(oprStack.pop().symbol);
			}

			oprStack.push(opr);
		}
	}

	// add rest of the operator stack to the output queue
	output.push(...oprStack.map(o => o.symbol).reverse());

	return output.join(' ');
}

export default convertInfixToPostfix;