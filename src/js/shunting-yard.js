const operators = [
	{
		symbol: '+',
		precedence: 2,
		leftAssociative: true
	},
	{
		symbol: '-',
		precedence: 2,
		leftAssociative: true
	},
	{
		symbol: '/',
		precedence: 3,
		leftAssociative: true
	},
	{
		symbol: '*',
		precedence: 3,
		leftAssociative: true
	},
	{
		symbol: '^',
		precedence: 4,
		leftAssociative: false
	}
];

function getOperator(symbol) {
	for(let operator of operators) {
		if(operator.symbol === symbol) return operator;
	}
	return undefined;
}

/**
 * Converts a string in infix notation to postfix oder Reverse Polish notation.
 * eg: "1 + 2" would be converted to "1 2 +"
 * This function uses the "Shunting-yard algorithm".
 * 
 * @method     convertInfixToPostfix
 * @param      {String}  infix   the string in infix to convert
 */
function convertInfixToPostfix(infix) {

	let outputQueue = [];
	let operatorStack = [];
	let operator;

	let tokens = infix.split(' ');
	for(let token of tokens) {

		// add numbers to output queue
		if(Number.isInteger(parseInt(token))) {
			outputQueue.push(token);
		}

		else if((operator = getOperator(token)) !== undefined) {
			while(operatorStack.length > 1 &&
				((operator.leftAssociative && operator.precedence <= operatorStack[0].precedence) ||
				(!operator.leftAssociative && operator.precedence < operatorStack[0]))) {
				outputQueue.push(operatorStack.pop().symbol);
			}

			operatorStack.push(operator);
		}
	}

	// add operators still in the stack to output queue
	for(let operator of operatorStack) {
		outputQueue.push(operator.symbol);
	}

	return outputQueue.join(' ');
}

module.exports = { convertInfixToPostfix };