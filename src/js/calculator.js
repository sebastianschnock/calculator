import convertInfixToPostfix from './shunting-yard';
import evaluate from './evaluate-postfix';

/**
 * Calculates a mathematical expression in infix notation.
 *
 * @method     calculate
 * @param      {String}  expression  an expression in infix notation (eg. '1 + 2 * 3')
 * @return     {Number}  the calulated result
 */
function calculate(expression) {
	return evaluate(convertInfixToPostfix(expression));
}

export default calculate;