/**
 * The list of operators.
 * 
 * An operator has the following properties:
 * symbol			-	a unique symbol as an identifier
 * precedence		-	precendence value for the Shunting-yard algorithm
 * leftAssociative 	-	left- or right-associative, for the Shunting-yard algorithm
 * numOperands		-	the number of operands this operator works with
 * evalute			-	the function that gets evaluated when using this operator
 *
 * @type       {Array}
 */
const operators = [
	{
		symbol: '+',
		precedence: 2,
		leftAssociative: true,
		numOperands: 2,
		evaluate: (x, y) => x + y
	},
	{
		symbol: '-',
		precedence: 2,
		leftAssociative: true,
		numOperands: 2,
		evaluate: (x, y) => x - y
	},
	{
		symbol: '÷',
		precedence: 3,
		leftAssociative: true,
		numOperands: 2,
		evaluate: (x, y) => x / y
	},
	{
		symbol: '×',
		precedence: 3,
		leftAssociative: true,
		numOperands: 2,
		evaluate: (x, y) => x * y
	},
	{
		symbol: '^',
		precedence: 4,
		leftAssociative: false,
		numOperands: 2,
		evaluate: (x, y) => Math.pow(x, y)
	}
];

/**
 * Returns the operator object for a given symbol.
 *
 * @method     getOperator
 * @param      {String}  symbol  a symbol like "+"
 * @return     {Object}  the found operator object or undefined
 */
function getOperator(symbol) {
	for(let operator of operators) {
		if(operator.symbol === symbol) return operator;
	}
	return undefined;
}

export default getOperator;