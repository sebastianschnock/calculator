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
 */
function convertInfixToPostfix(infix) {

	let output = [];
	let oprStack = [];
	let opr;

	for(let token of infix.split(' ')) {

		if(isNumeric(Number.parseFloat(token))) {
			output.push(token);
		}

		else if((opr = getOperator(token)) !== undefined) {
			while(oprStack.length > 0 &&
				((opr.leftAssociative && opr.precedence <= oprStack[oprStack.length-1].precedence) ||
				 (!opr.leftAssociative && opr.precedence < oprStack[oprStack.length-1]))) {
				output.push(oprStack.pop().symbol);
			}

			oprStack.push(opr);
		}
	}

	// add the rest of opr stack to the output queue
	output.push(...oprStack.map(o => o.symbol).reverse());

	return output.join(' ');
}

export default convertInfixToPostfix;