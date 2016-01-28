const operators = [
	{
		symbol: '+',
		numberOfOperands: 2,
		evaluate: (x, y) => x + y
	},
	{
		symbol: '-',
		numberOfOperands: 2,
		evaluate: (x, y) => x - y
	},
	{
		symbol: '/',
		numberOfOperands: 2,
		evaluate: (x, y) => x / y
	},
	{
		symbol: '*',
		numberOfOperands: 2,
		evaluate: (x, y) => x * y
	},
	{
		symbol: '^',
		numberOfOperands: 2,
		evaluate: (x, y) => Math.pow(x, y)
	}
];

function getOperator(symbol) {
	for(let operator of operators) {
		if(operator.symbol === symbol) return operator;
	}
	return undefined;
}

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
			var operands = operandStack.splice(0, operator.numberOfOperands);
			operandStack.push(operator.evaluate.apply(this, operands));
		}
	}

	return operandStack[0];
}

module.exports = { evaluate };