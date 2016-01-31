import convertInfixToPostfix from './shunting-yard';
import evaluate from './evaluate-postfix';
import config from  './config';

/**
 * Calculates a mathematical expression in infix notation.
 *
 * @method     calculate
 * @param      {String}  expr  an expression in infix notation (eg. '1 + 2 * 3')
 * @return     {Number}  the calulated result
 */
function calculate(expr) {
	let normalized = normalizePre(expr);
	let result = evaluate(convertInfixToPostfix(normalized))
	return normalizePost(result);
}

function normalizePre(expr) {
	let normalized = expr.trim();
	// handle special case: expression starts with a negative number
	return normalized.replace(/^-\s/, '0 - ');
}

function normalizePost(result) {
	// round floats to deal with floating point arithmetic
	// see http://floating-point-gui.de/
	// also remove trailing zeros
	let normalized = Number.parseFloat(result.toFixed(config.floatPrecision));
	return normalized;
}

export default calculate;